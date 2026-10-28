import { Router } from 'express'
import { z } from 'zod'
import { Job } from '../models/Job.js'

const router = Router()
const querySchema = z.object({
  q: z.string().trim().max(100).optional(),
  location: z.string().trim().max(100).optional(),
  category: z.string().trim().max(80).optional(),
  type: z.string().trim().max(80).optional(),
  workplace: z.string().trim().max(80).optional(),
  experience: z.string().trim().max(80).optional(),
  sort: z.enum(['newest', 'oldest', 'salary']).default('newest'),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(100),
})

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

router.get('/', async (req, res) => {
  const query = querySchema.parse(req.query)
  const filter = {}
  if (query.q) {
    const term = new RegExp(escapeRegex(query.q), 'i')
    filter.$or = [
      { title: term }, { company: term }, { category: term },
      { location: term }, { skills: term },
    ]
  }
  if (query.location) filter.location = new RegExp(escapeRegex(query.location), 'i')
  if (query.category) filter.category = query.category
  if (query.type) filter.type = query.type
  if (query.workplace) filter.workplace = query.workplace
  if (query.experience) filter.experience = query.experience

  const sort = query.sort === 'salary'
    ? { salaryMin: -1 }
    : { postedDays: query.sort === 'oldest' ? -1 : 1 }
  const [jobs, total] = await Promise.all([
    Job.find(filter).sort(sort).skip((query.page - 1) * query.limit).limit(query.limit).lean(),
    Job.countDocuments(filter),
  ])
  res.json({
    jobs: jobs.map(({ _id, slug, ...job }) => ({ id: slug, ...job })),
    pagination: { page: query.page, limit: query.limit, total, pages: Math.ceil(total / query.limit) },
  })
})

router.get('/:jobId', async (req, res) => {
  const job = await Job.findOne({ slug: req.params.jobId }).lean()
  if (!job) return res.status(404).json({ error: 'Job not found' })
  const { _id, slug, ...details } = job
  res.json({ job: { id: slug, ...details } })
})

export default router
