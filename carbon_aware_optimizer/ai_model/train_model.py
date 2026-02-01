
"""
Trains a regression model to predict carbon emissions from execution metrics.
Loads cleaned CSV, selects features, splits data, trains, evaluates, and saves model.
"""
import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score, mean_absolute_error
import joblib

FEATURES = ['dataset_size', 'avg_time_sec', 'avg_cpu_percent', 'avg_memory_mb']
TARGET = 'carbon_gco2'
MODEL_PATH = os.path.join(os.path.dirname(__file__), '../data/experiments/carbon_predictor.joblib')
CSV_PATH = os.path.join(os.path.dirname(__file__), '../data/experiments/cleaned_results.csv')

def train_and_save_model():
	df = pd.read_csv(CSV_PATH)
	X = df[FEATURES]
	y = df[TARGET]
	X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
	model = LinearRegression()
	model.fit(X_train, y_train)
	y_pred = model.predict(X_test)
	r2 = r2_score(y_test, y_pred)
	mae = mean_absolute_error(y_test, y_pred)
	print(f"Model R2: {r2:.3f}, MAE: {mae:.2f} gCO2")
	joblib.dump(model, MODEL_PATH)
	print(f"Trained model saved to {MODEL_PATH}")

if __name__ == "__main__":
	train_and_save_model()
