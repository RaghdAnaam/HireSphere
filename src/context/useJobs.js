import { useContext } from 'react'
import { JobsContext } from './jobsStore'

export function useJobs() {
  const context = useContext(JobsContext)
  if (!context) throw new Error('useJobs must be used within JobsProvider')
  return context
}
