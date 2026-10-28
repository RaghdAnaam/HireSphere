import { useContext } from 'react'
import { SavedJobsContext } from './savedJobsStore'

export function useSavedJobs() {
  const context = useContext(SavedJobsContext)
  if (!context) {
    throw new Error('useSavedJobs must be used within SavedJobsProvider')
  }
  return context
}
