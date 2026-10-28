import jwt from 'jsonwebtoken'
import { getConfig } from '../config.js'
import { User } from '../models/User.js'

export async function requireAuth(req, res, next) {
  const authorization = req.get('authorization')
  const token = authorization?.startsWith('Bearer ') ? authorization.slice(7) : ''
  if (!token) return res.status(401).json({ error: 'Authentication required' })

  try {
    const { sub } = jwt.verify(token, getConfig().jwtSecret, { algorithms: ['HS256'] })
    const user = await User.findById(sub)
    if (!user) return res.status(401).json({ error: 'Account no longer exists' })
    req.user = user
    next()
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: 'Invalid or expired session' })
    }
    next(error)
  }
}
