
"""
Objective and cost functions for quantum-inspired optimization.
"""

def min_max_normalize(values):
	"""
	Min-max normalization: scales a list to [0, 1].
	Returns a list of normalized values.
	"""
	min_v = min(values)
	max_v = max(values)
	if max_v == min_v:
		return [0.0 for _ in values]
	return [(v - min_v) / (max_v - min_v) for v in values]

def energy_function(normalized_carbon, normalized_runtime, alpha=0.5, beta=0.5):
	"""
	Computes a weighted cost (called 'energy' by analogy to quantum systems).
	Lower energy means a more sustainable and efficient algorithm.
	alpha, beta: weights for carbon and runtime (must sum to 1 for interpretability).
	"""
	return alpha * normalized_carbon + beta * normalized_runtime
