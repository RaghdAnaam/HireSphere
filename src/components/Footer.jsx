import { ArrowUpRight, BriefcaseBusiness } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link className="brand brand-light" to="/">
            <span className="brand-mark"><BriefcaseBusiness size={18} /></span>
            <span>hire<span className="brand-accent">sphere</span></span>
          </Link>
          <p>Good work starts with finding the right place.</p>
        </div>
        <div className="footer-column">
          <h3>Explore</h3>
          <Link to="/jobs">Find a job</Link>
          <a href="/#categories">Browse categories</a>
          <a href="/#how-it-works">How it works</a>
        </div>
        <div className="footer-column">
          <h3>For employers</h3>
          <a href="/#for-employers">Post a job</a>
          <a href="/#for-employers">Hiring resources</a>
          <Link to="/register">Create an account</Link>
        </div>
        <div className="footer-note">
          <span className="footer-note-icon"><ArrowUpRight size={17} /></span>
          <p>Find work that feels like a good fit.</p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 HireSphere. Made for what’s next.</span>
        <span>Thoughtful work. Better matches.</span>
      </div>
    </footer>
  )
}
