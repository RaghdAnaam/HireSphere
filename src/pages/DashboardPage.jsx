import { ArrowRight, BriefcaseBusiness, CalendarDays, ChevronRight, CircleUserRound, FileText, Search, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CompanyMark } from '../components/JobCard'
import { StatusBadge } from '../components/StatusBadge'
import { jobs } from '../data/jobs'

const applications = [
  { jobId: 'frontend-engineer-arc', status: 'Under Review', date: 'Oct 22, 2026' },
  { jobId: 'product-designer-northstar', status: 'Submitted', date: 'Oct 20, 2026' },
  { jobId: 'growth-marketer-daylight', status: 'Shortlisted', date: 'Oct 18, 2026' },
]

export function DashboardPage() {
  const selectedApplications = applications.map((application) => ({
    ...application,
    job: jobs.find((job) => job.id === application.jobId),
  }))

  return (
    <div className="dashboard-page page-container">
      <div className="dashboard-topline"><span className="dashboard-kicker"><span className="eyebrow-dot" /> YOUR SPACE</span><span>Wednesday, October 28, 2026</span></div>
      <div className="dashboard-welcome">
        <div><div className="section-kicker">A little progress adds up</div><h1>Good morning, Alex<span className="heading-period">.</span></h1><p>Here’s where your next chapter is taking shape.</p></div>
        <Link className="button button-primary" to="/jobs">Find more roles <ArrowRight size={16} /></Link>
      </div>
      <div className="profile-progress">
        <div className="profile-progress-icon"><CircleUserRound size={21} /></div>
        <div className="profile-progress-copy"><strong>Your profile is almost there</strong><span>Add a headline and a few skills so the right teams can find you.</span></div>
        <div className="progress-meter"><span>70%</span><div><i /></div></div>
        <button className="progress-edit" aria-label="Edit profile"><ChevronRight size={19} /></button>
      </div>
      <div className="dashboard-stats">
        <article className="stat-card"><div className="stat-card-head"><span>Applications sent</span><span className="stat-icon stat-icon-lavender"><FileText size={17} /></span></div><strong>8</strong><span className="stat-foot">Across 6 different teams</span></article>
        <article className="stat-card"><div className="stat-card-head"><span>In progress</span><span className="stat-icon stat-icon-mint"><Sparkles size={17} /></span></div><strong>5</strong><span className="stat-foot">Your story is still unfolding</span></article>
        <article className="stat-card"><div className="stat-card-head"><span>Saved for later</span><span className="stat-icon stat-icon-peach"><BriefcaseBusiness size={17} /></span></div><strong>4</strong><span className="stat-foot">Roles worth another look</span></article>
      </div>
      <div className="dashboard-content-grid">
        <section className="dashboard-panel applications-panel">
          <div className="panel-heading"><div><div className="section-kicker">Your momentum</div><h2>Recent applications</h2></div><Link to="/jobs">See all <ArrowRight size={14} /></Link></div>
          <div className="application-table">
            <div className="application-table-head"><span>ROLE & COMPANY</span><span>APPLIED</span><span>STATUS</span></div>
            {selectedApplications.map(({ job, status, date }) => job && (
              <div className="application-row" key={job.id}>
                <div className="application-role"><CompanyMark job={job} /><span><strong>{job.title}</strong><small>{job.company}</small></span></div>
                <span className="application-date"><CalendarDays size={14} />{date}</span>
                <StatusBadge status={status} />
              </div>
            ))}
          </div>
        </section>
        <aside className="dashboard-panel profile-panel">
          <div className="panel-heading"><div><div className="section-kicker">Your next step</div><h2>Profile snapshot</h2></div><button aria-label="Edit profile"><ChevronRight size={18} /></button></div>
          <div className="profile-avatar">AM</div>
          <h3>Alex Morgan</h3><p className="profile-headline">Product designer who loves making things clearer.</p>
          <div className="profile-skills"><span>Product design</span><span>Figma</span><span>Research</span></div>
          <button className="profile-resume"><FileText size={16} /><span><strong>Alex-Morgan-Resume.pdf</strong><small>Updated Oct 20, 2026</small></span><ChevronRight size={16} /></button>
        </aside>
      </div>
      <section className="dashboard-recommendations">
        <div className="panel-heading"><div><div className="section-kicker">Picked for your next chapter</div><h2>Roles to explore</h2></div><Link to="/jobs">Browse all jobs <ArrowRight size={14} /></Link></div>
        <div className="recommendation-row">
          {jobs.slice(0, 3).map((job) => <Link className="recommendation-card" to={`/jobs/${job.id}`} key={job.id}><CompanyMark job={job} /><span><strong>{job.title}</strong><small>{job.company} · {job.workplace}</small></span><ArrowRight size={16} /></Link>)}
        </div>
      </section>
      <div className="dashboard-demo-note"><Search size={15} />This is a sample dashboard preview. Your data and application activity will connect in a later stage.</div>
    </div>
  )
}
