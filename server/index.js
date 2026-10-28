import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import mongoose from 'mongoose'
import { ZodError } from 'zod'
import { getConfig } from './config.js'
import authRoutes from './routes/auth.js'
import jobRoutes from './routes/jobs.js'
import savedJobRoutes from './routes/savedJobs.js'

const config = getConfig()
const app = express()
app.disable('x-powered-by')
app.use(helmet())
app.use(cors({ origin: config.frontendUrl }))
app.use(express.json({ limit: '20kb' }))

app.get('/api/health', (req, res) => {
  const connected = mongoose.connection.readyState === 1
  res.status(connected ? 200 : 503).json({ status: connected ? 'ok' : 'database unavailable' })
})

app.use('/api/auth', rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
}), authRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/saved-jobs', savedJobRoutes)

app.use((req, res) => res.status(404).json({ error: 'Route not found' }))
app.use((error, req, res, _next) => {
  if (error instanceof ZodError) {
    return res.status(400).json({ error: 'Invalid request', details: error.issues.map(({ path, message }) => ({ path: path.join('.'), message })) })
  }
  if (error?.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Request body must be valid JSON' })
  }
  console.error(error)
  res.status(500).json({ error: 'An unexpected server error occurred' })
})

try {
  await mongoose.connect(config.mongoUri)
  app.listen(config.port, () => {
    console.log(`HireSphere API listening on http://localhost:${config.port}`)
  })
} catch (error) {
  console.error('Could not start HireSphere API:', error.message)
  process.exitCode = 1
}
