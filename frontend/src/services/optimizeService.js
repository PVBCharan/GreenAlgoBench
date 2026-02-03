/**
 * Optimization Service
 * 
 * API calls for algorithm optimization recommendations.
 */

import api from './api'

/**
 * Get optimization module status
 * @returns {Promise} Optimizer availability and strategies
 */
export const getOptimizeStatus = async () => {
  return api.get('/optimize/status')
}

/**
 * Get algorithm optimization recommendations
 * @param {string} strategy - Optimization strategy ('carbon_first', 'speed_first', 'balanced')
 * @param {number} dataset_size - Optional dataset size for context
 * @returns {Promise} Optimization recommendations and alternatives
 */
export const getOptimization = async (strategy = 'balanced', dataset_size = null) => {
  return api.post('/optimize', {
    strategy,
    dataset_size,
  })
}

/**
 * Get scenario-specific algorithm recommendations
 * @param {boolean} cpu_intensive - Whether workload is CPU-intensive
 * @param {boolean} memory_intensive - Whether workload is memory-intensive
 * @param {boolean} latency_sensitive - Whether low latency is critical
 * @returns {Promise} Scenario-specific recommendations
 */
export const getScenarioRecommendation = async (
  cpu_intensive = false,
  memory_intensive = false,
  latency_sensitive = false
) => {
  return api.post('/optimize/recommend-for-scenario', {
    cpu_intensive,
    memory_intensive,
    latency_sensitive,
  })
}

/**
 * Get list of all available algorithms
 * @returns {Promise} Algorithm list with characteristics
 */
export const getAlgorithms = async () => {
  return api.get('/optimize/algorithms')
}
