
"""
Trains a Random Forest Regressor to predict carbon emissions from execution metrics.
Loads cleaned CSV, selects features, splits data, trains, evaluates, and saves model.
"""
import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score, mean_absolute_error
import joblib

FEATURES = ['dataset_size', 'avg_time_sec', 'avg_cpu_percent', 'avg_memory_mb']
TARGET = 'carbon_gco2'
MODEL_PATH = os.path.join(os.path.dirname(__file__), '../data/experiments/carbon_predictor.joblib')
CSV_PATH = os.path.join(os.path.dirname(__file__), '../data/experiments/cleaned_results.csv')

def train_and_save_model():
	if not os.path.exists(CSV_PATH):
		print(f"[Error] Dataset not found at {CSV_PATH}. Run dataset_builder.py first.")
		return

	df = pd.read_csv(CSV_PATH)
	X = df[FEATURES]
	y = df[TARGET]
	
	# Split data
	X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
	
	# Initialize and train Random Forest Regressor
	# n_estimators=100 is a good starting point for robustness
	print("Training Random Forest Regressor...")
	model = RandomForestRegressor(n_estimators=100, random_state=42)
	model.fit(X_train, y_train)
	
	# Evaluate
	y_pred = model.predict(X_test)
	r2 = r2_score(y_test, y_pred)
	mae = mean_absolute_error(y_test, y_pred)
	
	print(f"Model Performance:")
	print(f"  R2 Score: {r2:.3f}")
	print(f"  MAE: {mae:.2f} gCO2")
	
	# Feature Importance
	print("\nFeature Importances:")
	importances = model.feature_importances_
	for name, importance in zip(FEATURES, importances):
		print(f"  {name}: {importance:.4f}")

	# Save model
	joblib.dump(model, MODEL_PATH)
	print(f"\nTrained model saved to {MODEL_PATH}")

if __name__ == "__main__":
	train_and_save_model()
