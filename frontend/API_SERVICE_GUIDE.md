# API Service Integration Guide

## Overview

The frontend now has a centralized API service layer using Axios for all backend communication.

## File Structure

```
src/services/
├── api.js                  # Core Axios instance
├── systemService.js        # System footprint API calls
├── benchmarkService.js     # Benchmark API calls
├── optimizeService.js      # Optimization API calls
└── index.js               # Service exports
```

## Usage Examples

### Import in Components

```javascript
import { systemService, benchmarkService, optimizeService } from '@/services'

// Or import individual services
import * as systemService from '@/services/systemService'
import * as benchmarkService from '@/services/benchmarkService'
import * as optimizeService from '@/services/optimizeService'

// Or import the raw API instance
import api from '@/services/api'
```

### System Service Example

```javascript
import { systemService } from '@/services'
import { useState, useEffect } from 'react'

function Dashboard() {
  const [footprint, setFootprint] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFootprint = async () => {
      setLoading(true)
      try {
        const data = await systemService.getSystemFootprint()
        setFootprint(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchFootprint()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h2>System Carbon Footprint</h2>
      <p>CPU: {footprint?.cpu_percent}%</p>
      <p>Memory: {footprint?.memory_used_gb} GB</p>
      <p>Carbon: {footprint?.carbon_kg_per_hour} kg CO₂/hour</p>
    </div>
  )
}
```

### Benchmark Service Example

```javascript
import { benchmarkService } from '@/services'
import { useState } from 'react'

function RunBenchmark() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleRunBenchmark = async () => {
    setLoading(true)
    try {
      const data = await benchmarkService.runBenchmark(
        ['merge_sort', 'quick_sort'],
        1000
      )
      setResults(data)
    } catch (err) {
      console.error('Benchmark failed:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button onClick={handleRunBenchmark} disabled={loading}>
        {loading ? 'Running...' : 'Run Benchmark'}
      </button>
      {results && (
        <div>
          <h3>Results</h3>
          {/* Display results */}
        </div>
      )}
    </div>
  )
}
```

### Optimization Service Example

```javascript
import { optimizeService } from '@/services'
import { useEffect, useState } from 'react'

function OptimizationPage() {
  const [recommendation, setRecommendation] = useState(null)

  useEffect(() => {
    const getRecommendation = async () => {
      try {
        const data = await optimizeService.getOptimization('balanced')
        setRecommendation(data)
      } catch (err) {
        console.error('Failed to get recommendation:', err)
      }
    }
    getRecommendation()
  }, [])

  return (
    <div>
      <h2>Algorithm Recommendation</h2>
      <p>Best: {recommendation?.best_algorithm}</p>
      <p>Score: {recommendation?.optimization_score}</p>
      <p>{recommendation?.explanation}</p>
    </div>
  )
}
```

### Custom Scenario Recommendation

```javascript
import { optimizeService } from '@/services'

async function getRecommendationForScenario() {
  try {
    const data = await optimizeService.getScenarioRecommendation(
      cpu_intensive = true,
      memory_intensive = false,
      latency_sensitive = true
    )
    console.log('Recommended algorithm:', data.best_algorithm)
  } catch (err) {
    console.error('Error:', err)
  }
}
```

## API Service Features

### Axios Configuration

```javascript
// baseURL: http://localhost:8000
// Timeout: 10 seconds
// Default Headers: Content-Type: application/json
```

### Interceptors

**Request Interceptor**: Logs all API calls
```
[API] GET /system-footprint
[API] POST /benchmark
```

**Response Interceptor**: Automatically extracts response data
- Returns `response.data` instead of full response object
- Logs errors with status code and message

### Error Handling

```javascript
import { systemService } from '@/services'

try {
  const data = await systemService.getSystemFootprint()
  console.log(data)
} catch (error) {
  console.error('API Error:', error.response?.status)
  console.error('Message:', error.message)
}
```

## Service Methods

### System Service

- `getSystemFootprint()` - Get current system metrics
- `estimateFootprint(cpu_percent, memory_gb)` - Estimate custom footprint

### Benchmark Service

- `getBenchmarkStatus()` - Check benchmark availability
- `runBenchmark(algorithms, dataset_size)` - Run benchmarks
- `getBenchmarkResults()` - Get latest results
- `compareBenchmarks(algorithm_1, algorithm_2)` - Compare two algorithms

### Optimization Service

- `getOptimizeStatus()` - Check optimizer availability
- `getOptimization(strategy, dataset_size)` - Get recommendations
- `getScenarioRecommendation(cpu, memory, latency)` - Scenario-specific
- `getAlgorithms()` - List available algorithms

## Using Raw API Instance

For endpoints not yet wrapped in services, use the raw API instance:

```javascript
import api from '@/services/api'

// GET request
const data = await api.get('/some-endpoint')

// POST request
const data = await api.post('/some-endpoint', { key: 'value' })

// PUT request
const data = await api.put('/some-endpoint', { key: 'value' })

// DELETE request
const data = await api.delete('/some-endpoint')
```

## Changing the Backend URL

To change the backend URL (e.g., for production):

**Option 1: Edit api.js directly**
```javascript
const api = axios.create({
  baseURL: 'https://api.production.com',
  // ...
})
```

**Option 2: Use environment variables (recommended)**

Create `.env.local` in the frontend root:
```
VITE_API_BASE=http://localhost:8000
VITE_API_PROD=https://api.production.com
```

Update `api.js`:
```javascript
const baseURL = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

const api = axios.create({
  baseURL,
  // ...
})
```

## Best Practices

1. **Always use services** - Don't import API directly in components
2. **Handle errors** - Always wrap API calls in try-catch
3. **Show loading states** - Indicate when data is loading
4. **Use JSDoc** - Document your service functions
5. **Centralize logic** - Keep all API calls in services directory

## Testing Endpoints

Visit `http://localhost:8000/docs` to test endpoints interactively using Swagger UI.

## Common Issues

### CORS Error
- Ensure backend is running on port 8000
- Check backend CORS configuration includes your frontend URL

### Connection Timeout
- Verify backend server is running
- Check port 8000 is accessible
- Increase timeout in `api.js` if needed

### 404 Not Found
- Check endpoint path is correct
- Verify backend route is implemented
- Test with Swagger UI at `/docs`

## Next Steps

1. Import services in your page components
2. Call API methods in useEffect hooks
3. Handle loading and error states
4. Display data in UI components
5. Test with interactive API docs

---

**Status**: ✅ API service layer configured and ready to use
