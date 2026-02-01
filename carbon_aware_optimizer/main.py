
"""
Main orchestration script for the green computing pipeline.
Runs all phases in order with clear logging and error handling.
"""
import os
import sys
import traceback

def log(msg):
	print(f"\n=== {msg} ===\n")

def run_experiments():
	log("1. Running experiments and collecting profiling data")
	try:
		import experiments.run_experiments as exp
		exp.main()
	except Exception as e:
		print("[Warning] Experiment phase failed or already run:", e)

def compute_energy_carbon():
	log("2. Computing energy and carbon emissions")
	try:
		import json
		from carbon.carbon_calculator import enrich_with_energy_and_carbon
		raw_path = os.path.join(os.path.dirname(__file__), 'data/experiments/raw_results.json')
		if not os.path.exists(raw_path):
			print("[Warning] No raw results found. Skipping energy/carbon computation.")
			return
		with open(raw_path, 'r') as f:
			results = json.load(f)
		# Recursively enrich all run dicts
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
	except Exception as e:
		print("[Warning] Energy/carbon phase failed:", e)

def build_dataset():
	log("3. Building cleaned dataset CSV")
	try:
		from ai_model.dataset_builder import main as build_main
		build_main()
	except Exception as e:
		print("[Warning] Dataset build phase failed or already exists:", e)

def train_or_load_model():
	log("4. Training or loading AI model")
	try:
		from ai_model.train_model import train_and_save_model
		train_and_save_model()
	except Exception as e:
		print("[Warning] Model training phase failed or already exists:", e)

def run_optimizer():
	log("5. Running quantum-inspired optimization")
	try:
		import pandas as pd
		from optimization.quantum_inspired_optimizer import select_best_algorithm
		csv_path = os.path.join(os.path.dirname(__file__), 'data/experiments/cleaned_results.csv')
		if not os.path.exists(csv_path):
			print("[Warning] No dataset found for optimization.")
			return None, None
		df = pd.read_csv(csv_path)
		max_size = df['dataset_size'].max()
		df_plot = df[df['dataset_size'] == max_size]
		algos = df_plot[['algorithm', 'carbon_gco2', 'avg_time_sec']].to_dict('records')
		best_algo, score, explanation = select_best_algorithm(algos)
		print(f"Optimizer selected: {best_algo}\nExplanation: {explanation}")
		return best_algo, explanation
	except Exception as e:
		print("[Warning] Optimizer phase failed:", e)
		return None, None

def generate_visualizations(best_algo=None, explanation=None):
	log("6. Generating comparison visualizations")
	try:
		from visualization.comparison_plots import plot_comparisons
		from visualization.dashboard import show_dashboard
		plot_comparisons()
		show_dashboard()
	except Exception as e:
		print("[Warning] Visualization phase failed:", e)

def main():
	try:
		run_experiments()
		compute_energy_carbon()
		build_dataset()
		train_or_load_model()
		best_algo, explanation = run_optimizer()
		generate_visualizations(best_algo, explanation)
		log("Pipeline complete!")
	except Exception as e:
		print("[Fatal] Pipeline failed:")
		traceback.print_exc()
		sys.exit(1)

if __name__ == "__main__":
	main()
