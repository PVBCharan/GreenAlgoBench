// Landing.jsx
// Landing page for GreenAlgoBench - Carbon-Aware Algorithm Optimization Platform
// Contains: Hero, System Footprint Card, Educational Content, Comparison, and CTA sections

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from '@/services/api'

export default function Landing() {
  // State for system footprint data
  const [footprint, setFootprint] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch system footprint data on component mount
  useEffect(() => {
    const fetchSystemFootprint = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await api.get('/system-footprint')
        setFootprint(data)
      } catch (err) {
        console.error('Failed to fetch system footprint:', err)
        setError('Unable to load system footprint data. Please refresh the page.')
      } finally {
        setLoading(false)
      }
    }

    fetchSystemFootprint()
  }, [])

  return (
    <div className="w-full bg-white">
      {/* ============================================
          SECTION 1: HERO SECTION
          Full-width hero with gradient background,
          headline, subheading, and two CTA buttons
          ============================================ */}
      <section className="w-full bg-slate-900 py-24 md:py-32 text-center relative overflow-hidden rounded-3xl my-6 mx-auto max-w-[95%] shadow-2xl ring-1 ring-slate-800">
        {/* Background Gradient Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-slate-900 to-blue-600/10 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Main headline - draws attention to the problem */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight tracking-tight drop-shadow-sm">
            Your Software Has a <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">Carbon Footprint</span>
          </h1>

          {/* Subheading - explains the solution */}
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Every application you run consumes energy. Green algorithms help reduce it.
          </p>

          {/* CTA Buttons - primary actions for users */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-4">
            <Link
              to="/run-benchmark"
              className="px-8 py-4 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-500 hover:shadow-green-500/25 hover:scale-[1.02] transition-all duration-200 text-lg flex items-center gap-2"
            >
              <span>⚡</span> Estimate Footprint
            </Link>
            <Link
              to="/optimization"
              className="px-8 py-4 bg-slate-800 text-white font-semibold rounded-lg shadow-lg border border-slate-700 hover:bg-slate-700 hover:border-slate-600 hover:scale-[1.02] transition-all duration-200 text-lg"
            >
              Optimize Algorithms
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 2: SYSTEM CARBON FOOTPRINT CARD
          Displays real system metrics from backend
          or loading/error states
          ============================================ */}
      <section className="w-full py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-900 rounded-xl shadow-lg p-8 md:p-12 border border-slate-800">
            {/* Card title */}
            <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-12 text-center">
              Estimated System Carbon Footprint
            </h2>

            {/* Show loading state */}
            {loading && (
              <div className="text-center py-16">
                <div className="inline-block">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200 border-t-green-600"></div>
                </div>
                <p className="mt-6 text-gray-600 text-lg">Loading system footprint data...</p>
              </div>
            )}

            {/* Show error state */}
            {error && (
              <div className="bg-red-50 border-2 border-red-300 rounded-xl p-8 mb-8 text-center">
                <p className="text-red-800 text-lg">{error}</p>
              </div>
            )}

            {/* Metrics grid - displays real values from API */}
            {!loading && footprint && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                  {/* CPU Usage */}
                  <div className="bg-slate-800 rounded-lg p-6 text-center flex flex-col items-center hover:bg-slate-700 transition-colors duration-200">
                    <div className="text-3xl md:text-4xl font-bold text-blue-300 mb-2">
                      {footprint.cpu_percent?.toFixed(1) || '—'}%
                    </div>
                    <div className="text-sm text-slate-400 font-semibold uppercase tracking-wide">CPU Usage</div>
                  </div>

                  {/* Memory Usage */}
                  <div className="bg-slate-800 rounded-lg p-6 text-center flex flex-col items-center hover:bg-slate-700 transition-colors duration-200">
                    <div className="text-3xl md:text-4xl font-bold text-purple-300 mb-2">
                      {footprint.memory_used_gb?.toFixed(1) || '—'} GB
                    </div>
                    <div className="text-sm text-slate-400 font-semibold uppercase tracking-wide">Memory Usage</div>
                  </div>

                  {/* Estimated Energy */}
                  <div className="bg-slate-800 rounded-lg p-6 text-center flex flex-col items-center hover:bg-slate-700 transition-colors duration-200">
                    <div className="text-3xl md:text-4xl font-bold text-amber-300 mb-2">
                      {footprint.energy_kwh?.toFixed(4) || '—'} kWh
                    </div>
                    <div className="text-sm text-slate-400 font-semibold uppercase tracking-wide">Energy Today</div>
                  </div>

                  {/* Estimated Carbon */}
                  <div className="bg-slate-800 rounded-lg p-6 text-center flex flex-col items-center hover:bg-slate-700 transition-colors duration-200">
                    <div className="text-3xl md:text-4xl font-bold text-green-300 mb-2">
                      {footprint.carbon_kg_per_hour?.toFixed(4) || '—'} kg
                    </div>
                    <div className="text-sm text-slate-400 font-semibold uppercase tracking-wide">CO₂ Emissions</div>
                  </div>
                </div>

                {/* Disclaimer note */}
                <div className="pt-6 text-center">
                  <p className="text-slate-500 text-xs">
                    Last updated: {footprint.timestamp ? new Date(footprint.timestamp).toLocaleTimeString() : 'just now'}
                  </p>
                </div>
              </>
            )}

            {/* Fallback if data is not available */}
            {!loading && !footprint && !error && (
              <div className="text-center text-slate-500 py-16">
                <p className="text-lg">No system data available</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 3: WHAT IS A CARBON FOOTPRINT
          Educational content explaining the concept
          in simple, non-technical language
          ============================================ */}
      <section className="w-full py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
            What Is a Carbon Footprint?
          </h2>

          {/* Explanatory paragraphs - kept simple for general audience */}
          <div className="space-y-8 text-slate-700 text-lg leading-relaxed">
            <div className="flex gap-6 items-start p-4 hover:bg-slate-50 rounded-lg transition-colors duration-200">
              <div className="text-4xl flex-shrink-0">⚡</div>
              <p>
                <span className="font-bold text-slate-900">Every digital action uses energy.</span> When you run
                software, stream a video, or browse the web, your device consumes electricity. This electricity
                often comes from power plants that burn fossil fuels, releasing carbon dioxide (CO₂) into the atmosphere.
              </p>
            </div>

            <div className="flex gap-6 items-start p-4 hover:bg-slate-50 rounded-lg transition-colors duration-200">
              <div className="text-4xl flex-shrink-0">⚙️</div>
              <p>
                <span className="font-bold text-slate-900">Inefficient software wastes energy.</span> Poorly
                optimized algorithms make your CPU and memory work harder than necessary. This means more electricity
                is consumed, more heat is generated, and more carbon emissions are produced — all without giving
                you any extra benefit.
              </p>
            </div>

            <div className="flex gap-6 items-start p-4 hover:bg-slate-50 rounded-lg transition-colors duration-200">
              <div className="text-4xl flex-shrink-0">🌍</div>
              <p>
                <span className="font-bold text-slate-900">Small changes add up.</span> While a single program's
                impact might seem tiny, millions of devices running inefficient code every day create a massive
                environmental footprint. By choosing greener algorithms, developers can significantly reduce the
                tech industry's carbon emissions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 4: WHY GREEN ALGORITHMS MATTER
          Two-column comparison of traditional vs
          green algorithms (stacked on mobile)
          ============================================ */}
      <section className="w-full py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Why Green Algorithms Matter
          </h2>

          {/* Comparison grid - two columns on desktop, stacked on mobile */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Traditional Algorithms Column */}
            <div className="bg-slate-900 rounded-xl p-8 shadow-lg border border-slate-800 hover:shadow-xl hover:scale-[1.01] transition-all duration-300 flex flex-col gap-4 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-red-900/30 text-red-400 rounded-full flex items-center justify-center flex-shrink-0 border border-red-900/50">
                  <span className="text-2xl">🔥</span>
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-red-400 transition-colors">Traditional Code</h3>
              </div>

              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <span className="text-red-500 text-xl flex-shrink-0 mt-1">✕</span>
                  <span className="text-slate-300 text-lg">Optimized for <strong>speed only</strong></span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-red-500 text-xl flex-shrink-0 mt-1">✕</span>
                  <span className="text-slate-300 text-lg">No awareness of <strong>energy consumption</strong></span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-red-500 text-xl flex-shrink-0 mt-1">✕</span>
                  <span className="text-slate-300 text-lg">Ignores <strong>carbon impact</strong> of decisions</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-red-500 text-xl flex-shrink-0 mt-1">✕</span>
                  <span className="text-slate-300 text-lg">May use <strong>excessive resources</strong></span>
                </li>
              </ul>
            </div>

            {/* Green Algorithms Column */}
            <div className="bg-slate-900 rounded-xl p-8 shadow-lg border border-slate-800 hover:shadow-green-900/20 hover:scale-[1.01] transition-all duration-300 flex flex-col gap-4 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-green-900/30 text-green-400 rounded-full flex items-center justify-center flex-shrink-0 border border-green-900/50">
                  <span className="text-2xl">🌱</span>
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors">Green Algorithms</h3>
              </div>

              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <span className="text-green-500 text-xl flex-shrink-0 mt-1">✓</span>
                  <span className="text-slate-300 text-lg">Balanced for <strong>speed + efficiency</strong></span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-green-500 text-xl flex-shrink-0 mt-1">✓</span>
                  <span className="text-slate-300 text-lg">Actively <strong>monitors power usage</strong></span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-green-500 text-xl flex-shrink-0 mt-1">✓</span>
                  <span className="text-slate-300 text-lg">Makes <strong>carbon-aware decisions</strong></span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-green-500 text-xl flex-shrink-0 mt-1">✓</span>
                  <span className="text-slate-300 text-lg">Optimizes for <strong>minimal resource usage</strong></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 5: CALL TO ACTION
          Highlighted section encouraging users to
          take action with two primary buttons
          ============================================ */}
      <section className="w-full py-24 bg-gradient-to-r from-emerald-600 to-green-600">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* CTA Headline */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to Reduce the Carbon Footprint of Your Code?
          </h2>

          <p className="text-xl md:text-2xl text-white/95 mb-14 max-w-3xl mx-auto font-light">
            Start measuring and optimizing your software's environmental impact today.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link
              to="/run-benchmark"
              className="px-10 py-4 bg-white text-green-700 font-semibold rounded-xl shadow-xl hover:bg-green-50 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 text-lg w-full sm:w-auto"
            >
              Run Benchmark
            </Link>
            <Link
              to="/dashboard"
              className="px-10 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-lg w-full sm:w-auto"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
