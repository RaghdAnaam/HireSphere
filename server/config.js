import 'dotenv/config'

export function getConfig() {
  const { MONGODB_URI, JWT_SECRET } = process.env
  if (!MONGODB_URI) throw new Error('MONGODB_URI must be set')
  if (!JWT_SECRET || JWT_SECRET.length < 32) {
    throw new Error('JWT_SECRET must be set to at least 32 characters')
  }

  return {
    mongoUri: MONGODB_URI,
    jwtSecret: JWT_SECRET,
    port: Number(process.env.PORT || process.env.API_PORT || 4000),
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  }
}
