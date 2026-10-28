import { Bookmark, MapPin, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSavedJobs } from '../context/useSavedJobs'

export function CompanyMark({ job, size = 'regular' }) {
  return (
    <span className={`company-mark ${job.logoTone} ${size}`} aria-hidden="true">
      {job.initials}
    </span>
  )
}

export function JobCard({ job, featured = false }) {
  const { savedIds, toggleSavedJob } = useSavedJobs()
  const isSaved = savedIds.includes(job.id)

  return (
    <article className={`job-card ${featured ? 'job-card-featured' : ''}`}>
      <div className="job-card-top">
        <CompanyMark job={job} />
        <button
          className={`icon-button save-button ${isSaved ? 'is-saved' : ''}`}
          type="button"
          onClick={() => toggleSavedJob(job.id)}
          aria-label={isSaved ? `Remove ${job.title} at ${job.company} from saved jobs` : `Save ${job.title} at ${job.company}`}
          aria-pressed={isSaved}
        >
          <Bookmark size={18} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="job-company">{job.company}</div>
      <h3><Link to={`/jobs/${job.id}`}>{job.title}</Link></h3>
      <div className="job-meta">
        <span><MapPin size={14} />{job.location}</span>
        <span className="meta-dot">·</span>
        <span>{job.workplace}</span>
      </div>
      <div className="job-tags">
        <span className="job-tag">{job.type}</span>
        <span className="job-tag">{job.experience}</span>
      </div>
      <div className="job-card-bottom">
        <span className="job-salary">{job.salary}<small> / year</small></span>
        {featured && <span className="featured-label"><Sparkles size={13} /> Featured</span>}
      </div>
    </article>
  )
}
