/**
 * Custom Hooks for API Services
 * 
 * Reusable hooks for common API operations in components.
 */

import { useState, useEffect } from 'react'
import { systemService, benchmarkService, optimizeService } from '@/services'

/**
 * Hook to fetch system footprint
 * @param {boolean} refetch - Force refetch flag
 * @returns {Object} { data, loading, error, refetch }
 */
export function useSystemFootprint(refetch = false) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await systemService.getSystemFootprint()
        setData(response)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [refetch])

  return { data, loading, error }
}

/**
 * Hook to run benchmarks
 * @returns {Object} { results, loading, error, run }
 */
export function useBenchmark() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const run = async (algorithms = null, datasetSize = 1000) => {
    setLoading(true)
    setError(null)
    try {
      const response = await benchmarkService.runBenchmark(algorithms, datasetSize)
      setResults(response)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { results, loading, error, run }
}

/**
 * Hook to get optimization recommendation
 * @returns {Object} { recommendation, loading, error, getRecommendation }
 */
export function useOptimization() {
  const [recommendation, setRecommendation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getRecommendation = async (strategy = 'balanced') => {
    setLoading(true)
    setError(null)
    try {
      const response = await optimizeService.getOptimization(strategy)
      setRecommendation(response)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getRecommendation()
  }, [])

  return { recommendation, loading, error, getRecommendation }
}

/**
 * Hook to get benchmark results
 * @returns {Object} { results, loading, error }
 */
export function useBenchmarkResults() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await benchmarkService.getBenchmarkResults()
        setResults(response)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  return { results, loading, error }
}

/**
 * Hook to get available algorithms
 * @returns {Object} { algorithms, loading, error }
 */
export function useAlgorithms() {
  const [algorithms, setAlgorithms] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await optimizeService.getAlgorithms()
        setAlgorithms(response)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  return { algorithms, loading, error }
}
