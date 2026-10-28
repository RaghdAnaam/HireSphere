import { useState } from 'react'
import { BriefcaseBusiness, Menu, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" aria-label="HireSphere home" onClick={closeMenu}>
          <span className="brand-mark"><BriefcaseBusiness size={19} strokeWidth={2.2} /></span>
          <span>hire<span className="brand-accent">sphere</span></span>
        </Link>
        <button
          className="mobile-menu-toggle"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          <div className="nav-links">
            <NavLink to="/jobs" onClick={closeMenu}>Find a job</NavLink>
            <a href="/#how-it-works" onClick={closeMenu}>How it works</a>
            <a href="/#for-employers" onClick={closeMenu}>For employers</a>
          </div>
          <div className="nav-actions">
            {user ? (
              <>
                <Link className="nav-login" to="/dashboard" onClick={closeMenu}>{user.name}</Link>
                <button className="button button-primary button-small" type="button" onClick={() => { logout(); closeMenu() }}>Log out</button>
              </>
            ) : (
              <>
                <Link className="nav-login" to="/login" onClick={closeMenu}>Log in</Link>
                <Link className="button button-primary button-small" to="/register" onClick={closeMenu}>Get started</Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
