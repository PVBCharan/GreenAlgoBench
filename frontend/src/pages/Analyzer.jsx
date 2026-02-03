// Analyzer.jsx
// Algorithm benchmarking UI - Phase 5: Comparison table and carbon savings
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Zap, Play, RotateCcw, Check, Clock, Battery, Leaf,
    TrendingUp, Award, ChevronDown, AlertCircle, Wifi, WifiOff
} from 'lucide-react'
import { cn } from '@/lib/cn'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import ComparisonTable from '@/components/ui/ComparisonTable'
import CarbonSavingsCard from '@/components/ui/CarbonSavingsCard'
import * as benchmarkService from '@/services/benchmarkService'

// Available algorithms (matches backend)
const algorithms = [
    { id: 'bubble_sort', name: 'Bubble Sort', category: 'Sorting', complexity: 'O(n²)' },
    { id: 'quick_sort', name: 'Quick Sort', category: 'Sorting', complexity: 'O(n log n)' },
    { id: 'merge_sort', name: 'Merge Sort', category: 'Sorting', complexity: 'O(n log n)' },
    { id: 'heap_sort', name: 'Heap Sort', category: 'Sorting', complexity: 'O(n log n)' },
]

// Transform API response to UI format
const transformApiResponse = (apiData) => {
    if (!apiData || !apiData.results) return null

    return Object.entries(apiData.results).map(([algoId, metrics]) => ({
        algorithm: algorithms.find(a => a.id === algoId)?.name || algoId,
        complexity: algorithms.find(a => a.id === algoId)?.complexity || 'N/A',
        time_sec: metrics.time?.toFixed(4) || '0.0000',
        energy_joules: metrics.energy?.toFixed(6) || '0.000000',
        co2_g: metrics.carbon_gco2?.toFixed(6) || '0.000000',
    }))
}

export default function Analyzer() {
    const [selectedAlgos, setSelectedAlgos] = useState(['bubble_sort', 'quick_sort'])
    const [datasetSize, setDatasetSize] = useState(5000)
    const [loading, setLoading] = useState(false)
    const [results, setResults] = useState(null)
    const [showConfig, setShowConfig] = useState(true)
    const [error, setError] = useState(null)
    const [backendStatus, setBackendStatus] = useState('checking') // 'online', 'offline', 'checking'

    // Check backend status on mount
    useEffect(() => {
        checkBackendStatus()
    }, [])

    const checkBackendStatus = async () => {
        setBackendStatus('checking')
        try {
            await benchmarkService.getBenchmarkStatus()
            setBackendStatus('online')
        } catch (err) {
            console.warn('Backend not available, using mock data')
            setBackendStatus('offline')
        }
    }

    const handleAlgoToggle = (algoId) => {
        setSelectedAlgos(prev =>
            prev.includes(algoId)
                ? prev.filter(id => id !== algoId)
                : [...prev, algoId]
        )
    }

    const handleRunAnalysis = async () => {
        setLoading(true)
        setError(null)
        setResults(null)

        try {
            if (backendStatus === 'online') {
                // Try real API
                const apiData = await benchmarkService.runBenchmark(selectedAlgos, datasetSize)
                const transformedResults = transformApiResponse(apiData)
                if (transformedResults && transformedResults.length > 0) {
                    setResults(transformedResults)
                } else {
                    throw new Error('No results returned from API')
                }
            } else {
                // Fallback to mock data
                await new Promise(resolve => setTimeout(resolve, 1500))
                setResults(generateMockResults(selectedAlgos, datasetSize))
            }
            setShowConfig(false)
        } catch (err) {
            console.error('Analysis failed:', err)
            // Fallback to mock data on error
            await new Promise(resolve => setTimeout(resolve, 500))
            setResults(generateMockResults(selectedAlgos, datasetSize))
            setError('Backend unavailable - showing demo data')
            setShowConfig(false)
        } finally {
            setLoading(false)
        }
    }

    // Mock data fallback
    const generateMockResults = (algos, size) => {
        const baseMultiplier = size / 1000
        return algos.map(algoId => {
            const algo = algorithms.find(a => a.id === algoId)
            const isEfficient = algo?.complexity === 'O(n log n)'
            return {
                algorithm: algo?.name || algoId,
                complexity: algo?.complexity || 'N/A',
                time_sec: (isEfficient ? 0.005 : 0.025) * baseMultiplier * (0.8 + Math.random() * 0.4),
                energy_joules: (isEfficient ? 0.001 : 0.008) * baseMultiplier * (0.8 + Math.random() * 0.4),
                co2_g: (isEfficient ? 0.0003 : 0.002) * baseMultiplier * (0.8 + Math.random() * 0.4),
            }
        }).map(r => ({
            ...r,
            time_sec: r.time_sec.toFixed(4),
            energy_joules: r.energy_joules.toFixed(6),
            co2_g: r.co2_g.toFixed(6),
        }))
    }

    const handleReset = () => {
        setResults(null)
        setError(null)
        setShowConfig(true)
    }

    // Find best performers
    const bestByEnergy = results?.reduce((best, curr) =>
        parseFloat(curr.energy_joules) < parseFloat(best.energy_joules) ? curr : best
        , results?.[0])

    const bestByTime = results?.reduce((best, curr) =>
        parseFloat(curr.time_sec) < parseFloat(best.time_sec) ? curr : best
        , results?.[0])

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-gradient-hero py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Backend Status Indicator */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                            'inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6',
                            backendStatus === 'online' && 'bg-green-500/20 text-green-400',
                            backendStatus === 'offline' && 'bg-amber-500/20 text-amber-400',
                            backendStatus === 'checking' && 'bg-slate-500/20 text-slate-400'
                        )}
                    >
                        {backendStatus === 'online' && <><Wifi className="w-3 h-3" /> Backend Connected</>}
                        {backendStatus === 'offline' && <><WifiOff className="w-3 h-3" /> Demo Mode</>}
                        {backendStatus === 'checking' && <>Checking connection...</>}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-sm font-medium mb-6"
                    >
                        <Zap className="w-4 h-4" />
                        Algorithm Analyzer
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-6"
                    >
                        Compare Algorithm Efficiency
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-300 max-w-2xl mx-auto"
                    >
                        Select algorithms, configure parameters, and analyze their carbon footprint
                    </motion.p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-16">
                {/* Error Banner */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3"
                        >
                            <AlertCircle className="w-5 h-5 text-amber-600" />
                            <span className="text-amber-800">{error}</span>
                            <button
                                onClick={checkBackendStatus}
                                className="ml-auto text-amber-600 hover:text-amber-800 font-medium text-sm"
                            >
                                Retry Connection
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Configuration Section */}
                <AnimatePresence>
                    {showConfig && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <Card className="mb-10 shadow-xl">
                                {/* Step 1: Algorithm Selection */}
                                <div className="mb-10">
                                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-3">
                                        <span className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                                        Select Algorithms
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {algorithms.map(algo => (
                                            <motion.button
                                                key={algo.id}
                                                onClick={() => handleAlgoToggle(algo.id)}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className={cn(
                                                    'p-4 rounded-xl border-2 text-left transition-all duration-200',
                                                    selectedAlgos.includes(algo.id)
                                                        ? 'border-green-500 bg-green-50'
                                                        : 'border-slate-200 hover:border-slate-300 bg-white'
                                                )}
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className={cn(
                                                        'font-semibold',
                                                        selectedAlgos.includes(algo.id) ? 'text-green-700' : 'text-slate-800'
                                                    )}>
                                                        {algo.name}
                                                    </span>
                                                    {selectedAlgos.includes(algo.id) && (
                                                        <Check className="w-5 h-5 text-green-600" />
                                                    )}
                                                </div>
                                                <span className="text-xs text-slate-500 font-mono">{algo.complexity}</span>
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                {/* Step 2: Configuration */}
                                <div className="mb-10">
                                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-3">
                                        <span className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                                        Configuration
                                    </h3>
                                    <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                                        <label className="block text-sm font-medium text-slate-700 mb-4">
                                            Dataset Size (Elements)
                                        </label>
                                        <input
                                            type="range"
                                            min="1000"
                                            max="50000"
                                            step="1000"
                                            value={datasetSize}
                                            onChange={(e) => setDatasetSize(parseInt(e.target.value))}
                                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                                        />
                                        <div className="flex justify-between text-sm text-slate-500 mt-3">
                                            <span>1,000</span>
                                            <span className="text-lg font-bold text-green-600">{datasetSize.toLocaleString()} items</span>
                                            <span>50,000</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Run Button */}
                                <Button
                                    onClick={handleRunAnalysis}
                                    disabled={loading || selectedAlgos.length === 0}
                                    size="lg"
                                    className="w-full"
                                    icon={loading ? null : <Play className="w-5 h-5" />}
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-3">
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                            />
                                            {backendStatus === 'online' ? 'Running Benchmark...' : 'Analyzing...'}
                                        </span>
                                    ) : (
                                        'Run Analysis'
                                    )}
                                </Button>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Loading State */}
                <AnimatePresence>
                    {loading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-20"
                        >
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: [0.5, 1, 0.5]
                                }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                            >
                                <Zap className="w-10 h-10 text-green-600" />
                            </motion.div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">
                                {backendStatus === 'online' ? 'Running Benchmark' : 'Generating Analysis'}
                            </h3>
                            <p className="text-slate-600">
                                {backendStatus === 'online'
                                    ? 'Measuring energy consumption and carbon emissions...'
                                    : 'Processing algorithm comparison...'}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Results Section */}
                <AnimatePresence>
                    {results && !loading && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-10"
                        >
                            {/* Summary Cards */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <Card className="bg-gradient-to-br from-green-500 to-emerald-600 border-0 text-white">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                                            <Leaf className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <p className="text-green-100 text-sm font-medium">Most Energy Efficient</p>
                                            <p className="text-2xl font-bold">{bestByEnergy?.algorithm}</p>
                                            <p className="text-green-100 text-sm">{bestByEnergy?.energy_joules} J</p>
                                        </div>
                                    </div>
                                </Card>

                                <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 border-0 text-white">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                                            <Clock className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <p className="text-blue-100 text-sm font-medium">Fastest Execution</p>
                                            <p className="text-2xl font-bold">{bestByTime?.algorithm}</p>
                                            <p className="text-blue-100 text-sm">{bestByTime?.time_sec} sec</p>
                                        </div>
                                    </div>
                                </Card>
                            </div>

                            {/* Carbon Savings Card - Phase 5 */}
                            <CarbonSavingsCard results={results} bestByEnergy={bestByEnergy} />

                            {/* Comparison Table - Phase 5 */}
                            <Card className="p-0 overflow-hidden">
                                <div className="p-6 pb-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            {backendStatus === 'online' && (
                                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                                    Live Data
                                                </span>
                                            )}
                                            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium">
                                                {datasetSize.toLocaleString()} items
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <ComparisonTable
                                        results={results}
                                        bestByEnergy={bestByEnergy}
                                        bestByTime={bestByTime}
                                    />
                                </div>
                            </Card>

                            {/* Detailed Results */}
                            <Card>
                                <h3 className="text-xl font-bold text-slate-900 mb-6">Detailed Performance Metrics</h3>

                                {/* Visual Comparison */}
                                <div className="space-y-6">
                                    {results.map((result, idx) => {
                                        const maxEnergy = Math.max(...results.map(r => parseFloat(r.energy_joules)))
                                        const maxTime = Math.max(...results.map(r => parseFloat(r.time_sec)))
                                        const energyWidth = (parseFloat(result.energy_joules) / maxEnergy) * 100
                                        const timeWidth = (parseFloat(result.time_sec) / maxTime) * 100
                                        const isBestEnergy = result.algorithm === bestByEnergy?.algorithm
                                        const isBestTime = result.algorithm === bestByTime?.algorithm

                                        return (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="p-5 bg-slate-50 rounded-xl"
                                            >
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <span className="font-bold text-slate-900">{result.algorithm}</span>
                                                        {isBestEnergy && (
                                                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full flex items-center gap-1">
                                                                <Award className="w-3 h-3" /> Greenest
                                                            </span>
                                                        )}
                                                        {isBestTime && !isBestEnergy && (
                                                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full flex items-center gap-1">
                                                                <TrendingUp className="w-3 h-3" /> Fastest
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span className="text-xs font-mono text-slate-500">{result.complexity}</span>
                                                </div>

                                                <div className="grid grid-cols-2 gap-6">
                                                    {/* Energy Bar */}
                                                    <div>
                                                        <div className="flex justify-between text-xs text-slate-500 mb-2">
                                                            <span>Energy</span>
                                                            <span className="font-mono">{result.energy_joules} J</span>
                                                        </div>
                                                        <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${energyWidth}%` }}
                                                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                                                className={cn(
                                                                    'h-full rounded-full',
                                                                    isBestEnergy ? 'bg-green-500' : 'bg-amber-500'
                                                                )}
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Time Bar */}
                                                    <div>
                                                        <div className="flex justify-between text-xs text-slate-500 mb-2">
                                                            <span>Time</span>
                                                            <span className="font-mono">{result.time_sec} s</span>
                                                        </div>
                                                        <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${timeWidth}%` }}
                                                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                                                className={cn(
                                                                    'h-full rounded-full',
                                                                    isBestTime ? 'bg-blue-500' : 'bg-slate-400'
                                                                )}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-4 pt-4 border-t border-slate-200 flex items-center gap-2 text-sm text-slate-600">
                                                    <Leaf className="w-4 h-4 text-green-500" />
                                                    <span>CO₂ Emissions: <span className="font-mono font-medium text-slate-900">{result.co2_g}g</span></span>
                                                </div>
                                            </motion.div>
                                        )
                                    })}
                                </div>

                                {/* Reset Button */}
                                <div className="mt-8">
                                    <Button variant="outline" onClick={handleReset} className="w-full" icon={<RotateCcw className="w-4 h-4" />}>
                                        Run Another Analysis
                                    </Button>
                                </div>
                            </Card>

                            {/* Toggle Config */}
                            {!showConfig && (
                                <button
                                    onClick={() => setShowConfig(true)}
                                    className="flex items-center gap-2 mx-auto text-slate-500 hover:text-slate-700 transition-colors"
                                >
                                    <ChevronDown className="w-4 h-4" />
                                    Show Configuration
                                </button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
