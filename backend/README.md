# GreenAlgoBench Backend API

FastAPI backend for the GreenAlgoBench - Carbon-Aware Algorithm Optimization Platform.

Exposes Python research logic as REST APIs that the React frontend can consume.

## Directory Structure

```
backend/
├── app.py                 # Main FastAPI application
├── requirements.txt       # Python dependencies
├── routes/
│   ├── __init__.py
│   ├── system.py         # System footprint endpoints
│   ├── benchmark.py      # Benchmark endpoints
│   └── optimize.py       # Optimization endpoints
└── README.md            # This file
```

## Installation

### Prerequisites
- Python 3.8+
- pip

### Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (optional but recommended):
```bash
python -m venv venv
```

On Windows:
```bash
venv\Scripts\activate
```

On macOS/Linux:
```bash
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Server

Start the development server:
```bash
uvicorn app:app --reload --port 8000
```

The server will be available at: `http://localhost:8000`

### Server Options
- `--reload`: Auto-restart on code changes (development only)
- `--port 8000`: Specify port (default is 8000)
- `--host 0.0.0.0`: Expose on all network interfaces

## API Endpoints

### Health Check
- **GET** `/health` - Server health check
- **GET** `/` - API root with links to documentation

### System Footprint
- **GET** `/api/system-footprint` - Get current system carbon footprint
- **POST** `/api/system-footprint/estimate` - Estimate footprint for custom resources

### Benchmark
- **GET** `/api/benchmark/status` - Get benchmark status
- **POST** `/api/benchmark` - Run algorithm benchmarks
- **GET** `/api/benchmark/results` - Get latest benchmark results
- **POST** `/api/benchmark/compare` - Compare two algorithms

### Optimization
- **GET** `/api/optimize/status` - Get optimizer status
- **POST** `/api/optimize` - Get optimization recommendations
- **POST** `/api/optimize/recommend-for-scenario` - Get scenario-specific recommendations
- **GET** `/api/optimize/algorithms` - List available algorithms

## API Documentation

Interactive API documentation available at:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## Example Requests

### Get System Footprint
```bash
curl http://localhost:8000/api/system-footprint
```

### Run Benchmark
```bash
curl -X POST http://localhost:8000/api/benchmark \
  -H "Content-Type: application/json" \
  -d '{"algorithms": ["merge_sort", "quick_sort"], "dataset_size": 1000}'
```

### Get Optimization Recommendation
```bash
curl -X POST http://localhost:8000/api/optimize \
  -H "Content-Type: application/json" \
  -d '{"strategy": "balanced"}'
```

## CORS Configuration

The API is configured with CORS enabled for:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (Alternative frontend)

To add additional origins, modify the `CORSMiddleware` in `app.py`.

## Environment Variables

Currently, no environment variables are required. Configuration can be added as needed.

## Troubleshooting

### Port Already in Use
If port 8000 is already in use:
```bash
uvicorn app:app --port 8001
```

### ImportError on psutil
Ensure psutil is installed:
```bash
pip install psutil
```

### CORS Errors
Verify that the frontend URL is in the allowed origins in `app.py`.

## Production Deployment

For production deployment:

1. Use a production ASGI server (Gunicorn):
```bash
pip install gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker app:app
```

2. Update CORS allowed origins
3. Add environment-based configuration
4. Implement request logging and monitoring

## Integration with Frontend

The React frontend can consume these APIs using `fetch` or `axios`:

```javascript
// Example: Get system footprint
async function getSystemFootprint() {
  const response = await fetch('http://localhost:8000/api/system-footprint');
  const data = await response.json();
  console.log(data);
}
```

## Notes

- This backend serves sample data for benchmarks and optimization recommendations
- To integrate actual research algorithms, import from `carbon_aware_optimizer` module
- All timestamps are in UTC (ISO 8601 format)
- Carbon values are in kg CO2 equivalent

## Support

For issues or questions, refer to the main project documentation.
