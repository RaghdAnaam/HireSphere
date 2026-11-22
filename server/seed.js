import mongoose from 'mongoose'
import { jobs } from '../src/data/jobs.js'
import { getConfig } from './config.js'
import { Job } from './models/Job.js'

try {
  console.log('Connecting to MongoDB...')
  await mongoose.connect(getConfig().mongoUri, {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
  })
  console.log('Connected. Seeding sample jobs...')
  await Promise.all(jobs.map((job) => {
    const salaryMin = Number(job.salary.replaceAll(',', '').match(/\d+/)?.[0])
    return Job.updateOne(
      { slug: job.id },
      { $set: { ...job, slug: job.id, salaryMin } },
      { upsert: true, runValidators: true },
    )
  }))
  console.log(`Seeded ${jobs.length} HireSphere sample jobs`)
} catch (error) {
  console.error('Could not seed HireSphere jobs:', error.message)
  process.exitCode = 1
} finally {
  await mongoose.disconnect()
}
