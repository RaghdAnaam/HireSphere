import { useEffect, useMemo, useState } from 'react'
import { apiRequest } from '../api/client'
import { JobsContext } from './jobsStore'

export function JobsProvider({ children }) {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    apiRequest('/jobs?limit=100')
      .then(({ jobs: results }) => {
        if (active) setJobs(results)
      })
      .catch((requestError) => {
        if (active) setError(requestError.message)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => { active = false }
  }, [])

  const value = useMemo(() => ({ jobs, loading, error }), [jobs, loading, error])
  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>
}
