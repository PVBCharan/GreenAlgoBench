// Reports.jsx
export default function Reports() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Reports & Exports</h1>
        <p className="text-slate-600 text-lg">
          Generate professional documentation of your algorithm's environmental performance.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Benchmark Summary Card */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center text-center hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-slate-900"></div>
          <div className="w-20 h-20 bg-slate-100 text-slate-700 rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner group-hover:bg-slate-200 transition-colors">📄</div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Benchmark Summary</h2>
          <p className="text-slate-500 mb-8 leading-relaxed max-w-sm">
            Download a detailed PDF report of all your recent algorithm benchmarks, including energy and carbon metrics.
          </p>
          <button className="px-8 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 hover:shadow-lg transition-all flex items-center gap-2">
            <span>⬇️</span> Generate PDF Report
          </button>
        </div>

        {/* Green Certificate Card */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center text-center hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
          <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner group-hover:bg-green-100 transition-colors">🎖️</div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Green Certificate</h2>
          <p className="text-slate-500 mb-8 leading-relaxed max-w-sm">
            Get an official certificate for your optimized code verifying its low carbon footprint and energy efficiency.
          </p>
          <button className="px-8 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-500 hover:shadow-lg hover:shadow-green-500/30 transition-all flex items-center gap-2">
            <span>🏆</span> Download Certificate
          </button>
        </div>
      </div>
      
      {/* Recent Activity List */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
          <h3 className="font-semibold text-slate-800">Recent Exports</h3>
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">History</span>
        </div>
        <div className="divide-y divide-slate-100">
          <div className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors group">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">📊</div>
              <div>
                <div className="text-sm font-medium text-slate-900">benchmark_results_2023-10-24.csv</div>
                <div className="text-xs text-slate-500">24KB • CSV Spreadsheet</div>
              </div>
            </div>
            <button className="text-sm text-slate-400 font-medium hover:text-blue-600 transition-colors">Download</button>
          </div>
          
          <div className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors group">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-red-50 text-red-600 rounded-lg">📕</div>
              <div>
                <div className="text-sm font-medium text-slate-900">optimization_report_v2.pdf</div>
                <div className="text-xs text-slate-500">1.2MB • PDF Document</div>
              </div>
            </div>
            <button className="text-sm text-slate-400 font-medium hover:text-blue-600 transition-colors">Download</button>
          </div>
        </div>
      </div>
    </div>
  )
}
