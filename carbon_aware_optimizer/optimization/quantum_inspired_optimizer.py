
"""
Quantum-inspired optimizer for algorithm selection.
Evaluates all candidates, computes energy, and selects the best.
"""
from .objective_function import min_max_normalize, energy_function

def select_best_algorithm(algorithms_metrics, alpha=0.5, beta=0.5):
	"""
	algorithms_metrics: list of dicts, each with keys:
		'algorithm', 'carbon_gco2', 'avg_time_sec'
	Returns:
		best_algorithm_name, energy_score, explanation
	"""
	# Extract values for normalization
	carbon_vals = [float(a['carbon_gco2']) for a in algorithms_metrics]
	runtime_vals = [float(a['avg_time_sec']) for a in algorithms_metrics]
	norm_carbon = min_max_normalize(carbon_vals)
	norm_runtime = min_max_normalize(runtime_vals)
	# Compute energy for each algorithm
	energies = [energy_function(c, r, alpha, beta) for c, r in zip(norm_carbon, norm_runtime)]
	min_idx = energies.index(min(energies))
	best_algo = algorithms_metrics[min_idx]['algorithm']
	explanation = (
		f"Selected '{best_algo}' as it achieves the lowest combined energy score "
		f"(alpha={alpha}, beta={beta}) based on normalized carbon and runtime."
	)
	return best_algo, energies[min_idx], explanation

if __name__ == "__main__":
	# Example usage
	algos = [
		{'algorithm': 'merge_sort', 'carbon_gco2': 100, 'avg_time_sec': 0.2},
		{'algorithm': 'quick_sort', 'carbon_gco2': 120, 'avg_time_sec': 0.1},
		{'algorithm': 'bubble_sort', 'carbon_gco2': 300, 'avg_time_sec': 1.0},
	]
	best, score, expl = select_best_algorithm(algos, alpha=0.7, beta=0.3)
	print(f"Best: {best}, Energy: {score:.3f}\n{expl}")
