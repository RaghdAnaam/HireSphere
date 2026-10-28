import {
  ArrowDownRight,
  ArrowRight,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Code2,
  HeartHandshake,
  Megaphone,
  PenTool,
  Search,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { categories } from '../data/jobs'
import { JobCard } from '../components/JobCard'
import { SearchBar } from '../components/SearchBar'
import { useJobs } from '../context/useJobs'

const categoryIcons = { Code2, PenTool, Megaphone, ChartNoAxesCombined, UsersRound, HeartHandshake }

export function HomePage() {
  const navigate = useNavigate()
  const { jobs, loading, error } = useJobs()
  const featuredJobs = jobs.filter((job) => job.featured)

  function searchJobs({ keyword, location }) {
    const params = new URLSearchParams()
    if (keyword) params.set('q', keyword)
    if (location) params.set('location', location)
    navigate(`/jobs${params.size ? `?${params}` : ''}`)
  }

  return (
    <>
      <section className="hero-section">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="hero-content page-container">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> A better way to find your next role</div>
            <h1>Find work that<br />feels like <span>you.</span></h1>
            <p className="hero-description">
              Discover opportunities with thoughtful teams, meaningful work, and room to grow.
            </p>
            <SearchBar onSearch={searchJobs} />
            <div className="hero-trust">
              <div className="avatar-stack" aria-hidden="true">
                <span>J</span><span>M</span><span>A</span><span>S</span>
              </div>
              <p><strong>12,000+</strong> people found their next chapter</p>
            </div>
          </div>
          <div className="hero-art" aria-label="Illustration of a person discovering a new opportunity">
            <div className="hero-art-sun" />
            <div className="hero-art-card hero-art-card-top">
              <span className="mini-mark lavender">N</span>
              <span><strong>Product Designer</strong><small>Northstar · Remote</small></span>
              <span className="hero-card-check">✓</span>
            </div>
            <div className="hero-person">
              <div className="person-hair" />
              <div className="person-head"><span className="person-face" /></div>
              <div className="person-neck" />
              <div className="person-body">
                <div className="person-collar" />
                <div className="person-arm" />
              </div>
              <div className="person-laptop"><span>h.</span></div>
            </div>
            <div className="hero-art-card hero-art-card-bottom">
              <span className="hero-spark"><Sparkles size={17} /></span>
              <span><strong>A great fit, found.</strong><small>One of 2,400+ new roles</small></span>
            </div>
            <div className="hero-art-caption"><span><ArrowDownRight size={16} /></span> Your next chapter starts here</div>
          </div>
        </div>
        <div className="hero-bottom page-container">
          <span>Good people. Great teams. Work that matters.</span>
          <span className="hero-bottom-rule" />
          <a href="#featured">Explore open roles <ArrowRight size={15} /></a>
        </div>
      </section>

      <section className="featured-section section-space" id="featured">
        <div className="page-container">
          <div className="section-heading">
            <div>
              <div className="section-kicker">A few good places to start</div>
              <h2>Featured opportunities</h2>
              <p>Roles from teams who care about the work and the people doing it.</p>
            </div>
            <Link className="text-link" to="/jobs">View all jobs <ArrowRight size={16} /></Link>
          </div>
          {error && <div className="form-notice is-error" role="alert">Could not load jobs: {error}</div>}
          {loading
            ? <p className="jobs-loading" role="status">Loading opportunities…</p>
            : <div className="featured-grid">
            {featuredJobs.map((job) => <JobCard key={job.id} job={job} featured />)}
            </div>}
          <div className="featured-bottom">
            <span>Updated daily with new opportunities</span>
            <Link to="/jobs">See all open roles <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      <section className="category-section section-space" id="categories">
        <div className="page-container">
          <div className="section-heading">
            <div>
              <div className="section-kicker">Find your corner</div>
              <h2>Explore by category</h2>
              <p>Start with what you do best. Your next thing might surprise you.</p>
            </div>
            <Link className="text-link" to="/jobs">Browse categories <ArrowRight size={16} /></Link>
          </div>
          <div className="category-grid">
            {categories.map((category, index) => {
              const Icon = categoryIcons[category.icon]
              return (
                <Link
                  className={`category-card category-card-${index + 1}`}
                  key={category.name}
                  to={`/jobs?category=${encodeURIComponent(category.name)}`}
                >
                  <span className="category-icon"><Icon size={20} strokeWidth={1.8} /></span>
                  <span className="category-title">{category.name}</span>
                  <span className="category-openings">{category.openings} open roles</span>
                  <ArrowRight className="category-arrow" size={16} />
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="how-section section-space" id="how-it-works">
        <div className="page-container how-layout">
          <div className="how-intro">
            <div className="section-kicker">A little more human</div>
            <h2>A better kind of<br />job search.</h2>
            <p>Less noise, more signal. We help good people find teams where they can do work they’re proud of.</p>
            <Link className="button button-outline" to="/jobs">Find your next role <ArrowRight size={16} /></Link>
          </div>
          <div className="how-steps">
            <article className="how-step">
              <span className="step-number">01</span>
              <span className="step-icon"><Search size={19} /></span>
              <div><h3>Get clear on what matters</h3><p>Search by role, skills, or the way you like to work. Start with your priorities.</p></div>
            </article>
            <article className="how-step">
              <span className="step-number">02</span>
              <span className="step-icon"><BriefcaseBusiness size={19} /></span>
              <div><h3>Meet thoughtful teams</h3><p>Explore honest job details and discover companies building with intention.</p></div>
            </article>
            <article className="how-step">
              <span className="step-number">03</span>
              <span className="step-icon"><ShieldCheck size={19} /></span>
              <div><h3>Make your next move</h3><p>Keep track of the roles you love and take the next step with confidence.</p></div>
            </article>
          </div>
        </div>
      </section>

      <section className="employer-section" id="for-employers">
        <div className="page-container employer-banner">
          <div className="employer-art" aria-hidden="true">
            <span className="employer-art-circle circle-one" />
            <span className="employer-art-circle circle-two" />
            <span className="employer-art-star"><Sparkles size={20} /></span>
            <span className="employer-art-card"><span className="mini-mark mint">A</span><span><b>Good people,</b><br />great work.</span></span>
          </div>
          <div className="employer-copy">
            <div className="section-kicker">Build your kind of team</div>
            <h2>Great work starts<br />with the right people.</h2>
            <p>Meet thoughtful candidates who are ready to do meaningful work with you.</p>
            <Link className="button button-dark" to="/register">Find your next teammate <ArrowRight size={16} /></Link>
          </div>
          <div className="employer-note"><span>For teams with something good to build.</span><ArrowRight size={17} /></div>
        </div>
      </section>

      <section className="closing-section">
        <div className="page-container closing-inner">
          <div className="closing-stamp"><span>YOUR NEXT<br />CHAPTER</span><ArrowRight size={18} /></div>
          <div><div className="section-kicker">Ready when you are</div><h2>Good work is out there.</h2></div>
          <Link className="button button-primary" to="/jobs">Explore open roles <ArrowRight size={16} /></Link>
        </div>
      </section>
    </>
  )
}
