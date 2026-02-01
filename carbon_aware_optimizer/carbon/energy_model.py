
"""
Energy estimation utilities for CPU and memory usage.
All constants are configurable.
Assumptions:
- CPU power: default 50W per core (configurable)
- Memory power: 0.3725W per MB (configurable)
"""

DEFAULT_CPU_POWER_W = 50.0  # Default CPU power per core in Watts
DEFAULT_MEM_POWER_W_PER_MB = 0.3725  # Memory power in Watts per MB

def estimate_cpu_energy(runtime_seconds, cpu_cores=1, cpu_power_w=DEFAULT_CPU_POWER_W):
	"""
	Estimate CPU energy consumption in kWh.
	runtime_seconds: execution time in seconds
	cpu_cores: number of CPU cores used
	cpu_power_w: power per core in Watts
	"""
	hours = runtime_seconds / 3600.0
	total_power = cpu_power_w * cpu_cores
	energy_kwh = total_power * hours / 1000.0
	return energy_kwh

def estimate_memory_energy(mem_usage_mb, runtime_seconds, mem_power_w_per_mb=DEFAULT_MEM_POWER_W_PER_MB):
	"""
	Estimate memory energy consumption in kWh.
	mem_usage_mb: memory usage in MB
	runtime_seconds: execution time in seconds
	mem_power_w_per_mb: memory power constant in Watts per MB
	"""
	hours = runtime_seconds / 3600.0
	total_power = mem_power_w_per_mb * mem_usage_mb
	energy_kwh = total_power * hours / 1000.0
	return energy_kwh
