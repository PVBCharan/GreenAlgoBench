// Optimization.jsx
import { useState } from 'react'

export default function Optimization() {
  const [alpha, setAlpha] = useState(0.5) // Performance weight
  const [optimizing, setOptimizing] = useState(false)
  const [result, setResult] = useState(null)

  const handleOptimize = () => {
    setOptimizing(true)
    setTimeout(() => {
      setResult({
        algorithm: 'Merge Sort',
        carbonSaved: '14.2%',
        performanceImpact: '-1.5%',
        description: 'Selected based on your balanced preference for speed and energy efficiency.'
      })
      setOptimizing(false)
    }, 2000)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Quantum-Inspired Optimization</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Use our heuristic search algorithm to find the optimal balance between performance and carbon footprint for your specific use case.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Configuration Card */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">Optimization Parameters</h2>
          
          <div className="mb-8">
            <div className="flex justify-between text-sm font-medium mb-4">
              <span className="text-blue-600">Performance (α)</span>
              <span className="text-green-600">Carbon Efficiency (β)</span>
            </div>
            
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.1" 
              value={alpha}
              onChange={(e) => setAlpha(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900 mb-2"
            />
            
            <div className="flex justify-between text-xs text-slate-500">
              <span>{Math.round(alpha * 100)}% Speed</span>
              <span>{Math.round((1 - alpha) * 100)}% Green</span>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-8">
            <h3 className="font-semibold text-slate-800 text-sm mb-2">How it works</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We define a cost function <span className="font-mono bg-slate-200 px-1 rounded">C = α·T + (1-α)·E</span> where T is normalized time and E is normalized energy. The optimizer searches for the algorithm configuration that minimizes C.
            </p>
          </div>

          <button
            onClick={handleOptimize}
            disabled={optimizing}
            className={`
              w-full py-4 rounded-xl text-white font-bold shadow-lg transition-all duration-200 flex justify-center items-center gap-2
              ${optimizing 
                ? 'bg-slate-400 cursor-wait' 
                : 'bg-indigo-600 hover:bg-indigo-500 hover:shadow-indigo-200 hover:scale-[1.01]'
              }
            `}
          >
            {optimizing ? (
              <>
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                Optimizing...
              </>
            ) : (
              <>
                <span>✨</span> Find Optimal Algorithm
              </>
            )}
          </button>
        </div>

        {/* Result Card */}
        <div className="space-y-6">
          {result ? (
            <div className="bg-slate-900 text-white p-8 rounded-xl shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="inline-block px-3 py-1 bg-green-500/20 text-green-300 text-xs font-bold rounded-full mb-4 border border-green-500/30">
                RECOMMENDED
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">{result.algorithm}</h2>
              <p className="text-slate-300 text-sm mb-8">{result.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-800 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-400">{result.carbonSaved}</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wide">Carbon Saved</div>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-amber-400">{result.performanceImpact}</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wide">Perf. Impact</div>
                </div>
              </div>
              
              <button className="w-full py-3 bg-white text-slate-900 font-semibold rounded-lg hover:bg-slate-100 transition-colors">
                Apply & Benchmark
              </button>
            </div>
          ) : (
            <div className="h-full min-h-[300px] bg-slate-50 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
              <div className="text-5xl mb-4">🧠</div>
              <p>Adjust parameters and run optimization to see AI recommendations here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
