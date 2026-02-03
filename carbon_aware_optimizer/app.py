
import streamlit as st
import pandas as pd
import os
import json
import matplotlib.pyplot as plt
from matplotlib.image import imread
import subprocess
import sys

# Import project modules
from ai_model.predictor import predict_carbon_emission, FEATURES
from optimization.quantum_inspired_optimizer import select_best_algorithm

# Set page config
st.set_page_config(
    page_title="GreenAlgo Optimizer",
    page_icon="🌱",
    layout="wide"
)

# Sidebar navigation
st.sidebar.title("🌱 GreenAlgo Optimizer")
menu = st.sidebar.radio("Navigation", ["Overview", "Run Experiments", "Results & Analytics", "AI Predictor"])

# Paths
DATA_DIR = os.path.join(os.getcwd(), 'data', 'experiments')
RAW_RESULTS = os.path.join(DATA_DIR, 'raw_results.json')
CLEANED_CSV = os.path.join(DATA_DIR, 'cleaned_results.csv')
IMG_DIR = DATA_DIR

# Overview Page
if menu == "Overview":
    st.title("🌱 Carbon-Aware Algorithm Optimization")
    st.markdown("""
    ### Project Overview
    This project focuses on reducing the environmental impact of software by optimizing algorithm selection based on carbon emissions and energy consumption.
    
    **How it works:**
    1. **Profiling:** Measures CPU, Memory, and Runtime of various algorithms (Sort, Search, etc.).
    2. **Carbon Calculation:** Estimates energy consumption and maps it to carbon intensity.
    3. **AI Modeling:** Trains a model to predict carbon emissions for given workloads.
    4. **Optimization:** Uses a Quantum-Inspired Optimizer to select the most "Green" algorithm for your needs.
    """)
    
    col1, col2, col3 = st.columns(3)
    col1.metric("Algorithms Tracked", "6+")
    col2.metric("Primary Metric", "gCO2")
    col3.metric("Optimizer", "Quantum-Inspired")

# Run Experiments Page
elif menu == "Run Experiments":
    st.title("🚀 Pipeline Execution")
    st.info("Execute the full pipeline: Profiling -> Carbon Computation -> AI Training -> Optimization")
    
    if st.button("Start Full Pipeline"):
        with st.spinner("Running pipeline... this may take a minute."):
            try:
                # Run main.py using subprocess to capture output
                result = subprocess.run([sys.executable, 'main.py'], capture_output=True, text=True)
                st.code(result.stdout)
                if result.returncode == 0:
                    st.success("Pipeline executed successfully!")
                else:
                    st.error("Pipeline failed. See logs above.")
            except Exception as e:
                st.error(f"Error running pipeline: {e}")

# Results & Analytics Page
elif menu == "Results & Analytics":
    st.title("📊 Data & Visualizations")
    
    if os.path.exists(CLEANED_CSV):
        df = pd.read_csv(CLEANED_CSV)
        st.subheader("Dataset Preview")
        st.dataframe(df.head(10))
        
        st.subheader("Visualizations")
        img_files = ['carbon_per_algorithm.png', 'runtime_per_algorithm.png', 'carbon_vs_runtime.png']
        
        cols = st.columns(2)
        for i, img in enumerate(img_files):
            img_path = os.path.join(IMG_DIR, img)
            if os.path.exists(img_path):
                cols[i % 2].image(img_path, use_container_width=True, caption=img.replace('_', ' ').replace('.png', '').title())
            else:
                cols[i % 2].warning(f"Plot {img} not found. Run the pipeline first.")
                
        # Optimization Result from Data
        st.divider()
        st.subheader("Quantum-Inspired Optimizer Selection")
        max_size = df['dataset_size'].max()
        df_plot = df[df['dataset_size'] == max_size]
        algos_list = df_plot[['algorithm', 'carbon_gco2', 'avg_time_sec']].to_dict('records')
        
        if algos_list:
            alpha = st.slider("Alpha (Weight for Carbon)", 0.0, 1.0, 0.5)
            beta = 1.0 - alpha
            st.caption(f"Beta (Weight for Runtime) is automatically set to {beta:.1f}")
            
            best_algo, score, explanation = select_best_algorithm(algos_list, alpha, beta)
            st.success(f"**Best Algorithm Selection:** {best_algo}")
            st.info(f"**Explanation:** {explanation}")
    else:
        st.warning("No experiment data found. Please run the pipeline first.")

# AI Predictor Page
elif menu == "AI Predictor":
    st.title("🤖 AI Carbon Predictor")
    st.write("Input system metrics to predict the estimated carbon footprint.")
    
    col1, col2 = st.columns(2)
    with col1:
        size = st.number_input("Dataset Size", min_value=1, value=10000)
        time = st.number_input("Avg Runtime (sec)", min_value=0.0, value=0.5, format="%.4f")
    with col2:
        cpu = st.number_input("Avg CPU Usage (%)", min_value=0.0, max_value=100.0, value=15.0)
        mem = st.number_input("Avg Memory Usage (MB)", min_value=0.0, value=64.0)
        
    if st.button("Predict Carbon Emission"):
        try:
            input_data = {
                'dataset_size': size,
                'avg_time_sec': time,
                'avg_cpu_percent': cpu,
                'avg_memory_mb': mem
            }
            prediction = predict_carbon_emission(input_data)
            st.metric("Estimated Carbon Emission", f"{prediction:.4f} gCO2")
            
            # Contextual info
            st.write("This prediction is based on the trained Random Forest regressor using previously collected profiling data.")
        except FileNotFoundError:
            st.error("Model file not found. Please run the pipeline (Run Experiments) to train the model first.")
        except Exception as e:
            st.error(f"Error making prediction: {e}")

st.sidebar.markdown("---")
st.sidebar.info("Developed for Green Computing Research.")
