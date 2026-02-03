// ComparisonTable.jsx
// Reusable comparison table component for algorithm benchmarks
import { motion } from 'framer-motion'
import { Award, TrendingUp, Leaf, Clock, Zap } from 'lucide-react'
import { cn } from '@/lib/cn'

export default function ComparisonTable({ results, bestByEnergy, bestByTime }) {
    if (!results || results.length === 0) return null

    // Find the worst performers for comparison
    const worstByEnergy = results.reduce((worst, curr) =>
        parseFloat(curr.energy_joules) > parseFloat(worst.energy_joules) ? curr : worst
        , results[0])

    const worstByTime = results.reduce((worst, curr) =>
        parseFloat(curr.time_sec) > parseFloat(worst.time_sec) ? curr : worst
        , results[0])

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full overflow-hidden"
        >
            <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Algorithm Comparison</h3>
                <p className="text-slate-600 text-sm">
                    Side-by-side comparison of all analyzed algorithms
                </p>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full">
                    <thead>
                        <tr className="bg-slate-100">
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                                Algorithm
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                                Complexity
                            </th>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
                                <span className="flex items-center justify-end gap-2">
                                    <Clock className="w-4 h-4" /> Time (s)
                                </span>
                            </th>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
                                <span className="flex items-center justify-end gap-2">
                                    <Zap className="w-4 h-4" /> Energy (J)
                                </span>
                            </th>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
                                <span className="flex items-center justify-end gap-2">
                                    <Leaf className="w-4 h-4" /> CO₂ (g)
                                </span>
                            </th>
                            <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {results.map((result, idx) => {
                            const isBestEnergy = result.algorithm === bestByEnergy?.algorithm
                            const isBestTime = result.algorithm === bestByTime?.algorithm
                            const isWorstEnergy = result.algorithm === worstByEnergy?.algorithm && results.length > 1
                            const isWorstTime = result.algorithm === worstByTime?.algorithm && results.length > 1

                            return (
                                <motion.tr
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className={cn(
                                        'transition-colors',
                                        isBestEnergy && 'bg-green-50',
                                        isWorstEnergy && !isBestEnergy && 'bg-red-50/50'
                                    )}
                                >
                                    <td className="px-6 py-4">
                                        <span className="font-semibold text-slate-900">
                                            {result.algorithm}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-mono text-sm text-slate-600">
                                            {result.complexity}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className={cn(
                                            'font-mono text-sm',
                                            isBestTime ? 'text-blue-600 font-semibold' : 'text-slate-700'
                                        )}>
                                            {result.time_sec}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className={cn(
                                            'font-mono text-sm',
                                            isBestEnergy ? 'text-green-600 font-semibold' : 'text-slate-700'
                                        )}>
                                            {result.energy_joules}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className={cn(
                                            'font-mono text-sm',
                                            isBestEnergy ? 'text-green-600 font-semibold' : 'text-slate-700'
                                        )}>
                                            {result.co2_g}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center gap-1">
                                            {isBestEnergy && (
                                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                                    <Award className="w-3 h-3" /> Greenest
                                                </span>
                                            )}
                                            {isBestTime && !isBestEnergy && (
                                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                                    <TrendingUp className="w-3 h-3" /> Fastest
                                                </span>
                                            )}
                                            {!isBestEnergy && !isBestTime && (
                                                <span className="text-slate-400 text-xs">—</span>
                                            )}
                                        </div>
                                    </td>
                                </motion.tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
                {results.map((result, idx) => {
                    const isBestEnergy = result.algorithm === bestByEnergy?.algorithm
                    const isBestTime = result.algorithm === bestByTime?.algorithm

                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className={cn(
                                'p-4 rounded-xl border',
                                isBestEnergy
                                    ? 'border-green-300 bg-green-50'
                                    : 'border-slate-200 bg-white'
                            )}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className="font-bold text-slate-900">{result.algorithm}</span>
                                {isBestEnergy && (
                                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                        <Award className="w-3 h-3" /> Greenest
                                    </span>
                                )}
                                {isBestTime && !isBestEnergy && (
                                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                        <TrendingUp className="w-3 h-3" /> Fastest
                                    </span>
                                )}
                            </div>
                            <div className="grid grid-cols-3 gap-3 text-sm">
                                <div>
                                    <span className="text-slate-500 text-xs block">Time</span>
                                    <span className="font-mono font-medium">{result.time_sec}s</span>
                                </div>
                                <div>
                                    <span className="text-slate-500 text-xs block">Energy</span>
                                    <span className="font-mono font-medium">{result.energy_joules}J</span>
                                </div>
                                <div>
                                    <span className="text-slate-500 text-xs block">CO₂</span>
                                    <span className="font-mono font-medium">{result.co2_g}g</span>
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </motion.div>
    )
}
