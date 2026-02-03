# API Service - Quick Reference

## Installation ✅

```bash
npm install axios
```

## Import Options

```javascript
// Option 1: Import specific service
import { systemService } from '@/services'

// Option 2: Import all services
import { systemService, benchmarkService, optimizeService } from '@/services'

// Option 3: Import custom hook
import { useSystemFootprint } from '@/hooks/useApi'

// Option 4: Import raw API instance
import api from '@/services/api'
```

## Quick Examples

### Get System Footprint (Hook)
```javascript
const { data, loading, error } = useSystemFootprint()
```

### Run Benchmark (Hook)
```javascript
const { results, loading, error, run } = useBenchmark()
run(['merge_sort', 'quick_sort'], 1000)
```

### Get Optimization (Hook)
```javascript
const { recommendation, loading, error, getRecommendation } = useOptimization()
```

### System Footprint (Service)
```javascript
const footprint = await systemService.getSystemFootprint()
const estimate = await systemService.estimateFootprint(50, 8)
```

### Benchmark (Service)
```javascript
const status = await benchmarkService.getBenchmarkStatus()
const results = await benchmarkService.runBenchmark(['merge_sort'], 1000)
const latest = await benchmarkService.getBenchmarkResults()
const comparison = await benchmarkService.compareBenchmarks('merge_sort', 'quick_sort')
```

### Optimization (Service)
```javascript
const status = await optimizeService.getOptimizeStatus()
const rec = await optimizeService.getOptimization('balanced')
const scenario = await optimizeService.getScenarioRecommendation(true, false, false)
const algos = await optimizeService.getAlgorithms()
```

### Raw API (When needed)
```javascript
const data = await api.get('/endpoint')
const data = await api.post('/endpoint', { body })
```

## File Locations

```
src/
├── services/api.js              # Axios configuration
├── services/systemService.js    # System API calls
├── services/benchmarkService.js # Benchmark API calls
├── services/optimizeService.js  # Optimization API calls
├── services/index.js            # Service exports
└── hooks/useApi.js             # Custom hooks
```

## API Endpoints

| Service | Method | Endpoint |
|---------|--------|----------|
| System | GET | `/api/system-footprint` |
| System | POST | `/api/system-footprint/estimate` |
| Benchmark | GET | `/api/benchmark/status` |
| Benchmark | POST | `/api/benchmark` |
| Benchmark | GET | `/api/benchmark/results` |
| Benchmark | POST | `/api/benchmark/compare` |
| Optimize | GET | `/api/optimize/status` |
| Optimize | POST | `/api/optimize` |
| Optimize | POST | `/api/optimize/recommend-for-scenario` |
| Optimize | GET | `/api/optimize/algorithms` |

## Custom Hooks Quick Ref

| Hook | Use Case |
|------|----------|
| `useSystemFootprint()` | Display current system metrics |
| `useBenchmark()` | Run benchmarks manually |
| `useOptimization()` | Show optimization recommendation |
| `useBenchmarkResults()` | Display latest benchmark results |
| `useAlgorithms()` | List available algorithms |

## Component Template

```javascript
import { useSystemFootprint } from '@/hooks/useApi'

export default function YourComponent() {
  const { data, loading, error } = useSystemFootprint()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      {/* Display data */}
      <p>Data: {JSON.stringify(data)}</p>
    </div>
  )
}
```

## Error Handling Template

```javascript
try {
  const data = await systemService.getSystemFootprint()
  console.log('Success:', data)
} catch (error) {
  console.error('Error:', error.message)
  // Handle error (show message, retry, etc.)
}
```

## Environment Setup (Optional)

Create `.env.local` in frontend root:
```
VITE_API_BASE=http://localhost:8000
```

Then in `src/services/api.js`:
```javascript
const baseURL = import.meta.env.VITE_API_BASE || 'http://localhost:8000'
```

## Testing URLs

- **Backend**: `http://localhost:8000`
- **API Docs**: `http://localhost:8000/docs`
- **Frontend**: `http://localhost:5173`

## Most Common Usage Pattern

```javascript
// In your page/component
import { useSystemFootprint } from '@/hooks/useApi'
import { useState, useEffect } from 'react'

export default function Dashboard() {
  const { data: footprint, loading, error } = useSystemFootprint()

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {footprint && (
        <>
          <h2>System Footprint</h2>
          <p>CPU: {footprint.cpu_percent}%</p>
          <p>Memory: {footprint.memory_used_gb} GB</p>
          <p>Carbon: {footprint.carbon_kg_per_hour} kg CO₂/h</p>
        </>
      )}
    </div>
  )
}
```

## Documentation Files

- `SERVICES_README.md` - Full documentation
- `API_SERVICE_GUIDE.md` - Detailed integration guide
- `FRONTEND_API_IMPLEMENTATION.md` - Implementation summary

---

**Ready to use in components!** ✅
