# Quick Start Guide - Backend & Frontend

## Running Both Frontend and Backend

### Terminal 1: Backend (Port 8000)
```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```

Expected output:
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Application startup complete
```

### Terminal 2: Frontend (Port 5173)
```bash
cd frontend
npm install
npm run dev
```

Expected output:
```
  ➜  Local:   http://localhost:5173/
```

---

## Quick API Tests

### Test 1: Get System Footprint
```bash
curl http://localhost:8000/api/system-footprint
```

### Test 2: Run Benchmark
```bash
curl -X POST http://localhost:8000/api/benchmark \
  -H "Content-Type: application/json" \
  -d '{"algorithms": ["merge_sort", "quick_sort"], "dataset_size": 1000}'
```

### Test 3: Get Optimization
```bash
curl -X POST http://localhost:8000/api/optimize \
  -H "Content-Type: application/json" \
  -d '{"strategy": "balanced"}'
```

---

## Access Points

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | `http://localhost:5173` | React app |
| Backend API | `http://localhost:8000` | REST API |
| API Docs | `http://localhost:8000/docs` | Swagger UI |
| ReDoc | `http://localhost:8000/redoc` | Alternative docs |

---

## File Locations

```
GreenAlgoBranch/
├── frontend/                    # React + Tailwind
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Landing.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── RunBenchmark.jsx
│   │   │   ├── Optimization.jsx
│   │   │   └── About.jsx
│   │   ├── components/
│   │   ├── layouts/
│   │   └── main.jsx
│   └── package.json
│
├── backend/                     # FastAPI
│   ├── app.py                   # Main app
│   ├── routes/
│   │   ├── system.py           # System footprint
│   │   ├── benchmark.py        # Benchmarks
│   │   └── optimize.py         # Optimization
│   ├── requirements.txt
│   └── README.md
│
├── carbon_aware_optimizer/      # Python research
├── BACKEND_INTEGRATION.md       # Integration guide
├── BACKEND_SETUP_SUMMARY.md    # This file
└── QUICKSTART.md               # Quick reference
```

---

## API Integration in React

### Basic Fetch Example
```javascript
const API_BASE = 'http://localhost:8000/api'

// Get system footprint
async function getFootprint() {
  const res = await fetch(`${API_BASE}/system-footprint`)
  const data = await res.json()
  return data
}

// Run benchmark
async function runBenchmark(algorithms) {
  const res = await fetch(`${API_BASE}/benchmark`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ algorithms, dataset_size: 1000 })
  })
  return await res.json()
}

// Get optimization
async function getOptimization(strategy) {
  const res = await fetch(`${API_BASE}/optimize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ strategy })
  })
  return await res.json()
}
```

---

## Common Issues & Solutions

### Issue: CORS Error
**Problem**: Frontend can't reach backend
**Solution**: Verify backend is running on port 8000
```bash
# Check if backend is running
netstat -ano | findstr :8000
```

### Issue: Port Already in Use
**Problem**: Port 5173 or 8000 is already in use
**Solution**: Use different port
```bash
# Frontend on different port
npm run dev -- --port 3000

# Backend on different port
uvicorn app:app --port 8001
```

### Issue: Module Not Found
**Problem**: `ModuleNotFoundError: No module named 'fastapi'`
**Solution**: Install dependencies
```bash
cd backend
pip install -r requirements.txt
```

### Issue: Cannot Find Python
**Problem**: `python: command not found`
**Solution**: Check Python installation
```bash
python --version
python3 --version
```

---

## Development Workflow

1. **Start Backend First**
   ```bash
   cd backend
   uvicorn app:app --reload
   ```

2. **Start Frontend in New Terminal**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Develop Pages**
   - Edit components in `src/pages/`
   - Fetch from `http://localhost:8000/api/*`
   - Changes auto-reload

4. **Test APIs**
   - Use `/docs` for interactive testing
   - Or use curl commands above
   - Check browser console for errors

5. **Build for Production**
   ```bash
   # Frontend
   cd frontend
   npm run build

   # Backend
   gunicorn -w 4 -k uvicorn.workers.UvicornWorker app:app
   ```

---

## Page Implementation Checklist

### Dashboard Page
- [ ] Fetch `/api/system-footprint`
- [ ] Display CPU usage
- [ ] Display memory usage
- [ ] Display carbon footprint
- [ ] Add refresh button

### Run Benchmark Page
- [ ] Fetch `/api/benchmark` (POST)
- [ ] Display results table
- [ ] Show fastest algorithm
- [ ] Show most efficient algorithm
- [ ] Compare metrics

### Optimization Page
- [ ] Fetch `/api/optimize` (POST)
- [ ] Display recommended algorithm
- [ ] Show explanation
- [ ] List alternatives
- [ ] Display efficiency score

---

## Environment Variables (Optional)

Create a `.env` file in frontend for production:
```
VITE_API_BASE=http://localhost:8000/api
```

Then in code:
```javascript
const API_BASE = import.meta.env.VITE_API_BASE
```

---

## Monitoring & Logs

### Frontend Logs
- Open browser Developer Tools (F12)
- Check Console tab for errors
- Check Network tab for API calls

### Backend Logs
- Terminal output shows all requests
- Look for `200 OK` responses
- Check for `ERROR` or `500` status codes

---

## Performance Tips

1. Cache API responses to reduce requests
2. Use loading states while fetching
3. Debounce rapid API calls
4. Error boundaries for failed requests
5. Consider pagination for large datasets

---

## Next Steps

1. Review `BACKEND_INTEGRATION.md` for detailed API docs
2. Implement hooks in frontend components
3. Test all endpoints with `/docs` UI
4. Add error handling and loading states
5. Deploy to production

---

## Support Resources

- **Backend Docs**: `/docs` at `http://localhost:8000`
- **FastAPI Docs**: https://fastapi.tiangolo.com
- **React Docs**: https://react.dev
- **Tailwind Docs**: https://tailwindcss.com

---

**Status**: ✅ Ready to develop and deploy
