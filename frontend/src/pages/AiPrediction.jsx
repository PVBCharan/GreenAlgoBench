// AiPrediction.jsx
import { useState } from 'react'

export default function AiPrediction() {
  const [inputs, setInputs] = useState({
    datasetSize: 1000,
    runtime: 0.5,
    memory: 128
  })
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)

  const handlePredict = () => {
    setLoading(true)
    setTimeout(() => {
      // Mock prediction logic
      const carbon = (inputs.runtime * 0.5 + inputs.memory * 0.01) * (inputs.datasetSize / 1000)
      setPrediction({
        carbon: carbon.toFixed(4),
        confidence: '94%',
        suggestion: 'Switching to Quick Sort could reduce emissions by ~12% for this dataset size.',
        details: [
          { label: 'Est. Energy', value: `${(carbon * 2.5).toFixed(2)} J` },
          { label: 'Complexity', value: 'O(n log n)' },
          { label: 'Memory Impact', value: 'Medium' }
        ]
      })
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">AI Carbon Prediction</h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
          Predict the environmental impact of your algorithms before running them using our ML model.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Input Panel */}
        <div className="lg:col-span-5 bg-white p-8 rounded-2xl shadow-xl border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span>🎛️</span> Parameters
          </h2>
          
          <div className="space-y-6">
            <div className="group">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Dataset Size (Elements)</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={inputs.datasetSize}
                  onChange={e => setInputs({...inputs, datasetSize: e.target.value})}
                  className="w-full p-3 pl-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none font-mono text-slate-700"
                />
                <div className="absolute right-3 top-3 text-xs text-slate-400 font-semibold">ITEMS</div>
              </div>
            </div>

            <div className="group">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Estimated Runtime</label>
              <div className="relative">
                <input 
                  type="number" 
                  step="0.1"
                  value={inputs.runtime}
                  onChange={e => setInputs({...inputs, runtime: e.target.value})}
                  className="w-full p-3 pl-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none font-mono text-slate-700"
                />
                <div className="absolute right-3 top-3 text-xs text-slate-400 font-semibold">SEC</div>
              </div>
            </div>

            <div className="group">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Memory Constraints</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={inputs.memory}
                  onChange={e => setInputs({...inputs, memory: e.target.value})}
                  className="w-full p-3 pl-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none font-mono text-slate-700"
                />
                <div className="absolute right-3 top-3 text-xs text-slate-400 font-semibold">MB</div>
              </div>
            </div>

            <button 
              onClick={handlePredict}
              disabled={loading}
              className={`
                w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all duration-300 mt-4
                ${loading 
                  ? 'bg-slate-800 cursor-wait opacity-90' 
                  : 'bg-slate-900 hover:bg-blue-600 hover:shadow-blue-500/30 hover:-translate-y-0.5'
                }
              `}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                  Running Model...
                </span>
              ) : (
                'Generate Prediction'
              )}
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-7 space-y-6">
          {prediction ? (
            <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-right-4 duration-500 border border-slate-700 relative overflow-hidden">
              {/* Background Glow */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-500/20 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-lg font-medium text-slate-400 mb-1">Predicted Carbon Emissions</h2>
                    <div className="text-5xl font-bold text-white tracking-tight">
                      {prediction.carbon} <span className="text-2xl text-green-400">gCO₂</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-400 mb-1">Model Confidence</div>
                    <div className="text-xl font-bold text-blue-400">{prediction.confidence}</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  {prediction.details.map((detail, idx) => (
                    <div key={idx} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 backdrop-blur-sm">
                      <div className="text-xs text-slate-400 uppercase tracking-wide mb-1">{detail.label}</div>
                      <div className="font-semibold text-slate-200">{detail.value}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-6 rounded-xl border border-blue-500/30">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">💡</span>
                    <div>
                      <h3 className="font-bold text-blue-200 mb-1">AI Recommendation</h3>
                      <p className="text-slate-300 leading-relaxed text-sm">{prediction.suggestion}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 p-8 text-center group">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-4xl grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all">🤖</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-600 mb-2">Waiting for Input</h3>
              <p className="max-w-xs mx-auto">Enter your algorithm parameters on the left to generate an AI-powered environmental impact forecast.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
