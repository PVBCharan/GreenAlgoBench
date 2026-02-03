// RunBenchmark.jsx
// Page for configuring and executing algorithm benchmarks
import { useState, useEffect } from 'react'
import Tabs from '../components/common/Tabs'
import * as benchmarkService from '../services/benchmarkService'

export default function RunBenchmark() {
  const [activeTab, setActiveTab] = useState('new')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [availableAlgos, setAvailableAlgos] = useState([
    { id: 'bubble_sort', name: 'Bubble Sort' },
    { id: 'quick_sort', name: 'Quick Sort' },
    { id: 'merge_sort', name: 'Merge Sort' },
    { id: 'heap_sort', name: 'Heap Sort' }
  ])
  
  // Form State
  const [selectedAlgos, setSelectedAlgos] = useState(['bubble_sort', 'quick_sort'])
  const [datasetSize, setDatasetSize] = useState(1000)

  // Tabs Configuration
  const tabs = [
    { id: 'new', label: 'New Benchmark', icon: '⚡' },
    { id: 'results', label: 'Results & History', icon: '📊' }
  ]

  const handleAlgoToggle = (algoId) => {
    setSelectedAlgos(prev => 
      prev.includes(algoId) 
        ? prev.filter(id => id !== algoId)
        : [...prev, algoId]
    )
  }

  const handleRunBenchmark = async () => {
    setLoading(true)
    try {
      // Simulation of API call since backend might not be running
      // const data = await benchmarkService.runBenchmark(selectedAlgos, datasetSize)
      
      // Mock delay for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const mockResults = selectedAlgos.map(algo => ({
        algorithm: availableAlgos.find(a => a.id === algo).name,
        time_sec: (Math.random() * 0.1).toFixed(4),
        energy_joules: (Math.random() * 0.05).toFixed(6),
        co2_g: (Math.random() * 0.01).toFixed(6)
      }))

      setResults(mockResults)
      setActiveTab('results')
    } catch (error) {
      console.error("Benchmark failed", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Algorithm Benchmark</h1>
        <p className="text-slate-600">Compare energy efficiency and performance of different algorithms.</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
        <Tabs 
          tabs={tabs} 
          activeTab={activeTab} 
          onChange={setActiveTab} 
          className="bg-slate-50 px-6 pt-2"
        />

        <div className="p-8">
          {activeTab === 'new' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Algorithm Selection */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <span className="bg-green-100 text-green-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                  Select Algorithms
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {availableAlgos.map(algo => (
                    <div 
                      key={algo.id}
                      onClick={() => handleAlgoToggle(algo.id)}
                      className={`
                        cursor-pointer rounded-lg p-4 border-2 transition-all duration-200 flex items-center justify-between
                        ${selectedAlgos.includes(algo.id)
                          ? 'border-green-500 bg-green-50 text-green-800'
                          : 'border-slate-200 hover:border-slate-300 text-slate-600'
                        }
                      `}
                    >
                      <span className="font-medium">{algo.name}</span>
                      {selectedAlgos.includes(algo.id) && (
                        <span className="text-green-600 text-lg">✓</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Dataset Configuration */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <span className="bg-green-100 text-green-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                  Configuration
                </h3>
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Dataset Size (Elements)
                  </label>
                  <input 
                    type="range" 
                    min="100" 
                    max="10000" 
                    step="100"
                    value={datasetSize}
                    onChange={(e) => setDatasetSize(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-2">
                    <span>100</span>
                    <span className="font-bold text-green-700 text-base">{datasetSize.toLocaleString()} items</span>
                    <span>10,000</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <button
                  onClick={handleRunBenchmark}
                  disabled={loading || selectedAlgos.length === 0}
                  className={`
                    w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all duration-200 flex justify-center items-center gap-3
                    ${loading || selectedAlgos.length === 0
                      ? 'bg-slate-400 cursor-not-allowed opacity-70'
                      : 'bg-green-600 hover:bg-green-500 hover:shadow-green-200 hover:scale-[1.01]'
                    }
                  `}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      Running Benchmark...
                    </>
                  ) : (
                    <>
                      <span>🚀</span> Run Analysis
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'results' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {!results ? (
                <div className="text-center py-12 text-slate-500">
                  <div className="text-6xl mb-4">📊</div>
                  <p className="text-lg">No results yet. Run a benchmark to see data.</p>
                  <button 
                    onClick={() => setActiveTab('new')}
                    className="mt-4 text-green-600 font-medium hover:underline"
                  >
                    Start a new benchmark
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-slate-800">Benchmark Comparison</h3>
                    <div className="flex gap-2">
                       <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Dataset: {datasetSize} items</span>
                    </div>
                  </div>
                  
                  {/* Highlights Card */}
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="text-sm text-green-800 font-bold uppercase tracking-wide mb-1">Most Energy Efficient</div>
                      <div className="text-xl font-bold text-green-700">
                        {results.sort((a, b) => parseFloat(a.energy_joules) - parseFloat(b.energy_joules))[0].algorithm}
                      </div>
                      <div className="text-xs text-green-600 mt-1">Lowest joules consumption</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="text-sm text-blue-800 font-bold uppercase tracking-wide mb-1">Fastest Execution</div>
                      <div className="text-xl font-bold text-blue-700">
                         {results.sort((a, b) => parseFloat(a.time_sec) - parseFloat(b.time_sec))[0].algorithm}
                      </div>
                      <div className="text-xs text-blue-600 mt-1">Minimum runtime</div>
                    </div>
                  </div>

                  {/* Visual Comparison Charts */}
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
                    <h4 className="font-semibold text-slate-700 mb-4">Carbon Footprint vs Runtime</h4>
                    <div className="space-y-6">
                      {results.map((res, idx) => {
                         const maxTime = Math.max(...results.map(r => parseFloat(r.time_sec)));
                         const maxCarbon = Math.max(...results.map(r => parseFloat(r.co2_g)));
                         
                         return (
                          <div key={idx} className="flex flex-col gap-2">
                            <div className="flex justify-between text-sm font-medium text-slate-700">
                              <span>{res.algorithm}</span>
                            </div>
                            <div className="grid grid-cols-12 gap-4 items-center">
                              {/* Time Bar */}
                              <div className="col-span-5 flex items-center gap-2">
                                <div className="h-2 bg-blue-500 rounded-full" style={{width: `${(parseFloat(res.time_sec) / maxTime) * 100}%`}}></div>
                                <span className="text-xs text-slate-500 whitespace-nowrap">{res.time_sec}s</span>
                              </div>
                              
                              {/* Carbon Bar */}
                              <div className="col-span-5 flex items-center gap-2">
                                <div className="h-2 bg-green-500 rounded-full" style={{width: `${(parseFloat(res.co2_g) / maxCarbon) * 100}%`}}></div>
                                <span className="text-xs text-slate-500 whitespace-nowrap">{res.co2_g}g CO₂</span>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                      <div className="grid grid-cols-12 gap-4 text-xs text-slate-400 mt-2">
                        <div className="col-span-5 text-right pr-8">Runtime (Blue)</div>
                        <div className="col-span-5 text-right pr-8">Carbon Emission (Green)</div>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Table */}
                  <div className="overflow-x-auto rounded-lg border border-slate-200">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-slate-50">
                        <tr className="border-b border-slate-200 text-slate-500 text-sm uppercase tracking-wider">
                          <th className="py-3 px-4 font-semibold">Algorithm</th>
                          <th className="py-3 px-4 font-semibold text-right">Time (s)</th>
                          <th className="py-3 px-4 font-semibold text-right">Energy (J)</th>
                          <th className="py-3 px-4 font-semibold text-right">CO₂ (g)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {results.map((res, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 transition-colors">
                            <td className="py-4 px-4 font-medium text-slate-800">{res.algorithm}</td>
                            <td className="py-4 px-4 text-right font-mono text-slate-600">{res.time_sec}</td>
                            <td className="py-4 px-4 text-right font-mono text-amber-600 font-medium">{res.energy_joules}</td>
                            <td className="py-4 px-4 text-right font-mono text-green-600 font-bold">{res.co2_g}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <button 
                    onClick={() => setActiveTab('new')}
                    className="w-full mt-4 py-3 border-2 border-slate-200 text-slate-600 font-semibold rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-colors"
                  >
                    Run Another Test
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
