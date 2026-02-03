# Backend Integration Guide for Frontend

This guide explains how to integrate the FastAPI backend with the React frontend.

## Backend Status

✅ **Backend is operational and ready for integration**

- Server: `http://localhost:8000`
- API Documentation: `http://localhost:8000/docs` (Swagger UI)
- ReDoc: `http://localhost:8000/redoc`

## Base API URL

For development, use:
```javascript
const API_BASE = 'http://localhost:8000/api'
```

For production, update this to your production backend URL.

## Available Endpoints

### 1. System Footprint API

#### Get Current System Footprint
```javascript
// GET /api/system-footprint
fetch('http://localhost:8000/api/system-footprint')
  .then(res => res.json())
  .then(data => console.log(data))

// Response:
{
  "cpu_percent": 35.2,
  "memory_used_gb": 6.2,
  "memory_percent": 15.5,
  "power_watts": 110.25,
  "carbon_kg_per_hour": 0.0523,
  "energy_kwh": 0.1103,
  "timestamp": "2026-02-02T14:30:00Z",
  "message": "System footprint calculated successfully"
}
```

#### Estimate Footprint for Custom Values
```javascript
// POST /api/system-footprint/estimate
fetch('http://localhost:8000/api/system-footprint/estimate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    cpu_percent: 50,
    memory_gb: 8
  })
})
  .then(res => res.json())
  .then(data => console.log(data))
```

### 2. Benchmark API

#### Get Benchmark Status
```javascript
// GET /api/benchmark/status
fetch('http://localhost:8000/api/benchmark/status')
  .then(res => res.json())
  .then(data => console.log(data))
```

#### Run Benchmarks
```javascript
// POST /api/benchmark
fetch('http://localhost:8000/api/benchmark', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    algorithms: ['merge_sort', 'quick_sort'],
    dataset_size: 1000
  })
})
  .then(res => res.json())
  .then(data => console.log(data))

// Response:
{
  "algorithms_benchmarked": ["merge_sort", "quick_sort"],
  "dataset_size": 1000,
  "results": {
    "merge_sort": {
      "time": 0.0098,
      "memory": 256,
      "energy": 0.0018,
      "carbon_gco2": 0.0085
    },
    "quick_sort": {
      "time": 0.0105,
      "memory": 192,
      "energy": 0.0015,
      "carbon_gco2": 0.0071
    }
  },
  "best_performer_time": {
    "algorithm": "merge_sort",
    "time_seconds": 0.0098
  },
  "most_carbon_efficient": {
    "algorithm": "quick_sort",
    "carbon_gco2": 0.0071
  },
  "timestamp": "2026-02-02T14:30:00Z",
  "message": "Benchmark completed successfully"
}
```

#### Get Latest Results
```javascript
// GET /api/benchmark/results
fetch('http://localhost:8000/api/benchmark/results')
  .then(res => res.json())
  .then(data => console.log(data))
```

#### Compare Two Algorithms
```javascript
// POST /api/benchmark/compare
fetch('http://localhost:8000/api/benchmark/compare', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    algorithm_1: 'merge_sort',
    algorithm_2: 'quick_sort'
  })
})
  .then(res => res.json())
  .then(data => console.log(data))
```

### 3. Optimization API

#### Get Optimizer Status
```javascript
// GET /api/optimize/status
fetch('http://localhost:8000/api/optimize/status')
  .then(res => res.json())
  .then(data => console.log(data))
```

#### Get Optimization Recommendations
```javascript
// POST /api/optimize
fetch('http://localhost:8000/api/optimize', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    strategy: 'balanced'  // 'carbon_first', 'speed_first', or 'balanced'
  })
})
  .then(res => res.json())
  .then(data => console.log(data))

// Response:
{
  "strategy": "balanced",
  "best_algorithm": "merge_sort",
  "optimization_score": 0.92,
  "explanation": "Merge sort offers the best balance...",
  "alternatives": [
    {
      "algorithm": "quick_sort",
      "score": 0.87,
      "explanation": "..."
    }
  ],
  "carbon_saved_annually": 2.4,
  "timestamp": "2026-02-02T14:30:00Z",
  "message": "Optimization completed successfully"
}
```

#### Get Scenario-Specific Recommendations
```javascript
// POST /api/optimize/recommend-for-scenario
fetch('http://localhost:8000/api/optimize/recommend-for-scenario', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    cpu_intensive: false,
    memory_intensive: true,
    latency_sensitive: false
  })
})
  .then(res => res.json())
  .then(data => console.log(data))
```

#### List All Algorithms
```javascript
// GET /api/optimize/algorithms
fetch('http://localhost:8000/api/optimize/algorithms')
  .then(res => res.json())
  .then(data => console.log(data))
```

## Example Frontend Integration

### React Hook for System Footprint

```javascript
import { useState, useEffect } from 'react'

function useSystemFootprint() {
  const [footprint, setFootprint] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchFootprint()
  }, [])

  const fetchFootprint = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:8000/api/system-footprint')
      if (!response.ok) throw new Error('Failed to fetch footprint')
      const data = await response.json()
      setFootprint(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { footprint, loading, error, refetch: fetchFootprint }
}

// Usage in component
function Dashboard() {
  const { footprint, loading, error } = useSystemFootprint()

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h2>System Carbon Footprint</h2>
      <p>CPU Usage: {footprint?.cpu_percent}%</p>
      <p>Memory: {footprint?.memory_used_gb} GB</p>
      <p>Carbon per Hour: {footprint?.carbon_kg_per_hour} kg CO₂</p>
    </div>
  )
}
```

### React Hook for Benchmarks

```javascript
function useBenchmark() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const runBenchmark = async (algorithms, datasetSize = 1000) => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:8000/api/benchmark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          algorithms,
          dataset_size: datasetSize
        })
      })
      if (!response.ok) throw new Error('Benchmark failed')
      const data = await response.json()
      setResults(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { results, loading, error, runBenchmark }
}
```

### React Hook for Optimization

```javascript
function useOptimization() {
  const [recommendation, setRecommendation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getRecommendation = async (strategy = 'balanced') => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:8000/api/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ strategy })
      })
      if (!response.ok) throw new Error('Optimization failed')
      const data = await response.json()
      setRecommendation(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { recommendation, loading, error, getRecommendation }
}
```

## CORS Notes

The backend has CORS enabled for:
- `http://localhost:5173` (Vite dev)
- `http://localhost:3000` (Alt port)

If you're running the frontend on a different port, add it to the CORS allowed origins in `backend/app.py`.

## Error Handling

All endpoints return appropriate HTTP status codes:
- **200**: Successful request
- **400**: Bad request (validation error)
- **500**: Server error

Always handle error responses:
```javascript
fetch(url)
  .then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
  })
  .catch(err => console.error('API Error:', err))
```

## Testing the API

Use the interactive API documentation:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

You can test all endpoints directly from these interfaces.

## Performance Notes

- System footprint queries are fast (< 100ms)
- Benchmark runs may take longer depending on dataset size
- Optimization queries should return in milliseconds
- Results are cached, consider refresh intervals

## Next Steps

1. Copy the React hooks into your frontend
2. Integrate hooks into page components
3. Display API responses in the UI
4. Add loading and error states
5. Test in browser at `localhost:5173`

## Troubleshooting

### CORS Errors
- Ensure backend is running on port 8000
- Check frontend URL is in CORS allowed origins

### Connection Refused
- Verify backend server is running: `uvicorn app:app --reload`
- Check port 8000 is not blocked

### Invalid Responses
- Check API documentation at `/docs`
- Verify request body format matches schema
- Check browser console for detailed error messages

---

Backend created: ✅ Ready for integration
