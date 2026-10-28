import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import { getConfig } from '../config.js'
import { requireAuth } from '../middleware/auth.js'
import { User } from '../models/User.js'

const router = Router()
const credentialsSchema = z.object({
  email: z.string().email().max(254).transform((value) => value.toLowerCase()),
  password: z.string().min(8).max(72),
})
const registrationSchema = credentialsSchema.extend({
  name: z.string().trim().min(2).max(80),
  role: z.enum(['job-seeker', 'employer']),
})

function issueSession(user) {
  const token = jwt.sign({}, getConfig().jwtSecret, {
    algorithm: 'HS256',
    subject: user.id,
    expiresIn: '7d',
  })
  return {
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  }
}

router.post('/register', async (req, res) => {
  const input = registrationSchema.parse(req.body)
  const passwordHash = await bcrypt.hash(input.password, 12)

  try {
    const user = await User.create({ ...input, passwordHash })
    res.status(201).json(issueSession(user))
  } catch (error) {
    if (error?.code === 11000) return res.status(409).json({ error: 'An account with this email already exists' })
    throw error
  }
})

router.post('/login', async (req, res) => {
  const input = credentialsSchema.parse(req.body)
  const user = await User.findOne({ email: input.email }).select('+passwordHash')
  if (!user || !(await bcrypt.compare(input.password, user.passwordHash))) {
    return res.status(401).json({ error: 'Email or password is incorrect' })
  }
  res.json(issueSession(user))
})

router.get('/me', requireAuth, (req, res) => {
  const { id, name, email, role } = req.user
  res.json({ user: { id, name, email, role } })
})

export default router
