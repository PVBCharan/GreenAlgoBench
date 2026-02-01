
"""
Predicts carbon emissions using the trained regression model.
"""
import os
import joblib
import numpy as np

FEATURES = ['dataset_size', 'avg_time_sec', 'avg_cpu_percent', 'avg_memory_mb']
MODEL_PATH = os.path.join(os.path.dirname(__file__), '../data/experiments/carbon_predictor.joblib')

def load_model():
	return joblib.load(MODEL_PATH)

def predict_carbon_emission(metrics_dict):
	"""
	metrics_dict: dict with keys matching FEATURES
	Returns predicted carbon emissions (gCO2)
	"""
	model = load_model()
	X = np.array([[metrics_dict[feat] for feat in FEATURES]])
	pred = model.predict(X)
	return float(pred[0])

if __name__ == "__main__":
	# Example usage
	example = {
		'dataset_size': 5000,
		'avg_time_sec': 0.5,
		'avg_cpu_percent': 10.0,
		'avg_memory_mb': 50.0
	}
	pred = predict_carbon_emission(example)
	print(f"Predicted carbon emissions: {pred:.2f} gCO2")
