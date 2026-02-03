"""
FastAPI application for GreenAlgoBench - Carbon-Aware Algorithm Optimization Platform

This application exposes the existing Python logic as REST APIs:
- System Footprint: Get current system carbon footprint
- Benchmark: Run algorithm benchmarks
- Optimize: Get algorithm optimization recommendations
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import system, benchmark, optimize

# Initialize FastAPI app
app = FastAPI(
    title="GreenAlgoBench API",
    description="Carbon-Aware Algorithm Optimization Platform",
    version="1.0.0"
)

# Enable CORS for frontend (localhost:5173 and production URLs)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",      # Vite dev server
        "http://localhost:3000",       # Alternative frontend port
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include route modules
app.include_router(system.router, prefix="/api", tags=["System"])
app.include_router(benchmark.router, prefix="/api", tags=["Benchmark"])
app.include_router(optimize.router, prefix="/api", tags=["Optimization"])

# Health check endpoint
@app.get("/health")
async def health_check():
    """
    Simple health check endpoint to verify server is running.
    """
    return {
        "status": "healthy",
        "service": "GreenAlgoBench API",
        "version": "1.0.0"
    }

# Root endpoint
@app.get("/")
async def root():
    """
    API root endpoint with welcome message and documentation links.
    """
    return {
        "message": "Welcome to GreenAlgoBench API",
        "documentation": "/docs",
        "endpoints": {
            "health": "/health",
            "system_footprint": "/api/system-footprint",
            "run_benchmark": "/api/benchmark",
            "optimize": "/api/optimize"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
