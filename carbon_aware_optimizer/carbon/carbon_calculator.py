
"""
Carbon emission calculation utilities.
Assumes energy in kWh and configurable carbon intensity (gCO2/kWh).
"""


# Explicit constants for energy and carbon estimation
CPU_POWER_W = 50.0  # Watts per core
MEM_POWER_W_PER_MB = 0.3725  # Watts per MB
CARBON_INTENSITY = 475.0  # gCO2 per kWh

def estimate_cpu_energy(runtime_seconds, cpu_cores=1, cpu_power_w=CPU_POWER_W):
	"""
	Estimate CPU energy consumption in kWh.
	"""
	hours = runtime_seconds / 3600.0
	total_power = cpu_power_w * cpu_cores
	energy_kwh = total_power * hours / 1000.0
	return energy_kwh

def estimate_memory_energy(mem_mb, runtime_seconds, mem_power_w_per_mb=MEM_POWER_W_PER_MB):
	"""
	Estimate memory energy consumption in kWh.
	"""
	hours = runtime_seconds / 3600.0
	total_power = mem_power_w_per_mb * mem_mb
	energy_kwh = total_power * hours / 1000.0
	return energy_kwh

def estimate_carbon_emissions(energy_kwh, carbon_intensity=CARBON_INTENSITY):
	"""
	Convert energy (kWh) to carbon emissions (gCO2).
	"""
	return energy_kwh * carbon_intensity

def enrich_with_energy_and_carbon(profile_result, cpu_cores=1, cpu_power_w=CPU_POWER_W, mem_power_w_per_mb=MEM_POWER_W_PER_MB, carbon_intensity=CARBON_INTENSITY):
	"""
	Given a profiling result dict with keys: 'time' (s), 'mem' (bytes),
	add 'energy_kwh' and 'carbon_gco2' fields.
	All constants are configurable.
	"""
	runtime = profile_result.get('time', 0)
	mem_bytes = profile_result.get('mem', 0)
	mem_mb = mem_bytes / (1024 * 1024)
	cpu_energy = estimate_cpu_energy(runtime, cpu_cores, cpu_power_w)
	mem_energy = estimate_memory_energy(mem_mb, runtime, mem_power_w_per_mb)
	total_energy = cpu_energy + mem_energy
	carbon = estimate_carbon_emissions(total_energy, carbon_intensity)
	enriched = dict(profile_result)
	enriched['energy_kwh'] = total_energy
	enriched['carbon_gco2'] = carbon
	return enriched
