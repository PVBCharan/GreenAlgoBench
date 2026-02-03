// About.jsx
export default function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-8 text-center">Methodology & About</h1>
      
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-green-700 mb-4">How We Measure Energy</h2>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 prose prose-slate max-w-none">
            <p className="mb-4">
              GreenAlgoBench uses a combination of hardware counters (RAPL on Intel/AMD) and software-based estimation models to calculate energy consumption.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              <li><strong>CPU Power:</strong> Measured directly where possible, or estimated based on load.</li>
              <li><strong>DRAM Power:</strong> Estimated based on memory read/write operations.</li>
              <li><strong>Carbon Intensity:</strong> Converted from Energy (kWh) to CO₂ (g) using regional grid intensity data (defaulting to global average of 475 gCO₂/kWh).</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Optimization Logic</h2>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 prose prose-slate max-w-none">
            <p>
              Our "Quantum-Inspired" optimization uses a heuristic search algorithm inspired by quantum annealing. It explores the configuration space of algorithm parameters to find a global minimum for the cost function:
            </p>
            <div className="bg-slate-100 p-4 rounded-lg font-mono text-sm my-4 text-center">
              Cost = α * NormalizedTime + β * NormalizedEnergy
            </div>
            <p>
              By adjusting α and β, users can prioritize speed or energy efficiency according to their needs.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-700 mb-4">Limitations</h2>
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-slate-600">
            <p>
              This platform is a prototype. Energy measurements are estimates and may vary based on background system processes. Carbon intensity is based on static averages and may not reflect real-time grid status.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}