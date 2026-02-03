
"""
Carbon emission calculation utilities.
Assumes energy in kWh and configurable carbon intensity (gCO2/kWh).
"""


# Explicit constants for energy and carbon estimation
CPU_POWER_W = 50.0  # Watts per core
MEM_POWER_W_PER_MB = 0.3725  # Watts per MB
DEFAULT_CARBON_INTENSITY = 475.0  # gCO2 per kWh

# Global provider for carbon intensity (can be replaced at runtime)
# Signature: () -> float
_carbon_intensity_provider = None

def set_carbon_intensity_provider(provider_func):
	"""
	Set a function that returns the current carbon intensity (gCO2/kWh).
	Useful for connecting to real-time APIs like ElectricityMap or WattTime.
	"""
	global _carbon_intensity_provider
	_carbon_intensity_provider = provider_func

def get_current_carbon_intensity():
	"""
	Returns current carbon intensity.
	Uses the registered provider if available, otherwise returns default static value.
	"""
	if _carbon_intensity_provider:
		try:
			return float(_carbon_intensity_provider())
		except Exception as e:
			print(f"[Warning] Carbon provider failed: {e}. Using fallback.")
	return DEFAULT_CARBON_INTENSITY

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

def estimate_carbon_emissions(energy_kwh, carbon_intensity=None):
	"""
	Convert energy (kWh) to carbon emissions (gCO2).
	If carbon_intensity is None, fetches the current/default value.
	"""
	if carbon_intensity is None:
		carbon_intensity = get_current_carbon_intensity()
	return energy_kwh * carbon_intensity

def enrich_with_energy_and_carbon(profile_result, cpu_cores=1, cpu_power_w=CPU_POWER_W, mem_power_w_per_mb=MEM_POWER_W_PER_MB, carbon_intensity=None, real_energy_kwh=None):
	"""
	Given a profiling result dict with keys: 'time' (s), 'mem' (bytes),
	add 'energy_kwh' and 'carbon_gco2' fields.
	
	If real_energy_kwh is provided (from hardware counters), use it.
	Otherwise, estimate based on time, cpu, and memory.
	"""
	# Determine carbon intensity for this calculation
	if carbon_intensity is None:
		carbon_intensity = get_current_carbon_intensity()

	if real_energy_kwh is not None:
		total_energy = real_energy_kwh
		source = "hardware"
	else:
		runtime = profile_result.get('time', 0)
		mem_bytes = profile_result.get('mem', 0)
		mem_mb = mem_bytes / (1024 * 1024)
		cpu_energy = estimate_cpu_energy(runtime, cpu_cores, cpu_power_w)
		mem_energy = estimate_memory_energy(mem_mb, runtime, mem_power_w_per_mb)
		total_energy = cpu_energy + mem_energy
		source = "estimated"

	carbon = estimate_carbon_emissions(total_energy, carbon_intensity)
	enriched = dict(profile_result)
	enriched['energy_kwh'] = total_energy
	enriched['carbon_gco2'] = carbon
	enriched['carbon_intensity_used'] = carbon_intensity
	enriched['energy_source'] = source
	return enriched
