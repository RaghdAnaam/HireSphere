import { useCallback, useEffect, useMemo, useState } from 'react'
import { apiRequest } from '../api/client'
import { AuthContext } from './authStore'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(() => !window.localStorage.getItem('hiresphere-token'))

  useEffect(() => {
    let active = true
    const token = window.localStorage.getItem('hiresphere-token')
    if (!token) return undefined
    apiRequest('/auth/me')
      .then(({ user: currentUser }) => {
        if (active) setUser(currentUser)
      })
      .catch((error) => {
        if (active && error.status === 401) {
          window.localStorage.removeItem('hiresphere-token')
          setUser(null)
        } else if (active) {
          console.error('Could not restore the HireSphere session:', error)
        }
      })
      .finally(() => {
        if (active) setReady(true)
      })

    return () => { active = false }
  }, [])

  const authenticate = useCallback(async (path, values) => {
    const result = await apiRequest(path, {
      method: 'POST',
      body: JSON.stringify(values),
    })
    window.localStorage.setItem('hiresphere-token', result.token)
    setUser(result.user)
    setReady(true)
    return result.user
  }, [])

  const register = useCallback((values) => authenticate('/auth/register', values), [authenticate])
  const login = useCallback((values) => authenticate('/auth/login', values), [authenticate])
  const logout = useCallback(() => {
    window.localStorage.removeItem('hiresphere-token')
    setUser(null)
    window.dispatchEvent(new Event('hiresphere:logout'))
  }, [])

  const value = useMemo(
    () => ({ user, ready, login, register, logout }),
    [user, ready, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
