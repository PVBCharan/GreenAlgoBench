# Frontend API Service Layer - Implementation Summary

## ✅ Centralized API Service Successfully Created

The React frontend now has a professional, production-ready API service layer using Axios for all backend communication.

---

## What Was Created

### 1. Core API Service
**File**: `src/services/api.js`

Axios instance with:
- ✅ baseURL: `http://localhost:8000`
- ✅ Default headers: `Content-Type: application/json`
- ✅ Timeout: 10 seconds
- ✅ Request interceptor (logging)
- ✅ Response interceptor (error handling)

### 2. Service Modules

#### System Service (`src/services/systemService.js`)
```javascript
getSystemFootprint()           // Get current system metrics
estimateFootprint(cpu, mem)    // Estimate custom footprint
```

#### Benchmark Service (`src/services/benchmarkService.js`)
```javascript
getBenchmarkStatus()                 // Check availability
runBenchmark(algos, datasetSize)    // Run benchmarks
getBenchmarkResults()                // Get latest results
compareBenchmarks(algo1, algo2)      // Compare algorithms
```

#### Optimization Service (`src/services/optimizeService.js`)
```javascript
getOptimizeStatus()                           // Check availability
getOptimization(strategy)                     // Get recommendations
getScenarioRecommendation(cpu, mem, latency) // Scenario-specific
getAlgorithms()                               // List algorithms
```

### 3. Service Index
**File**: `src/services/index.js`

Central export point for all services:
```javascript
import { systemService, benchmarkService, optimizeService } from '@/services'
```

### 4. Custom Hooks
**File**: `src/hooks/useApi.js`

Reusable React hooks:
- `useSystemFootprint()` - Fetch system metrics
- `useBenchmark()` - Run benchmarks
- `useOptimization()` - Get recommendations
- `useBenchmarkResults()` - Get latest results
- `useAlgorithms()` - List algorithms

### 5. Dependencies
**Updated**: `package.json`

Added Axios to dependencies:
```json
"axios": "^1.6.2"
```

Installed via `npm install` ✅

---

## File Structure

```
frontend/
├── src/
│   ├── services/
│   │   ├── api.js                 # Core Axios instance
│   │   ├── systemService.js       # System API calls
│   │   ├── benchmarkService.js    # Benchmark API calls
│   │   ├── optimizeService.js     # Optimization API calls
│   │   └── index.js              # Service exports
│   ├── hooks/
│   │   └── useApi.js             # Custom API hooks
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── RunBenchmark.jsx
│   │   ├── Optimization.jsx
│   │   └── About.jsx
│   └── components/
├── package.json                    # Updated with axios
├── SERVICES_README.md             # Service documentation
└── API_SERVICE_GUIDE.md          # Integration guide
```

---

## Usage Examples

### Example 1: Using Custom Hook (Recommended)

```javascript
import { useSystemFootprint } from '@/hooks/useApi'

function Dashboard() {
  const { data: footprint, loading, error } = useSystemFootprint()

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h2>System Footprint</h2>
      <p>CPU: {footprint?.cpu_percent}%</p>
      <p>Memory: {footprint?.memory_used_gb} GB</p>
      <p>Carbon: {footprint?.carbon_kg_per_hour} kg CO₂/hour</p>
    </div>
  )
}
```

### Example 2: Using Service Method

```javascript
import { benchmarkService } from '@/services'
import { useState } from 'react'

function RunBenchmark() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleRun = async () => {
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
      <button onClick={handleRun} disabled={loading}>
        {loading ? 'Running...' : 'Run Benchmark'}
      </button>
      {results && <div>{/* Display results */}</div>}
    </div>
  )
}
```

### Example 3: Using Hooks with Optimization

```javascript
import { useOptimization } from '@/hooks/useApi'

function OptimizationPage() {
  const { recommendation, loading, error, getRecommendation } = useOptimization()

  const handleStrategy = async (strategy) => {
    await getRecommendation(strategy)
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h2>Algorithm Recommendation</h2>
      <p>Best: {recommendation?.best_algorithm}</p>
      <p>Score: {recommendation?.optimization_score}</p>
      <p>{recommendation?.explanation}</p>
      
      <button onClick={() => handleStrategy('carbon_first')}>
        Carbon First
      </button>
      <button onClick={() => handleStrategy('speed_first')}>
        Speed First
      </button>
      <button onClick={() => handleStrategy('balanced')}>
        Balanced
      </button>
    </div>
  )
}
```

---

## Key Features

✅ **No Hardcoded URLs** - All API calls through services
✅ **Centralized Configuration** - Single source of truth for API config
✅ **Automatic Logging** - Request/response logging in console
✅ **Error Handling** - Consistent error management
✅ **Type Safety** - JSDoc documentation for all methods
✅ **Custom Hooks** - React-friendly API consumption
✅ **Interceptors** - Built-in request/response handling
✅ **Easy Testing** - Interactive API docs at `/docs`
✅ **Production Ready** - Configurable base URL for different environments

---

## Integration Steps for Pages

### 1. Dashboard Page
```javascript
import { useSystemFootprint } from '@/hooks/useApi'

function Dashboard() {
  const { data: footprint, loading, error } = useSystemFootprint()
  // Display footprint data
}
```

### 2. Run Benchmark Page
```javascript
import { useBenchmark } from '@/hooks/useApi'

function RunBenchmark() {
  const { results, loading, error, run } = useBenchmark()
  // Display benchmark results
}
```

### 3. Optimization Page
```javascript
import { useOptimization } from '@/hooks/useApi'

function Optimization() {
  const { recommendation, loading, error, getRecommendation } = useOptimization()
  // Display recommendations
}
```

---

## API Configuration

### Current Setup
- **Base URL**: `http://localhost:8000`
- **Timeout**: 10 seconds
- **Headers**: `Content-Type: application/json`

### For Production
Edit `src/services/api.js`:
```javascript
const api = axios.create({
  baseURL: 'https://your-production-api.com',  // Change this
  headers: {
    'Content-Type': 'application/json',
  },
})
```

Or use environment variables:
```javascript
// .env.local
VITE_API_BASE=http://localhost:8000

// api.js
const baseURL = import.meta.env.VITE_API_BASE || 'http://localhost:8000'
```

---

## Testing the API

### Option 1: Interactive Swagger UI
Visit `http://localhost:8000/docs` to test endpoints

### Option 2: Using Services in Browser Console
```javascript
import('@/services/index').then(({ systemService }) => {
  systemService.getSystemFootprint()
    .then(data => console.log(data))
})
```

### Option 3: Browser DevTools Network Tab
- Open DevTools (F12)
- Go to Network tab
- Make API calls from components
- Inspect requests and responses

---

## Verification Checklist

✅ Axios installed (`npm install`)
✅ `src/services/api.js` created with configuration
✅ System service created with 2 methods
✅ Benchmark service created with 4 methods
✅ Optimization service created with 4 methods
✅ Service index created for exports
✅ Custom hooks created in `src/hooks/useApi.js`
✅ Custom hooks have 5 reusable functions
✅ No lint errors (`npm run lint`)
✅ Package.json updated with axios

---

## Documentation Files

| File | Purpose |
|------|---------|
| `SERVICES_README.md` | Complete service documentation |
| `API_SERVICE_GUIDE.md` | Detailed usage examples |
| `src/services/api.js` | Core configuration |
| `src/services/*.js` | Individual service modules |
| `src/hooks/useApi.js` | Custom React hooks |

---

## Next Steps

1. **Implement Dashboard Page**
   - Import `useSystemFootprint` hook
   - Display CPU, memory, carbon metrics
   - Add refresh button

2. **Implement Run Benchmark Page**
   - Import `useBenchmark` hook
   - Display results in table format
   - Show fastest and most efficient algorithms

3. **Implement Optimization Page**
   - Import `useOptimization` hook
   - Display recommended algorithm
   - Show alternatives with explanations
   - Add strategy selection buttons

4. **Implement About Page**
   - No API calls needed
   - Static educational content

5. **Testing**
   - Verify all API calls work
   - Check error handling
   - Test with backend on port 8000

---

## Common Tasks

### Add New API Endpoint

1. Create method in appropriate service:
```javascript
// In src/services/systemService.js
export const newEndpoint = async (param) => {
  return api.post('/new-endpoint', { param })
}
```

2. Export from service
3. Use in component via service or create custom hook

### Change Backend URL

Edit `src/services/api.js`:
```javascript
const api = axios.create({
  baseURL: 'https://new-url.com',  // Change here
})
```

### Add Authentication

Add to `src/services/api.js`:
```javascript
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

---

## Benefits of This Approach

✅ **Single Point of Control** - All API calls in one place
✅ **DRY Principle** - No code duplication
✅ **Easy Maintenance** - Update API logic once, works everywhere
✅ **Error Handling** - Consistent error management
✅ **Testing** - Easy to mock services for tests
✅ **Scalability** - Easy to add new services
✅ **Type Safety** - JSDoc comments provide guidance
✅ **Developer Experience** - Clear, readable code

---

## Support

For issues:
1. Check `SERVICES_README.md` for common problems
2. Review `API_SERVICE_GUIDE.md` for examples
3. Verify backend is running: `http://localhost:8000`
4. Check browser console for error messages
5. Use Swagger UI at `/docs` to test endpoints

---

**Status**: ✅ **API Service Layer Fully Implemented and Ready**

The React frontend is now properly configured for backend communication with:
- Centralized Axios instance
- Organized service modules
- Custom React hooks
- Full documentation
- No hardcoded URLs
- Professional error handling

**Ready to integrate into page components** ✅
