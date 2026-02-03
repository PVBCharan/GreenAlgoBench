"""
Analyze API Route

Provides the main /analyze endpoint that orchestrates the complete
green computing pipeline and returns comprehensive results.
"""

from fastapi import APIRouter, HTTPException, Query
from typing import Dict, Any, Optional
from datetime import datetime
import sys
import os
import importlib.util

router = APIRouter()

# Load analyzer module dynamically
def _load_analyzer():
    """Load analyzer module from carbon_aware_optimizer directory"""
    # Add the carbon_aware_optimizer directory to sys.path
    # backend/routes/analyze.py -> go up 2 levels to project root, then into carbon_aware_optimizer
    cao_dir = os.path.abspath(
        os.path.join(os.path.dirname(__file__), "..", "..", "carbon_aware_optimizer")
    )
    if cao_dir not in sys.path:
        sys.path.insert(0, cao_dir)
    
    analyzer_path = os.path.join(cao_dir, "analyzer.py")
    spec = importlib.util.spec_from_file_location("analyzer", analyzer_path)
    analyzer = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(analyzer)
    return analyzer

_analyzer = None

def get_analyzer():
    """Lazy load analyzer module"""
    global _analyzer
    if _analyzer is None:
        _analyzer = _load_analyzer()
    return _analyzer


@router.post("/analyze")
async def analyze(
    full_run: bool = Query(False, description="Whether to run full pipeline (slow) or quick analysis")
) -> Dict[str, Any]:
    """
    Run the complete analysis pipeline or quick analysis.
    
    This is the main endpoint that orchestrates the green computing pipeline.
    
    Query Parameters:
    - full_run: If True, runs the complete experimental pipeline (takes longer).
                If False, returns quick analysis with existing data.
    
    Returns:
        {
            "status": "success|error",
            "timestamp": float (Unix timestamp),
            "algorithms": {
                "algorithm_name": {
                    "carbon_gco2": float,
                    "avg_time_sec": float,
                    "is_best": boolean
                },
                ...
            },
            "best_algorithm": "string",
            "explanation": "string describing why it was selected",
            "total_time_seconds": float (only if full_run=true),
            "pipeline_phases": {...} (detailed phase results if full_run=true)
        }
    """
    try:
        analyzer = get_analyzer()
        if full_run:
            # Run complete pipeline
            return analyzer.analyze_algorithms()
        else:
            # Run quick analysis with existing data or samples
            return analyzer.get_quick_analysis()
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Analysis failed: {str(e)}"
        )


@router.get("/analyze/quick")
async def analyze_quick() -> Dict[str, Any]:
    """
    Quick analysis endpoint using existing data or sample data.
    
    This is a fast endpoint suitable for frontend testing and demonstrations.
    It doesn't require running experiments.
    
    Returns:
        Same format as /analyze endpoint
    """
    try:
        analyzer = get_analyzer()
        return analyzer.get_quick_analysis()
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Quick analysis failed: {str(e)}"
        )


@router.get("/analyze/status")
async def analyze_status() -> Dict[str, Any]:
    """
    Get the status of analysis capabilities and data availability.
    
    Returns:
        {
            "ready": boolean,
            "has_experiment_data": boolean,
            "has_model": boolean,
            "estimated_full_run_time": "string"
        }
    """
    try:
        data_path = os.path.join(
            os.path.dirname(__file__), 
            "..", "carbon_aware_optimizer", 
            "data/experiments"
        )
        
        has_raw = os.path.exists(os.path.join(data_path, "raw_results.json"))
        has_cleaned = os.path.exists(os.path.join(data_path, "cleaned_results.csv"))
        
        model_path = os.path.join(
            os.path.dirname(__file__),
            "..", "carbon_aware_optimizer",
            "data/experiments/carbon_predictor.joblib"
        )
        has_model = os.path.exists(model_path)
        
        return {
            "ready": True,
            "has_experiment_data": has_raw and has_cleaned,
            "has_model": has_model,
            "estimated_full_run_time": "5-10 minutes",
            "quick_analysis_available": True
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Status check failed: {str(e)}"
        )
