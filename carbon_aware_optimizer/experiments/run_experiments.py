
"""
Automated experiment runner for algorithm benchmarking.
- Reads configuration from config/experiment_config.py
- Generates deterministic datasets
- Executes and profiles algorithms
- Prints and stores results
"""
import sys
import os
import importlib
import random
import json
from collections import defaultdict

import psutil
import time

# Add parent directory to sys.path for imports
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from config import experiment_config

# Import algorithm modules dynamically
ALGO_MODULES = {
	'bubble_sort': 'algorithms.bubble_sort',
	'merge_sort': 'algorithms.merge_sort',
	'quick_sort': 'algorithms.quick_sort',
	'linear_search': 'algorithms.linear_search',
	'binary_search': 'algorithms.binary_search',
}

# Profiling helpers
process = psutil.Process(os.getpid())

def profile_algorithm(func, *args, **kwargs):
	"""Profiles execution time, CPU, and memory usage for a function call."""
	# CPU percent before (non-blocking, so call once before and after)
	cpu_before = process.cpu_percent(interval=None)
	mem_before = process.memory_info().rss
	start = time.perf_counter()
	result = func(*args, **kwargs)
	elapsed = time.perf_counter() - start
	cpu_after = process.cpu_percent(interval=None)
	mem_after = process.memory_info().rss
	cpu_used = max(0.0, min(cpu_used, 400.0))
	mem_used = max(mem_after - mem_before, 1024)  # minimum 1 KB
	return result, elapsed, cpu_used, mem_used

def generate_datasets(category, size, seed):
	"""Generates a deterministic dataset for a given category and size."""
	random.seed(seed)
	if category == 'sorting':
		# Random integer list
		return [random.randint(0, size * 10) for _ in range(size)]
	elif category == 'searching':
		# Random integer list and a target value
		arr = [random.randint(0, size * 10) for _ in range(size)]
		target = arr[random.randint(0, size - 1)]
		return arr, target
	else:
		raise ValueError(f"Unknown category: {category}")

def main():
	results = defaultdict(lambda: defaultdict(dict))
	for category, algos in experiment_config.ALGORITHM_CATEGORIES.items():
		for size in experiment_config.DATASET_SIZES:
			# Generate dataset once per size/category for fairness
			if category == 'sorting':
				base_data = generate_datasets(category, size, experiment_config.RANDOM_SEED)
			elif category == 'searching':
				base_data, target = generate_datasets(category, size, experiment_config.RANDOM_SEED)
			for algo_name in algos:
				# Import algorithm function
				module = importlib.import_module(ALGO_MODULES[algo_name])
				algo_func = getattr(module, algo_name)
				run_stats = []
				for run in range(experiment_config.NUM_RUNS):
					# Use a copy to avoid in-place modification
					if category == 'sorting':
						data = list(base_data)
						_, elapsed, cpu, mem = profile_algorithm(algo_func, data)
					elif category == 'searching':
						data = list(base_data)
						_, elapsed, cpu, mem = profile_algorithm(algo_func, data, target)
					run_stats.append({'time': elapsed, 'cpu': cpu, 'mem': mem})
				# Average results
				avg_time = sum(r['time'] for r in run_stats) / experiment_config.NUM_RUNS
				avg_cpu = sum(r['cpu'] for r in run_stats) / experiment_config.NUM_RUNS
				avg_mem = sum(r['mem'] for r in run_stats) / experiment_config.NUM_RUNS
				results[category][algo_name][size] = {
					'avg_time': avg_time,
					'avg_cpu': avg_cpu,
					'avg_mem': avg_mem,
					'runs': run_stats
				}
				print(f"Category: {category}, Algorithm: {algo_name}, Size: {size}")
				print(f"  Avg Time: {avg_time:.6f}s, Avg CPU: {avg_cpu:.2f}%, Avg Mem: {avg_mem/1024:.2f} KB\n")
	# Store raw results as JSON
	out_path = os.path.join(os.path.dirname(__file__), '../data/experiments/raw_results.json')
	os.makedirs(os.path.dirname(out_path), exist_ok=True)
	with open(out_path, 'w') as f:
		json.dump(results, f, indent=2, default=list)

if __name__ == "__main__":
	main()
