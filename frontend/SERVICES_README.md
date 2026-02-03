# Frontend API Service Layer

Centralized API service layer using Axios for backend communication in the GreenAlgoBench React frontend.

## Quick Summary

✅ **Axios Instance** configured at `src/services/api.js`
✅ **Service Modules** for System, Benchmark, and Optimization APIs
✅ **Custom Hooks** for simplified component integration
✅ **No hardcoded URLs** - all backend calls go through services
✅ **Error handling** and request logging built-in

## File Structure

```
src/
├── services/
│   ├── api.js                  # Core Axios configuration
│   ├── systemService.js        # System footprint API
│   ├── benchmarkService.js     # Benchmark API
│   ├── optimizeService.js      # Optimization API
│   └── index.js               # Service exports
├── hooks/
│   └── useApi.js              # Custom API hooks
└── pages/
    ├── Dashboard.jsx          # Will use useSystemFootprint
    ├── RunBenchmark.jsx       # Will use useBenchmark
    └── Optimization.jsx       # Will use useOptimization
```

## Setup

### 1. Dependencies Installed ✅
```bash
npm install axios
```

### 2. Services Created ✅
All service files are in `src/services/`

### 3. Custom Hooks Created ✅
Hooks available in `src/hooks/useApi.js`

## Usage

### Option 1: Using Custom Hooks (Recommended)

```javascript
import { useSystemFootprint } from '@/hooks/useApi'

function Dashboard() {
  const { data: footprint, loading, error } = useSystemFootprint()

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <p>CPU: {footprint?.cpu_percent}%</p>
      <p>Memory: {footprint?.memory_used_gb} GB</p>
    </div>
  )
}
```

### Option 2: Using Service Methods

```javascript
import { systemService } from '@/services'
import { useState, useEffect } from 'react'

function Dashboard() {
  const [footprint, setFootprint] = useState(null)

  useEffect(() => {
    systemService.getSystemFootprint()
      .then(data => setFootprint(data))
      .catch(err => console.error(err))
  }, [])

  return <div>CPU: {footprint?.cpu_percent}%</div>
}
```

### Option 3: Using Raw API Instance

```javascript
import api from '@/services/api'
import { useState, useEffect } from 'react'

function Dashboard() {
  const [footprint, setFootprint] = useState(null)

  useEffect(() => {
    api.get('/system-footprint')
      .then(data => setFootprint(data))
      .catch(err => console.error(err))
  }, [])

  return <div>CPU: {footprint?.cpu_percent}%</div>
}
```

## Available Hooks

### useSystemFootprint()
Fetches current system carbon footprint on component mount.

```javascript
const { data, loading, error } = useSystemFootprint()
```

### useBenchmark()
Run algorithm benchmarks with manual trigger.

```javascript
const { results, loading, error, run } = useBenchmark()

// Call when needed
await run(['merge_sort', 'quick_sort'], 1000)
```

### useOptimization()
Fetches optimization recommendations on component mount.

```javascript
const { recommendation, loading, error, getRecommendation } = useOptimization()

// Refetch with different strategy
await getRecommendation('carbon_first')
```

### useBenchmarkResults()
Fetches latest benchmark results on component mount.

```javascript
const { results, loading, error } = useBenchmarkResults()
```

### useAlgorithms()
Fetches list of available algorithms on component mount.

```javascript
const { algorithms, loading, error } = useAlgorithms()
```

## API Configuration

**Base URL**: `http://localhost:8000`
**Timeout**: 10 seconds
**Default Headers**: `Content-Type: application/json`

### Changing Backend URL

Edit `src/services/api.js`:
```javascript
const api = axios.create({
  baseURL: 'https://your-api.com',  // Change this
  headers: {
    'Content-Type': 'application/json',
  },
})
```

Or use environment variables:
Create `.env.local` in frontend root:
```
VITE_API_BASE=http://localhost:8000
```

Then update `api.js`:
```javascript
const baseURL = import.meta.env.VITE_API_BASE || 'http://localhost:8000'
```

## Available Services

### System Service
```javascript
import { systemService } from '@/services'

systemService.getSystemFootprint()
systemService.estimateFootprint(35, 6.2)
```

### Benchmark Service
```javascript
import { benchmarkService } from '@/services'

benchmarkService.getBenchmarkStatus()
benchmarkService.runBenchmark(['merge_sort'], 1000)
benchmarkService.getBenchmarkResults()
benchmarkService.compareBenchmarks('merge_sort', 'quick_sort')
```

### Optimization Service
```javascript
import { optimizeService } from '@/services'

optimizeService.getOptimizeStatus()
optimizeService.getOptimization('balanced')
optimizeService.getScenarioRecommendation(true, false, false)
optimizeService.getAlgorithms()
```

## Error Handling

All services reject promises on error:

```javascript
try {
  const data = await systemService.getSystemFootprint()
  console.log(data)
} catch (error) {
  console.error('Error:', error.message)
  console.error('Status:', error.response?.status)
}
```

## Request/Response Logging

The API service automatically logs all requests and responses:

**Console output examples:**
```
[API] GET /system-footprint
[API] POST /benchmark
[API] Response error: 404 Not Found
```

## Testing

### Using Swagger UI
Visit `http://localhost:8000/docs` to test endpoints interactively.

### Using curl
```bash
curl http://localhost:8000/api/system-footprint
```

### Using the services in browser console
```javascript
// Open browser DevTools → Console
import('src/services/index.js').then(m => {
  m.systemService.getSystemFootprint()
    .then(data => console.log(data))
})
```

## Integration Checklist

- [ ] Review `API_SERVICE_GUIDE.md` for detailed examples
- [ ] Import appropriate hook in your page component
- [ ] Add loading state UI
- [ ] Add error state UI
- [ ] Display data from API response
- [ ] Test with backend running on port 8000
- [ ] Verify no hardcoded URLs in components

## Production Deployment

Before deploying to production:

1. Update backend URL in `src/services/api.js` or `.env`
2. Review error handling for production
3. Consider adding request/response interceptors for auth
4. Test all endpoints with production backend
5. Add monitoring for API failures

Example for production:
```javascript
// src/services/api.js
const baseURL = process.env.NODE_ENV === 'production'
  ? 'https://api.greenalgobench.com'
  : 'http://localhost:8000'
```

## Documentation Files

- **API_SERVICE_GUIDE.md** - Detailed usage guide with examples
- **BACKEND_INTEGRATION.md** - Integration guide from backend
- **QUICKSTART.md** - Quick reference

## Support

For issues:
1. Check browser console for error messages
2. Verify backend is running on port 8000
3. Test endpoint with Swagger UI at `/docs`
4. Check network tab in DevTools for API calls
5. Review error handling in your component

---

**Status**: ✅ API service layer fully configured and ready to use in components
