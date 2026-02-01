
"""
Comparison plots for algorithm benchmarking and optimization.
"""
import os
import pandas as pd
import matplotlib.pyplot as plt
from optimization.quantum_inspired_optimizer import select_best_algorithm

CSV_PATH = os.path.join(os.path.dirname(__file__), '../data/experiments/cleaned_results.csv')
IMG_DIR = os.path.join(os.path.dirname(__file__), '../data/experiments/')

def plot_comparisons():
	df = pd.read_csv(CSV_PATH)
	# Use only one dataset_size for clarity (e.g., largest)
	max_size = df['dataset_size'].max()
	df_plot = df[df['dataset_size'] == max_size]
	# Prepare input for optimizer
	algos = df_plot[['algorithm', 'carbon_gco2', 'avg_time_sec']].to_dict('records')
	best_algo, _, explanation = select_best_algorithm(algos)

	# a) Carbon emissions per algorithm
	plt.figure(figsize=(8, 5))
	bars = plt.bar(df_plot['algorithm'], df_plot['carbon_gco2'], color=["#4CAF50" if a==best_algo else "#888" for a in df_plot['algorithm']])
	plt.title('Carbon Emissions per Algorithm')
	plt.xlabel('Algorithm')
	plt.ylabel('Carbon Emissions (gCO2)')
	plt.legend([bars[df_plot['algorithm'].tolist().index(best_algo)]], [f'Optimizer Choice: {best_algo}'])
	plt.tight_layout()
	plt.savefig(os.path.join(IMG_DIR, 'carbon_per_algorithm.png'))
	plt.close()

	# b) Runtime per algorithm
	plt.figure(figsize=(8, 5))
	bars = plt.bar(df_plot['algorithm'], df_plot['avg_time_sec'], color=["#2196F3" if a==best_algo else "#888" for a in df_plot['algorithm']])
	plt.title('Runtime per Algorithm')
	plt.xlabel('Algorithm')
	plt.ylabel('Runtime (seconds)')
	plt.legend([bars[df_plot['algorithm'].tolist().index(best_algo)]], [f'Optimizer Choice: {best_algo}'])
	plt.tight_layout()
	plt.savefig(os.path.join(IMG_DIR, 'runtime_per_algorithm.png'))
	plt.close()

	# c) Carbon vs Runtime scatter
	plt.figure(figsize=(7, 5))
	for idx, row in df_plot.iterrows():
		plt.scatter(row['avg_time_sec'], row['carbon_gco2'], color="#E91E63" if row['algorithm']==best_algo else "#888", s=100)
		plt.text(row['avg_time_sec'], row['carbon_gco2'], row['algorithm'], fontsize=9, ha='right')
	plt.title('Carbon vs Runtime (Scatter)')
	plt.xlabel('Runtime (seconds)')
	plt.ylabel('Carbon Emissions (gCO2)')
	plt.tight_layout()
	plt.savefig(os.path.join(IMG_DIR, 'carbon_vs_runtime.png'))
	plt.close()

	return best_algo, explanation

if __name__ == "__main__":
	best, expl = plot_comparisons()
	print(f"Best algorithm: {best}\nExplanation: {expl}")
