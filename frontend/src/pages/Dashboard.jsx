// Dashboard.jsx
// Dashboard page with system metrics and KPIs
import { useState } from 'react'
import Tabs from '../components/common/Tabs'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📈' },
    { id: 'details', label: 'Detailed Metrics', icon: '📋' }
  ]

  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold text-slate-900 mb-10 text-center">Dashboard</h1>
      
      <div className="max-w-6xl mx-auto">
        <Tabs 
          tabs={tabs} 
          activeTab={activeTab} 
          onChange={setActiveTab} 
          className="mb-8 justify-center"
        />

        {activeTab === 'overview' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {/* KPI Card 1 */}
              <div className="bg-slate-900 rounded-xl p-8 shadow-lg flex flex-col items-center hover:scale-[1.02] transition-transform">
                <div className="text-3xl font-bold text-green-400 mb-2">12%</div>
                <div className="text-sm text-slate-200 font-medium">CPU Usage</div>
              </div>
              {/* KPI Card 2 */}
              <div className="bg-slate-900 rounded-xl p-8 shadow-lg flex flex-col items-center hover:scale-[1.02] transition-transform">
                <div className="text-3xl font-bold text-purple-400 mb-2">4.2 GB</div>
                <div className="text-sm text-slate-200 font-medium">Memory Usage</div>
              </div>
              {/* KPI Card 3 */}
              <div className="bg-slate-900 rounded-xl p-8 shadow-lg flex flex-col items-center hover:scale-[1.02] transition-transform">
                <div className="text-3xl font-bold text-amber-400 mb-2">0.8 kWh</div>
                <div className="text-sm text-slate-200 font-medium">Energy</div>
              </div>
              {/* KPI Card 4 */}
              <div className="bg-slate-900 rounded-xl p-8 shadow-lg flex flex-col items-center hover:scale-[1.02] transition-transform">
                <div className="text-3xl font-bold text-red-400 mb-2">0.4 kg</div>
                <div className="text-sm text-slate-200 font-medium">CO₂ Emissions</div>
              </div>
            </div>
            <div className="max-w-3xl mx-auto text-center text-slate-600 text-lg leading-relaxed bg-white p-8 rounded-xl shadow-sm border border-slate-100">
              <p>Real-time system monitoring is active. Values above are simulated estimates based on current workload.</p>
            </div>
          </div>
        )}

        {activeTab === 'details' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white p-8 rounded-xl shadow-lg border border-slate-200">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Detailed System Analysis</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-mono text-slate-600">
                      P{i}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Process Group {i}</div>
                      <div className="text-xs text-slate-500">Running background tasks</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-green-700 font-medium">{(Math.random() * 10).toFixed(1)} W</div>
                    <div className="text-xs text-slate-400">Power Draw</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
