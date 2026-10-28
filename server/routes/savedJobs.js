import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { Job } from '../models/Job.js'

const router = Router()
router.use(requireAuth)

router.get('/', (req, res) => {
  res.json({ savedIds: req.user.savedJobs })
})

router.put('/:jobId', async (req, res) => {
  const exists = await Job.exists({ slug: req.params.jobId })
  if (!exists) return res.status(404).json({ error: 'Job not found' })
  if (!req.user.savedJobs.includes(req.params.jobId)) {
    req.user.savedJobs.push(req.params.jobId)
    await req.user.save()
  }
  res.json({ savedIds: req.user.savedJobs })
})

router.delete('/:jobId', async (req, res) => {
  req.user.savedJobs = req.user.savedJobs.filter((id) => id !== req.params.jobId)
  await req.user.save()
  res.json({ savedIds: req.user.savedJobs })
})

export default router
