import { useCallback, useEffect, useMemo, useState } from 'react'
import { apiRequest } from '../api/client'
import { useAuth } from './useAuth'
import { SavedJobsContext } from './savedJobsStore'

function readSavedJobs() {
  try {
    const saved = JSON.parse(window.localStorage.getItem('hiresphere-saved-jobs') || '[]')
    return Array.isArray(saved) ? saved.filter((id) => typeof id === 'string') : []
  } catch {
    return []
  }
}

export function SavedJobsProvider({ children }) {
  const { user, ready } = useAuth()
  const [savedIds, setSavedIds] = useState(readSavedJobs)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!ready || !user) return
    let active = true
    apiRequest('/saved-jobs')
      .then(({ savedIds: ids }) => {
        if (active) setSavedIds(ids)
      })
      .catch((requestError) => {
        if (active) setError(`Could not load saved jobs: ${requestError.message}`)
      })
    return () => { active = false }
  }, [user, ready])

  useEffect(() => {
    function restoreAnonymousSavedJobs() {
      setSavedIds(readSavedJobs())
      setError('')
    }
    window.addEventListener('hiresphere:logout', restoreAnonymousSavedJobs)
    return () => window.removeEventListener('hiresphere:logout', restoreAnonymousSavedJobs)
  }, [])

  const toggleSavedJob = useCallback(async (jobId) => {
    setError('')
    const wasSaved = savedIds.includes(jobId)
    const next = wasSaved
      ? savedIds.filter((id) => id !== jobId)
      : [...savedIds, jobId]
    setSavedIds(next)

    if (!user) {
      window.localStorage.setItem('hiresphere-saved-jobs', JSON.stringify(next))
      return
    }
    try {
      const result = await apiRequest(`/saved-jobs/${encodeURIComponent(jobId)}`, {
        method: wasSaved ? 'DELETE' : 'PUT',
      })
      setSavedIds(result.savedIds)
    } catch (requestError) {
      setSavedIds(savedIds)
      setError(`Could not update saved jobs: ${requestError.message}`)
    }
  }, [savedIds, user])

  const value = useMemo(
    () => ({ savedIds, toggleSavedJob, error }),
    [savedIds, toggleSavedJob, error],
  )

  return (
    <SavedJobsContext.Provider value={value}>
      {children}
    </SavedJobsContext.Provider>
  )
}
