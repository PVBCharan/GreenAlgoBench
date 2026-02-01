
"""
Builds and cleans experiment results into a structured dataset for AI modeling.
Extracts, normalizes, validates, and saves as CSV.
"""
import os
import json
import pandas as pd

SCHEMA = [
	'algorithm', 'task_type', 'dataset_size',
	'avg_time_sec', 'avg_cpu_percent', 'avg_memory_mb',
	'energy_kwh', 'carbon_gco2'
]

def load_raw_results(json_path):
	with open(json_path, 'r') as f:
		return json.load(f)

def build_clean_dataset(raw_results):
	rows = []
	for task_type, algos in raw_results.items():
		for algo, sizes in algos.items():
			for size, metrics in sizes.items():
				try:
					# Extract and normalize
					avg_time = float(metrics.get('avg_time', 0))
					avg_cpu = float(metrics.get('avg_cpu', 0))
					avg_mem = float(metrics.get('avg_mem', 0)) / (1024 * 1024)  # bytes to MB
					energy = float(metrics.get('energy_kwh', 0))
					carbon = float(metrics.get('carbon_gco2', 0))
					# Remove anomalies
					if energy <= 0 or carbon <= 0:
						continue
					# Ensure consistent types
					row = [
						str(algo), str(task_type), int(size),
						avg_time, avg_cpu, avg_mem,
						energy, carbon
					]
					rows.append(row)
				except Exception:
					continue
	df = pd.DataFrame(rows, columns=SCHEMA)
	print(f"[DEBUG] Rows to write: {len(rows)}")
	if len(rows) > 0:
		print("[DEBUG] First 3 rows:")
		print(df.head(3))
	# Basic validation: no NaNs
	if df.isnull().any().any():
		raise ValueError("NaN values found in dataset. Check input data.")
	return df

def save_dataset(df, out_path):
	df.to_csv(out_path, index=False)


def main():
	raw_path = os.path.join(os.path.dirname(__file__), '../data/experiments/raw_results.json')
	out_path = os.path.join(os.path.dirname(__file__), '../data/experiments/cleaned_results.csv')
	raw_results = load_raw_results(raw_path)
	df = build_clean_dataset(raw_results)
	save_dataset(df, out_path)
	print(f"Cleaned dataset saved to {out_path}")

if __name__ == "__main__":
	main()
