import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="page-container not-found-page">
      <span className="section-kicker">A small detour</span>
      <h1>We lost that page<span className="heading-period">.</span></h1>
      <p>The page may have moved. Let’s get you back to the good stuff.</p>
      <div className="not-found-actions"><Link className="button button-primary" to="/jobs">Explore open roles <ArrowRight size={16} /></Link><Link className="back-link" to="/"><ArrowLeft size={15} /> Go home</Link></div>
    </div>
  )
}
