"""
Analyzer module - Wraps the green computing pipeline as a callable function.

This module exposes the core orchestration logic from main.py as a function
that can be called from FastAPI, returning structured results instead of just logging.
"""

import os
import sys
import json
import time
from typing import Dict, Any, Optional, Tuple

def analyze_algorithms() -> Dict[str, Any]:
    """
    Run the complete analysis pipeline and return structured results.
    
    Returns:
        Dictionary containing:
        - algorithms: dict of algorithm results with metrics
        - best_algorithm: the recommended algorithm
        - explanation: why it was selected
        - timestamp: when analysis was run
        - status: success or failure
    """
    
    results = {
        "status": "pending",
        "timestamp": None,
        "algorithms": {},
        "best_algorithm": None,
        "explanation": None,
        "pipeline_phases": {}
    }
    
    try:
        start_time = time.time()
        results["timestamp"] = time.time()
        
        # Phase 1: Run experiments
        results["pipeline_phases"]["experiments"] = _run_experiments()
        
        # Phase 2: Compute energy and carbon
        results["pipeline_phases"]["energy_carbon"] = _compute_energy_carbon()
        
        # Phase 3: Build dataset
        results["pipeline_phases"]["dataset"] = _build_dataset()
        
        # Phase 4: Train or load model
        results["pipeline_phases"]["model"] = _train_or_load_model()
        
        # Phase 5: Run optimizer and get results
        algo_results, best_algo, explanation = _run_optimizer()
        results["algorithms"] = algo_results
        results["best_algorithm"] = best_algo
        results["explanation"] = explanation
        results["pipeline_phases"]["optimizer"] = {
            "status": "success" if best_algo else "warning",
            "best_algorithm": best_algo
        }
        
        # Phase 6: Gather visualizations metadata
        results["pipeline_phases"]["visualizations"] = _prepare_visualizations()
        
        results["status"] = "success"
        results["total_time_seconds"] = time.time() - start_time
        
    except Exception as e:
        results["status"] = "error"
        results["error"] = str(e)
        import traceback
        results["error_details"] = traceback.format_exc()
    
    return results


def _run_experiments() -> Dict[str, Any]:
    """Run phase 1: experiments and profiling."""
    try:
        import experiments.run_experiments as exp
        exp.main()
        return {"status": "success", "message": "Experiments completed"}
    except Exception as e:
        return {"status": "warning", "message": f"Experiments skipped: {str(e)[:100]}"}


def _compute_energy_carbon() -> Dict[str, Any]:
    """Run phase 2: compute energy and carbon emissions."""
    try:
        from carbon.carbon_calculator import enrich_with_energy_and_carbon
        
        raw_path = os.path.join(os.path.dirname(__file__), 'data/experiments/raw_results.json')
        if not os.path.exists(raw_path):
            return {"status": "warning", "message": "No raw results found"}
        
        with open(raw_path, 'r') as f:
            results = json.load(f)
        
        def enrich_all(d):
            if isinstance(d, dict):
                for k, v in d.items():
                    if isinstance(v, dict) and 'time' in v and 'mem' in v:
                        d[k] = enrich_with_energy_and_carbon(v)
                    else:
                        enrich_all(v)
        
        enrich_all(results)
        
        with open(raw_path, 'w') as f:
            json.dump(results, f, indent=2)
        
        return {"status": "success", "message": "Energy and carbon computed"}
    except Exception as e:
        return {"status": "warning", "message": f"Energy/carbon skipped: {str(e)[:100]}"}


def _build_dataset() -> Dict[str, Any]:
    """Run phase 3: build cleaned dataset."""
    try:
        from ai_model.dataset_builder import main as build_main
        build_main()
        return {"status": "success", "message": "Dataset built"}
    except Exception as e:
        return {"status": "warning", "message": f"Dataset build skipped: {str(e)[:100]}"}


def _train_or_load_model() -> Dict[str, Any]:
    """Run phase 4: train or load AI model."""
    try:
        from ai_model.train_model import train_and_save_model
        train_and_save_model()
        return {"status": "success", "message": "Model trained or loaded"}
    except Exception as e:
        return {"status": "warning", "message": f"Model training skipped: {str(e)[:100]}"}


def _run_optimizer() -> Tuple[Dict[str, Any], Optional[str], Optional[str]]:
    """Run phase 5: optimization and return algorithm results."""
    try:
        import pandas as pd
        from optimization.quantum_inspired_optimizer import select_best_algorithm
        
        csv_path = os.path.join(os.path.dirname(__file__), 'data/experiments/cleaned_results.csv')
        if not os.path.exists(csv_path):
            return {}, None, "No dataset found for optimization"
        
        df = pd.read_csv(csv_path)
        max_size = df['dataset_size'].max()
        df_plot = df[df['dataset_size'] == max_size]
        algos = df_plot[['algorithm', 'carbon_gco2', 'avg_time_sec']].to_dict('records')
        
        best_algo, score, explanation = select_best_algorithm(algos)
        
        # Format algorithm results
        algo_results = {}
        for algo in algos:
            algo_results[algo['algorithm']] = {
                "carbon_gco2": float(algo['carbon_gco2']),
                "avg_time_sec": float(algo['avg_time_sec']),
                "is_best": algo['algorithm'] == best_algo
            }
        
        return algo_results, best_algo, explanation
    except Exception as e:
        return {}, None, f"Optimizer failed: {str(e)[:100]}"


def _prepare_visualizations() -> Dict[str, Any]:
    """Prepare visualization metadata."""
    try:
        from visualization.comparison_plots import plot_comparisons
        from visualization.dashboard import show_dashboard
        
        # In a real scenario, these would generate files
        # For now, we just mark them as prepared
        return {
            "status": "prepared",
            "visualizations": ["comparison_plots", "dashboard"]
        }
    except Exception as e:
        return {
            "status": "warning",
            "message": f"Visualizations skipped: {str(e)[:100]}"
        }


def get_quick_analysis(algorithm_data: Optional[list] = None) -> Dict[str, Any]:
    """
    Get a quick analysis without running full experiments.
    
    Useful for frontend testing or when data is already available.
    
    Args:
        algorithm_data: Optional list of algorithm metrics
    
    Returns:
        Dictionary with algorithm comparison results
    """
    if algorithm_data is None:
        # Return sample data for quick testing
        algorithm_data = [
            {"algorithm": "bubble_sort", "carbon_gco2": 0.0056, "avg_time_sec": 0.0342},
            {"algorithm": "merge_sort", "carbon_gco2": 0.0085, "avg_time_sec": 0.0098},
            {"algorithm": "quick_sort", "carbon_gco2": 0.0071, "avg_time_sec": 0.0105},
            {"algorithm": "linear_search", "carbon_gco2": 0.0045, "avg_time_sec": 0.0125},
        ]
    
    try:
        from optimization.quantum_inspired_optimizer import select_best_algorithm
        best_algo, score, explanation = select_best_algorithm(algorithm_data)
    except Exception:
        # Fallback: select by lowest carbon
        best_algo = min(algorithm_data, key=lambda x: x['carbon_gco2'])['algorithm']
        explanation = "Selected algorithm with lowest carbon footprint"
    
    results = {
        "status": "success",
        "timestamp": time.time(),
        "algorithms": {},
        "best_algorithm": best_algo,
        "explanation": explanation
    }
    
    for algo in algorithm_data:
        results["algorithms"][algo['algorithm']] = {
            "carbon_gco2": float(algo.get('carbon_gco2', 0)),
            "avg_time_sec": float(algo.get('avg_time_sec', 0)),
            "is_best": algo['algorithm'] == best_algo
        }
    
    return results
