import { useState } from 'react'
import { ArrowLeft, ArrowRight, BriefcaseBusiness, Check, Eye, EyeOff, LockKeyhole, Mail, UserRound } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export function AuthPage({ mode }) {
  const isRegister = mode === 'register'
  const navigate = useNavigate()
  const { login, register } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState('job-seeker')
  const [notice, setNotice] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setNotice('')
    setSubmitting(true)
    const formData = new FormData(event.currentTarget)
    const values = {
      email: formData.get('email'),
      password: formData.get('password'),
    }
    if (isRegister) {
      values.name = formData.get('name')
      values.role = role
    }
    try {
      if (isRegister) await register(values)
      else await login(values)
      navigate('/dashboard')
    } catch (error) {
      setNotice(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-story">
        <Link className="brand brand-light" to="/"><span className="brand-mark"><BriefcaseBusiness size={18} /></span><span>hire<span className="brand-accent">sphere</span></span></Link>
        <div className="auth-story-content">
          <div className="section-kicker">Make room for what’s next</div>
          <h1>Good work<br />finds its way.</h1>
          <p>Join a community of people and teams who believe work can be a little more human.</p>
          <div className="auth-story-note"><span className="auth-check"><Check size={14} /></span><span>Thoughtful opportunities, all in one place.</span></div>
        </div>
        <div className="auth-story-footer">A good next step begins with a little possibility.</div>
        <span className="auth-decoration auth-decoration-one" /><span className="auth-decoration auth-decoration-two" />
      </div>
      <div className="auth-form-side">
        <Link className="auth-back" to="/"><ArrowLeft size={15} /> Back to home</Link>
        <div className="auth-form-wrap">
          <div className="section-kicker">{isRegister ? 'Start your next chapter' : 'Welcome back'}</div>
          <h2>{isRegister ? 'Create your account' : 'Good to see you again.'}</h2>
          <p className="auth-form-intro">{isRegister ? 'A few details and you’re on your way.' : 'Sign in to pick up where you left off.'}</p>
          {notice && <div className="form-notice is-error" role="alert">{notice}</div>}
          <form onSubmit={handleSubmit}>
            {isRegister && (
              <>
                <fieldset className="role-picker">
                  <legend>I’m here as a</legend>
                  <label className={role === 'job-seeker' ? 'role-option selected' : 'role-option'}>
                    <input type="radio" name="role" value="job-seeker" checked={role === 'job-seeker'} onChange={() => setRole('job-seeker')} />
                    <UserRound size={17} /><span>Job seeker</span>
                  </label>
                  <label className={role === 'employer' ? 'role-option selected' : 'role-option'}>
                    <input type="radio" name="role" value="employer" checked={role === 'employer'} onChange={() => setRole('employer')} />
                    <BriefcaseBusiness size={17} /><span>Employer</span>
                  </label>
                </fieldset>
                <label className="form-label">Your name<div className="input-wrap"><UserRound size={17} /><input required name="name" autoComplete="name" placeholder="Alex Morgan" /></div></label>
              </>
            )}
            <label className="form-label">Email address<div className="input-wrap"><Mail size={17} /><input required name="email" type="email" autoComplete="email" placeholder="you@example.com" /></div></label>
            <label className="form-label">Password<div className="input-wrap"><LockKeyhole size={17} /><input required name="password" type={showPassword ? 'text' : 'password'} autoComplete={isRegister ? 'new-password' : 'current-password'} placeholder={isRegister ? 'At least 8 characters' : 'Enter your password'} minLength={isRegister ? 8 : undefined} /><button className="password-toggle" type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((value) => !value)}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></label>
            {!isRegister && <div className="forgot-row"><span>Keep your account secure</span><button type="button">Forgot password?</button></div>}
            <button className="button button-primary auth-submit" type="submit" disabled={submitting}>{submitting ? 'Please wait…' : isRegister ? 'Create account' : 'Log in'} <ArrowRight size={16} /></button>
          </form>
          <div className="auth-switch">{isRegister ? 'Already have an account?' : 'New to HireSphere?'} <Link to={isRegister ? '/login' : '/register'}>{isRegister ? 'Log in' : 'Create an account'}</Link></div>
          <p className="auth-terms">By continuing, you agree to our <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>.</p>
        </div>
      </div>
    </div>
  )
}
