// CarbonInsights.jsx
export default function CarbonInsights() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Carbon Insights</h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Understand the real-world impact of your code through equivalence metrics and historical trends.
        </p>
      </div>
      
      {/* Equivalence Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-2xl border border-green-200 text-center shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-200 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-green-300"></div>
          <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">📱</div>
          <div className="text-4xl font-extrabold text-green-800 mb-1">124</div>
          <div className="text-sm font-semibold text-green-700 uppercase tracking-wide">Smartphone Charges</div>
          <p className="text-xs text-green-600 mt-2">Energy saved equivalent</p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-100 p-8 rounded-2xl border border-amber-200 text-center shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-200 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-amber-300"></div>
          <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🚗</div>
          <div className="text-4xl font-extrabold text-amber-800 mb-1">0.4 <span className="text-xl">km</span></div>
          <div className="text-sm font-semibold text-amber-700 uppercase tracking-wide">Driving Emissions</div>
          <p className="text-xs text-amber-600 mt-2">Carbon avoided</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl border border-blue-200 text-center shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-200 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-blue-300"></div>
          <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🌳</div>
          <div className="text-4xl font-extrabold text-blue-800 mb-1">2</div>
          <div className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Tree Absorption</div>
          <p className="text-xs text-blue-600 mt-2">Annual CO₂ absorption</p>
        </div>
      </div>

      {/* Trend Analysis Chart */}
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 mb-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Carbon Trend Analysis</h2>
            <p className="text-slate-500 text-sm">Historical emissions based on dataset size growth</p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold">Weekly</span>
            <span className="px-3 py-1 bg-white text-slate-400 border border-slate-200 rounded-full text-xs font-semibold hover:border-slate-300 cursor-pointer">Monthly</span>
          </div>
        </div>
        
        <div className="h-80 w-full flex items-end justify-between gap-4 px-4 pb-0 relative">
          {/* Grid lines background */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8 pr-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-full h-px bg-slate-100"></div>
            ))}
          </div>

          {/* Chart Bars */}
          {[20, 35, 25, 45, 30, 60, 40].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative h-full justify-end z-10">
              <div 
                className="w-full bg-gradient-to-t from-blue-500 to-indigo-400 rounded-t-lg hover:from-blue-400 hover:to-indigo-300 transition-all duration-300 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40" 
                style={{height: `${h}%`}}
              ></div>
              <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-slate-900 text-white text-xs py-1 px-3 rounded shadow-lg transform translate-y-2 group-hover:translate-y-0">
                {h}g CO₂
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4 text-sm font-medium text-slate-400 border-t border-slate-100 pt-4">
          <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
        </div>
      </div>
    </div>
  )
}
