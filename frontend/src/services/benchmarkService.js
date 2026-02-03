/**
 * Benchmark Service
 * 
 * API calls for running algorithm benchmarks and retrieving results.
 * Connects to FastAPI backend on port 8080.
 */

import api from './api'

/**
 * Get benchmark module status
 * @returns {Promise} Benchmark status and available algorithms
 */
export const getBenchmarkStatus = async () => {
  return api.get('/api/benchmark/status')
}

/**
 * Run algorithm benchmarks
 * @param {string[]} algorithms - List of algorithm names to benchmark
 * @param {number} dataset_size - Size of dataset for benchmarking
 * @returns {Promise} Benchmark results for each algorithm
 */
export const runBenchmark = async (algorithms = null, dataset_size = 1000) => {
  return api.post('/api/benchmark', null, {
    params: {
      algorithms: algorithms ? algorithms.join(',') : null,
      dataset_size,
    }
  })
}

/**
 * Run quick analysis (fast, uses sample/cached data)
 * @returns {Promise} Quick analysis results
 */
export const getQuickAnalysis = async () => {
  return api.get('/api/analyze/quick')
}

/**
 * Get latest benchmark results
 * @returns {Promise} Latest benchmark data
 */
export const getBenchmarkResults = async () => {
  return api.get('/api/benchmark/results')
}

/**
 * Compare two algorithms
 * @param {string} algorithm_1 - Name of first algorithm
 * @param {string} algorithm_2 - Name of second algorithm
 * @returns {Promise} Comparative analysis
 */
export const compareBenchmarks = async (algorithm_1, algorithm_2) => {
  return api.post('/api/benchmark/compare', null, {
    params: { algorithm_1, algorithm_2 }
  })
}
