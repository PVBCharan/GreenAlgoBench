// Dashboard.jsx
// Dashboard page - Phase 4: Connected to backend for real system metrics
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3, TrendingDown, Leaf, Zap, Clock, Cpu, HardDrive,
  ArrowUpRight, ArrowDownRight, RefreshCw, Wifi, WifiOff
} from 'lucide-react'
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection'
import Card from '@/components/ui/Card'
import api from '@/services/api'

export default function Dashboard() {
  const [systemData, setSystemData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [backendOnline, setBackendOnline] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(null)

  // Fetch system footprint
  const fetchSystemFootprint = async () => {
    try {
      setLoading(true)
      const data = await api.get('/api/system-footprint')
      setSystemData(data)
      setBackendOnline(true)
      setLastUpdated(new Date())
    } catch (err) {
      console.warn('Backend not available, using mock data')
      setBackendOnline(false)
      // Mock data fallback
      setSystemData({
        cpu_percent: 35 + Math.random() * 20,
        memory_used_gb: 6 + Math.random() * 2,
        memory_percent: 45 + Math.random() * 15,
        power_watts: 85 + Math.random() * 30,
        carbon_kg_per_hour: 0.04 + Math.random() * 0.02,
        energy_kwh: 0.09 + Math.random() * 0.03,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSystemFootprint()
    // Refresh every 30 seconds
    const interval = setInterval(fetchSystemFootprint, 30000)
    return () => clearInterval(interval)
  }, [])

  // Build summary cards from system data
  const summaryCards = systemData ? [
    {
      label: 'CPU Usage',
      value: `${systemData.cpu_percent?.toFixed(1)}%`,
      icon: Cpu,
      color: 'blue',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      label: 'Memory Used',
      value: `${systemData.memory_used_gb?.toFixed(1)} GB`,
      icon: HardDrive,
      color: 'purple',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600'
    },
    {
      label: 'Power Draw',
      value: `${systemData.power_watts?.toFixed(1)} W`,
      icon: Zap,
      color: 'amber',
      bgColor: 'bg-amber-100',
      textColor: 'text-amber-600'
    },
    {
      label: 'CO₂/Hour',
      value: `${(systemData.carbon_kg_per_hour * 1000)?.toFixed(1)}g`,
      icon: Leaf,
      color: 'green',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600'
    },
  ] : []

  // Mock recent analyses
  const recentAnalyses = [
    { algorithm: 'Quick Sort vs Bubble Sort', date: 'Today', savings: '65%' },
    { algorithm: 'Merge Sort Analysis', date: 'Yesterday', savings: '42%' },
    { algorithm: 'Heap Sort Comparison', date: '2 days ago', savings: '38%' },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-hero py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4"
            >
              <div className="w-14 h-14 bg-green-500/20 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-7 h-7 text-green-400" />
              </div>
              <h1 className="text-4xl font-bold text-white">Dashboard</h1>
            </motion.div>

            {/* Backend Status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${backendOnline
                ? 'bg-green-500/20 text-green-400'
                : 'bg-amber-500/20 text-amber-400'
                }`}
            >
              {backendOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
              {backendOnline ? 'Live Data' : 'Demo Mode'}
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-300 text-xl max-w-2xl"
          >
            Real-time system metrics and carbon footprint monitoring
          </motion.p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* System Metrics Cards */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">System Metrics</h2>
          <button
            onClick={fetchSystemFootprint}
            disabled={loading}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors px-4 py-2 rounded-lg hover:bg-slate-100"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            {lastUpdated ? `Updated ${lastUpdated.toLocaleTimeString()}` : 'Refresh'}
          </button>
        </div>

        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {summaryCards.map(({ label, value, icon: Icon, bgColor, textColor }) => (
            <StaggerItem key={label}>
              <Card hover glow className="h-full">
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bgColor}`}>
                    <Icon className={`w-6 h-6 ${textColor}`} />
                  </div>
                </div>
                <p className="text-3xl font-bold text-slate-900 mb-2">{value}</p>
                <p className="text-sm text-slate-500">{label}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Energy Insight Card */}
        {systemData && (
          <AnimatedSection delay={0.2} className="mb-12">
            <Card className="bg-gradient-to-r from-green-500 to-emerald-600 border-0 text-white p-8">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-10 h-10" />
                </div>
                <div>
                  <p className="text-green-100 text-sm font-medium mb-2">Current Energy Consumption</p>
                  <p className="text-4xl font-bold mb-2">{systemData.energy_kwh?.toFixed(4)} kWh</p>
                  <p className="text-green-100 text-base">
                    Estimated {(systemData.carbon_kg_per_hour * 1000).toFixed(1)}g CO₂ emissions per hour
                  </p>
                </div>
              </div>
            </Card>
          </AnimatedSection>
        )}

        {/* Recent Analyses */}
        <AnimatedSection delay={0.3}>
          <Card>
            <h2 className="text-xl font-bold text-slate-900 mb-8">Recent Analyses</h2>
            <div className="space-y-4">
              {recentAnalyses.map((analysis, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="flex items-center justify-between p-5 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Zap className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 mb-1">{analysis.algorithm}</p>
                      <p className="text-sm text-slate-500">{analysis.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600 text-lg">{analysis.savings}</p>
                    <p className="text-xs text-slate-500">Energy Saved</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </AnimatedSection>
      </div>
    </div>
  )
}
