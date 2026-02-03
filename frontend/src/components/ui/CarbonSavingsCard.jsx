// CarbonSavingsCard.jsx
// Displays carbon savings and environmental impact insights
import { motion } from 'framer-motion'
import { Leaf, TrendingDown, TreePine, Lightbulb, Award } from 'lucide-react'

export default function CarbonSavingsCard({ results, bestByEnergy }) {
    if (!results || results.length < 2) return null

    // Calculate carbon savings (best vs worst)
    const worstByEnergy = results.reduce((worst, curr) =>
        parseFloat(curr.energy_joules) > parseFloat(worst.energy_joules) ? curr : worst
        , results[0])

    const bestEnergy = parseFloat(bestByEnergy.energy_joules)
    const worstEnergy = parseFloat(worstByEnergy.energy_joules)
    const bestCO2 = parseFloat(bestByEnergy.co2_g)
    const worstCO2 = parseFloat(worstByEnergy.co2_g)

    // Skip if same algorithm
    if (bestByEnergy.algorithm === worstByEnergy.algorithm) return null

    const energySaved = worstEnergy - bestEnergy
    const co2Saved = worstCO2 - bestCO2
    const percentageSaved = ((energySaved / worstEnergy) * 100).toFixed(1)

    // Fun equivalents for CO2 saved
    const treeDays = (co2Saved / 0.02).toFixed(2) // A tree absorbs ~0.02g CO2 per second
    const lightbulbMinutes = (energySaved / 0.01).toFixed(1) // ~10W bulb

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl overflow-hidden"
        >
            {/* Main Savings Card */}
            <div className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 p-8 text-white">
                <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Award className="w-7 h-7" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-1">Carbon Saved</h3>
                        <p className="text-green-100 text-sm">
                            By choosing <span className="font-semibold">{bestByEnergy.algorithm}</span> over{' '}
                            <span className="font-semibold">{worstByEnergy.algorithm}</span>
                        </p>
                    </div>
                </div>

                {/* Savings Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div>
                        <div className="text-4xl font-bold mb-1">{percentageSaved}%</div>
                        <div className="text-green-100 text-sm flex items-center gap-1">
                            <TrendingDown className="w-4 h-4" />
                            Energy Reduction
                        </div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold mb-1">{co2Saved.toFixed(6)}g</div>
                        <div className="text-green-100 text-sm flex items-center gap-1">
                            <Leaf className="w-4 h-4" />
                            CO₂ Saved
                        </div>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <div className="text-4xl font-bold mb-1">{energySaved.toFixed(6)}J</div>
                        <div className="text-green-100 text-sm">Energy Saved</div>
                    </div>
                </div>
            </div>

            {/* Environmental Impact Insights */}
            <div className="bg-white border border-slate-200 border-t-0 rounded-b-2xl p-6">
                <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-amber-500" />
                    What This Means
                </h4>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                        <TreePine className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <div className="font-medium text-slate-900">Tree Absorption</div>
                            <div className="text-sm text-slate-600">
                                Equivalent to a tree absorbing CO₂ for <span className="font-semibold text-green-600">{treeDays} seconds</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl">
                        <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <div className="font-medium text-slate-900">Energy Perspective</div>
                            <div className="text-sm text-slate-600">
                                Could power a 10W LED for <span className="font-semibold text-amber-600">{lightbulbMinutes} seconds</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recommendation */}
                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Award className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                            <div className="font-semibold text-green-800 mb-1">Recommendation</div>
                            <p className="text-sm text-green-700">
                                Use <span className="font-bold">{bestByEnergy.algorithm}</span> for this workload.
                                It's the most environmentally friendly option, saving{' '}
                                <span className="font-bold">{percentageSaved}%</span> energy compared to
                                the least efficient algorithm.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
