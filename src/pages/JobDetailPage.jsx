import { ArrowLeft, ArrowUpRight, Bookmark, BriefcaseBusiness, Check, Clock3, MapPin, Share2, UsersRound } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { CompanyMark } from '../components/JobCard'
import { useSavedJobs } from '../context/useSavedJobs'
import { useJobs } from '../context/useJobs'

export function JobDetailPage() {
  const { jobId } = useParams()
  const { jobs, loading, error } = useJobs()
  const job = jobs.find((item) => item.id === jobId)
  const { savedIds, toggleSavedJob } = useSavedJobs()
  const isSaved = job && savedIds.includes(job.id)

  if (loading) {
    return <div className="page-container not-found-page"><p className="jobs-loading" role="status">Loading job details…</p></div>
  }

  if (!job) {
    return (
      <div className="page-container not-found-page">
        <span className="section-kicker">{error ? 'Jobs unavailable' : 'This role moved on'}</span>
        <h1>{error ? 'We couldn’t load this role.' : 'We can’t find that job.'}</h1>
        <p>{error || 'It may have closed, or the link may have changed.'}</p>
        <Link className="button button-primary" to="/jobs">Browse open roles</Link>
      </div>
    )
  }

  return (
    <div className="job-detail-page page-container">
      <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><Link to="/jobs">Find a job</Link><span>/</span><span>{job.company}</span></div>
      <Link to="/jobs" className="back-link"><ArrowLeft size={16} /> Back to all roles</Link>
      <div className="job-detail-layout">
        <article className="job-detail-main">
          <div className="job-detail-company">
            <CompanyMark job={job} size="large" />
            <div><span className="section-kicker">{job.company}</span><span className="company-note">A thoughtful team, doing good work.</span></div>
          </div>
          <h1>{job.title}<span className="heading-period">.</span></h1>
          <div className="detail-meta">
            <span><MapPin size={16} />{job.location}</span><span><BriefcaseBusiness size={16} />{job.type}</span><span><Clock3 size={16} />Posted {job.posted}</span>
          </div>
          <div className="detail-pills"><span>{job.workplace}</span><span>{job.experience}</span><span>{job.category}</span></div>
          <div className="detail-section">
            <h2>About the role</h2><p>{job.description}</p>
          </div>
          <div className="detail-section">
            <h2>What you’ll do</h2><ul className="detail-list">{job.responsibilities.map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul>
          </div>
          <div className="detail-section">
            <h2>What you’ll bring</h2><ul className="detail-list">{job.requirements.map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul>
          </div>
          <div className="detail-section">
            <h2>Skills we’re looking for</h2><div className="skill-list">{job.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
          </div>
          <div className="company-about">
            <div className="company-about-icon"><UsersRound size={19} /></div>
            <div><strong>A little about {job.company}</strong><p>Good work happens when people feel supported, trusted, and inspired to make a difference.</p></div>
            <ArrowUpRight size={16} />
          </div>
        </article>
        <aside className="job-detail-aside">
          <div className="apply-card">
            <span className="apply-card-label">The details</span>
            <div className="salary-large">{job.salary}<span> / year</span></div>
            <div className="apply-info"><span>Work arrangement</span><strong>{job.workplace}</strong></div>
            <div className="apply-info"><span>Employment type</span><strong>{job.type}</strong></div>
            <div className="apply-info"><span>Experience</span><strong>{job.experience}</strong></div>
            <Link className="button button-primary apply-button" to="/login">Apply for this role <ArrowUpRight size={16} /></Link>
            <button className={`button button-outline save-role-button ${isSaved ? 'is-saved' : ''}`} onClick={() => toggleSavedJob(job.id)}>
              <Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} />{isSaved ? 'Saved to your list' : 'Save for later'}
            </button>
            <p className="apply-note">You’ll need an account to apply. It only takes a minute.</p>
          </div>
          <div className="share-card"><Share2 size={17} /><div><strong>Know someone who’d love this?</strong><p>Good opportunities are even better when shared.</p><button onClick={() => navigator.clipboard?.writeText(window.location.href)}>Copy job link</button></div></div>
        </aside>
      </div>
    </div>
  )
}
