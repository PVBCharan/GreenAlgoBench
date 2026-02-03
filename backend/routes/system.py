"""
System Footprint API Route

Provides endpoints to retrieve current system resource usage
and estimated carbon footprint based on CPU, memory, and energy consumption.
"""

from fastapi import APIRouter
import psutil
from typing import Dict, Any
from datetime import datetime

router = APIRouter()

# Conversion constants
POWER_PER_CPU_PERCENT = 0.05  # Watts per CPU percentage point (approximate)
POWER_PER_GB_MEMORY = 0.4    # Watts per GB of memory (approximate)
CARBON_PER_KWH = 0.475       # kg CO2 per kWh (approximate, varies by region)
POLLING_INTERVAL = 1         # Seconds for CPU usage sampling


def get_system_resources() -> Dict[str, Any]:
    """
    Gather current system resource usage metrics.
    
    Returns:
        Dict with CPU, memory, and process information
    """
    # CPU usage (percentage)
    cpu_percent = psutil.cpu_percent(interval=POLLING_INTERVAL)
    
    # Memory usage
    memory = psutil.virtual_memory()
    memory_used_gb = memory.used / (1024 ** 3)
    memory_percent = memory.percent
    
    # Disk I/O (if available on this platform)
    try:
        disk_io = psutil.disk_io_counters()
        disk_read_mb = disk_io.read_bytes / (1024 ** 2)
        disk_write_mb = disk_io.write_bytes / (1024 ** 2)
    except:
        disk_read_mb = 0
        disk_write_mb = 0
    
    return {
        "cpu_percent": round(cpu_percent, 2),
        "memory_used_gb": round(memory_used_gb, 2),
        "memory_percent": round(memory_percent, 2),
        "disk_read_mb": round(disk_read_mb, 2),
        "disk_write_mb": round(disk_write_mb, 2),
    }


def estimate_power_consumption(resources: Dict[str, Any]) -> float:
    """
    Estimate power consumption in watts based on system resources.
    
    This is a simplified model. Real power consumption varies based on:
    - Hardware specifications
    - Cooling systems
    - PSU efficiency
    
    Args:
        resources: System resource metrics
        
    Returns:
        Estimated power consumption in watts
    """
    cpu_power = (resources["cpu_percent"] / 100) * POWER_PER_CPU_PERCENT * 100
    memory_power = resources["memory_used_gb"] * POWER_PER_GB_MEMORY
    base_power = 50  # Base system power draw
    
    total_power = base_power + cpu_power + memory_power
    return round(total_power, 2)


def estimate_carbon_footprint(power_watts: float) -> float:
    """
    Estimate carbon footprint based on power consumption.
    
    Assumptions:
    - Measurement duration: 1 hour
    - Carbon intensity: varies by region (using average)
    
    Args:
        power_watts: Power consumption in watts
        
    Returns:
        Estimated carbon footprint in kg CO2 (assuming 1 hour operation)
    """
    energy_kwh = (power_watts / 1000) * 1  # Assuming 1 hour of operation
    carbon_kg = energy_kwh * CARBON_PER_KWH
    return round(carbon_kg, 4)


@router.get("/system-footprint", response_model=Dict[str, Any])
async def get_system_footprint():
    """
    Get current system carbon footprint based on real-time resource usage.
    
    This endpoint:
    1. Reads current CPU and memory usage using psutil
    2. Estimates power consumption
    3. Calculates carbon emissions
    
    Returns:
        JSON response with:
        - CPU usage (%)
        - Memory usage (GB and %)
        - Estimated power (Watts)
        - Estimated carbon (kg CO2 for 1-hour operation)
        - Timestamp of measurement
    
    Example response:
        {
            "cpu_percent": 35.5,
            "memory_used_gb": 6.2,
            "memory_percent": 15.5,
            "power_watts": 110.25,
            "carbon_kg_per_hour": 0.0523,
            "energy_kwh": 0.1103,
            "timestamp": "2026-02-02T14:30:00Z",
            "message": "System footprint calculated successfully"
        }
    """
    try:
        # Get system resources
        resources = get_system_resources()
        
        # Estimate power consumption
        power_watts = estimate_power_consumption(resources)
        
        # Estimate carbon footprint (for 1-hour operation)
        carbon_kg = estimate_carbon_footprint(power_watts)
        energy_kwh = (power_watts / 1000) * 1
        
        return {
            "cpu_percent": resources["cpu_percent"],
            "memory_used_gb": resources["memory_used_gb"],
            "memory_percent": resources["memory_percent"],
            "disk_read_mb": resources["disk_read_mb"],
            "disk_write_mb": resources["disk_write_mb"],
            "power_watts": power_watts,
            "carbon_kg_per_hour": carbon_kg,
            "energy_kwh": round(energy_kwh, 4),
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "message": "System footprint calculated successfully"
        }
    
    except Exception as e:
        return {
            "error": str(e),
            "message": "Failed to calculate system footprint"
        }


@router.post("/system-footprint/estimate", response_model=Dict[str, Any])
async def estimate_footprint_custom(
    cpu_percent: float = 35.0,
    memory_gb: float = 6.0
):
    """
    Estimate carbon footprint for custom resource values.
    
    This endpoint allows estimating carbon impact for hypothetical resource scenarios.
    
    Args:
        cpu_percent: CPU usage percentage (0-100)
        memory_gb: Memory usage in GB
        
    Returns:
        JSON response with estimated footprint for given resources
    """
    try:
        # Validate inputs
        if not (0 <= cpu_percent <= 100):
            return {"error": "cpu_percent must be between 0 and 100"}
        if memory_gb < 0:
            return {"error": "memory_gb must be positive"}
        
        resources = {
            "cpu_percent": cpu_percent,
            "memory_used_gb": memory_gb,
            "memory_percent": 0,
            "disk_read_mb": 0,
            "disk_write_mb": 0,
        }
        
        power_watts = estimate_power_consumption(resources)
        carbon_kg = estimate_carbon_footprint(power_watts)
        energy_kwh = (power_watts / 1000) * 1
        
        return {
            "input": {
                "cpu_percent": cpu_percent,
                "memory_gb": memory_gb
            },
            "output": {
                "power_watts": power_watts,
                "carbon_kg_per_hour": carbon_kg,
                "energy_kwh": round(energy_kwh, 4),
            },
            "message": "Footprint estimation completed"
        }
    
    except Exception as e:
        return {
            "error": str(e),
            "message": "Failed to estimate footprint"
        }
