/**
 * System Service
 * 
 * API calls related to system footprint and resource monitoring.
 */

import api from './api'

/**
 * Get current system carbon footprint
 * @returns {Promise} System metrics and carbon footprint
 */
export const getSystemFootprint = async () => {
  return api.get('/system-footprint')
}

/**
 * Estimate carbon footprint for custom resources
 * @param {number} cpu_percent - CPU usage percentage (0-100)
 * @param {number} memory_gb - Memory usage in GB
 * @returns {Promise} Estimated footprint data
 */
export const estimateFootprint = async (cpu_percent, memory_gb) => {
  return api.post('/system-footprint/estimate', {
    cpu_percent,
    memory_gb,
  })
}
