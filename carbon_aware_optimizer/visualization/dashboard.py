
"""
Simple dashboard to display algorithm comparison plots and optimizer results.
"""
import os
import matplotlib.pyplot as plt
from matplotlib.image import imread
from .comparison_plots import plot_comparisons, IMG_DIR

def show_dashboard():
	best_algo, explanation = plot_comparisons()
	# Display plots
	img_files = [
		'carbon_per_algorithm.png',
		'runtime_per_algorithm.png',
		'carbon_vs_runtime.png'
	]
	for img in img_files:
		img_path = os.path.join(IMG_DIR, img)
		if os.path.exists(img_path):
			image = imread(img_path)
			plt.figure(figsize=(7, 4))
			plt.imshow(image)
			plt.axis('off')
			plt.title(img.replace('_', ' ').replace('.png', '').title())
			plt.show()
	print(f"\nOptimizer's Choice: {best_algo}\nExplanation: {explanation}\n")

if __name__ == "__main__":
	show_dashboard()
