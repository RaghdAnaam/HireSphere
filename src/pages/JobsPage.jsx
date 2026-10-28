import { useMemo, useState } from 'react'
import { ArrowDownWideNarrow, Bookmark, SlidersHorizontal, X } from 'lucide-react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { JobCard } from '../components/JobCard'
import { SearchBar } from '../components/SearchBar'
import { useSavedJobs } from '../context/useSavedJobs'
import { useJobs } from '../context/useJobs'

const PAGE_SIZE = 6

export function JobsPage({ savedOnly = false }) {
  const [params, setParams] = useSearchParams()
  const location = useLocation()
  const { savedIds } = useSavedJobs()
  const { jobs, loading, error } = useJobs()
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const keyword = params.get('q') || ''
  const locationFilter = params.get('location') || ''
  const categoryFilter = params.get('category') || ''
  const typeFilter = params.get('type') || ''
  const workplaceFilter = params.get('workplace') || ''
  const experienceFilter = params.get('experience') || ''
  const sortBy = params.get('sort') || 'newest'
  const isSavedPage = savedOnly || location.pathname === '/saved'

  function updateParam(key, value) {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next)
  }

  function updateSearch({ keyword: nextKeyword, location: nextLocation }) {
    const next = new URLSearchParams(params)
    if (nextKeyword) next.set('q', nextKeyword)
    else next.delete('q')
    if (nextLocation) next.set('location', nextLocation)
    else next.delete('location')
    setParams(next)
    setVisibleCount(PAGE_SIZE)
  }

  const filteredJobs = useMemo(() => {
    let result = jobs.filter((job) => {
      const query = keyword.toLowerCase()
      const matchesQuery = !query || [
        job.title, job.company, job.category, job.location, ...job.skills,
      ].some((value) => value.toLowerCase().includes(query))
      const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase())
      const matchesCategory = !categoryFilter || job.category === categoryFilter
      const matchesType = !typeFilter || job.type === typeFilter
      const matchesWorkplace = !workplaceFilter || job.workplace === workplaceFilter
      const matchesExperience = !experienceFilter || job.experience === experienceFilter
      const matchesSaved = !isSavedPage || savedIds.includes(job.id)
      return matchesQuery && matchesLocation && matchesCategory && matchesType &&
        matchesWorkplace && matchesExperience && matchesSaved
    })
    if (sortBy === 'salary') result = [...result].sort((a, b) => Number(b.salary.match(/\d+/)?.[0]) - Number(a.salary.match(/\d+/)?.[0]))
    else if (sortBy === 'oldest') result = [...result].sort((a, b) => b.postedDays - a.postedDays)
    else result = [...result].sort((a, b) => a.postedDays - b.postedDays)
    return result
  }, [jobs, keyword, locationFilter, categoryFilter, typeFilter, workplaceFilter, experienceFilter, sortBy, savedIds, isSavedPage])

  const hasFilters = Boolean(keyword || locationFilter || categoryFilter || typeFilter || workplaceFilter || experienceFilter)
  const title = isSavedPage ? 'Your saved jobs' : 'Find your next role'

  function clearFilters() {
    setParams(isSavedPage ? {} : { sort: sortBy })
    setVisibleCount(PAGE_SIZE)
  }

  return (
    <div className="jobs-page page-container">
      <div className="jobs-heading">
        <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span>{isSavedPage ? 'Saved jobs' : 'Find a job'}</span></div>
        <div className="section-kicker">{isSavedPage ? 'Keep the good ones close' : 'Your next chapter is closer than you think'}</div>
        <h1>{title}<span className="heading-period">.</span></h1>
        <p>{isSavedPage ? 'The opportunities you bookmarked, all in one place.' : 'Thoughtful teams. Clear expectations. A better fit for what comes next.'}</p>
        {!isSavedPage && <SearchBar compact initialSearch={keyword} onSearch={updateSearch} />}
      </div>
      <div className="jobs-layout">
        <aside className={`filter-panel ${filtersOpen ? 'filter-panel-open' : ''}`}>
          <div className="filter-heading"><h2><SlidersHorizontal size={17} /> Filters</h2><button className="filter-close icon-button" onClick={() => setFiltersOpen(false)} aria-label="Close filters"><X size={18} /></button></div>
          <FilterGroup label="Category">
            <select aria-label="Filter by category" value={categoryFilter} onChange={(event) => updateParam('category', event.target.value)}>
              <option value="">All categories</option>
              {[...new Set(jobs.map((job) => job.category))].map((item) => <option key={item}>{item}</option>)}
            </select>
          </FilterGroup>
          <FilterGroup label="Employment type">
            <select aria-label="Filter by employment type" value={typeFilter} onChange={(event) => updateParam('type', event.target.value)}>
              <option value="">Any type</option>
              {[...new Set(jobs.map((job) => job.type))].map((item) => <option key={item}>{item}</option>)}
            </select>
          </FilterGroup>
          <FilterGroup label="Work arrangement">
            <select aria-label="Filter by work arrangement" value={workplaceFilter} onChange={(event) => updateParam('workplace', event.target.value)}>
              <option value="">Any arrangement</option>
              {[...new Set(jobs.map((job) => job.workplace))].map((item) => <option key={item}>{item}</option>)}
            </select>
          </FilterGroup>
          <FilterGroup label="Experience">
            <select aria-label="Filter by experience level" value={experienceFilter} onChange={(event) => updateParam('experience', event.target.value)}>
              <option value="">Any level</option>
              {[...new Set(jobs.map((job) => job.experience))].map((item) => <option key={item}>{item}</option>)}
            </select>
          </FilterGroup>
          {hasFilters && <button className="clear-filters" type="button" onClick={clearFilters}>Clear all filters</button>}
          <div className="saved-callout">
            <Bookmark size={17} />
            <p>Save a role to come back to it anytime.</p>
            <Link to="/saved">View saved jobs <span>({savedIds.length})</span></Link>
          </div>
        </aside>
        <section className="job-results" aria-live="polite">
          {error && <div className="form-notice is-error" role="alert">Could not load jobs: {error}</div>}
          <div className="results-toolbar">
            <div><strong>{filteredJobs.length}</strong> {filteredJobs.length === 1 ? 'role' : 'roles'} {hasFilters ? 'match your search' : 'to explore'}</div>
            <div className="results-controls">
              <button className="filter-mobile-button" onClick={() => setFiltersOpen(true)}><SlidersHorizontal size={15} /> Filters</button>
              <label className="sort-control"><ArrowDownWideNarrow size={16} /><span>Sort:</span>
                <select aria-label="Sort job listings" value={sortBy} onChange={(event) => updateParam('sort', event.target.value)}>
                  <option value="newest">Most recent</option>
                  <option value="oldest">Oldest</option>
                  <option value="salary">Highest salary</option>
                </select>
              </label>
            </div>
          </div>
          {loading ? (
            <p className="jobs-loading" role="status">Loading opportunities…</p>
          ) : filteredJobs.length ? (
            <>
              <div className="jobs-grid">
                {filteredJobs.slice(0, visibleCount).map((job) => <JobCard job={job} key={job.id} />)}
              </div>
              {visibleCount < filteredJobs.length && (
                <button className="button button-outline load-more" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>Load more roles</button>
              )}
            </>
          ) : (
            <div className="empty-state">
              <span className="empty-state-icon"><Bookmark size={21} /></span>
              <h2>{isSavedPage ? 'No saved roles just yet' : 'No roles found this time'}</h2>
              <p>{isSavedPage ? 'When a role catches your eye, save it and it’ll be waiting here.' : 'Try a different search or clear a filter to see more opportunities.'}</p>
              {isSavedPage
                ? <Link className="button button-primary" to="/jobs">Explore open roles</Link>
                : <button className="button button-primary" onClick={clearFilters}>Clear filters</button>}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

function FilterGroup({ label, children }) {
  return <label className="filter-group"><span>{label}</span>{children}</label>
}
