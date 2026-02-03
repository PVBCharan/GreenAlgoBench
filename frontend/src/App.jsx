// App.jsx
// Sets up routing and layout for GreenAlgoBench
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import RunBenchmark from './pages/RunBenchmark'
import Optimization from './pages/Optimization'
import AiPrediction from './pages/AiPrediction'
import CarbonInsights from './pages/CarbonInsights'
import Reports from './pages/Reports'
import About from './pages/About'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Landing />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="benchmark" element={<RunBenchmark />} />
          <Route path="optimize" element={<Optimization />} />
          <Route path="prediction" element={<AiPrediction />} />
          <Route path="insights" element={<CarbonInsights />} />
          <Route path="reports" element={<Reports />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
