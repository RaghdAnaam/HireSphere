import { MapPin, Search } from 'lucide-react'

export function SearchBar({ initialSearch = '', onSearch, compact = false }) {
  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    onSearch?.({
      keyword: formData.get('keyword').toString().trim(),
      location: formData.get('location').toString().trim(),
    })
  }

  return (
    <form className={`search-bar ${compact ? 'search-bar-compact' : ''}`} onSubmit={handleSubmit}>
      <label className="search-field">
        <Search size={19} aria-hidden="true" />
        <span className="visually-hidden">Job title, skill, or company</span>
        <input name="keyword" defaultValue={initialSearch} placeholder="Job title, skill, or company" />
      </label>
      <span className="search-divider" aria-hidden="true" />
      <label className="search-field search-location">
        <MapPin size={19} aria-hidden="true" />
        <span className="visually-hidden">City, state, or remote</span>
        <input name="location" placeholder="City, state, or remote" />
      </label>
      <button className="button button-primary search-submit" type="submit">
        <Search size={17} />
        <span>Search jobs</span>
      </button>
    </form>
  )
}
