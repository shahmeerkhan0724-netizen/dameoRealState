import { useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  ArrowRight,
  ChevronDown,
  Heart,
  LayoutGrid,
  List,
  MapPin,
  Search,
  SearchX,
  SlidersHorizontal,
  X,
} from 'lucide-react'
import { Flip, gsap, useGSAP } from '../lib/gsap'
import properties, {
  locations,
  priceBounds,
  propertyTypes,
  SAMPLE_LISTINGS_NOTE,
} from '../data/properties'
import { formatCurrency } from '../lib/format'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { useFavourites } from '../context/FavouritesContext'
import PageHero from '../components/PageHero'
import PropertyCard from '../components/PropertyCard'

const pageImage =
  'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1500&q=75'

const sortLabels = {
  newest: 'Newest first',
  'price-asc': 'Price: low to high',
  'price-desc': 'Price: high to low',
}

function FilterField({ label, htmlFor, children }) {
  return (
    <div className="filter-field">
      <label htmlFor={htmlFor}>{label}</label>
      <div className="select-shell">
        {children}
        <ChevronDown size={15} aria-hidden="true" />
      </div>
    </div>
  )
}

function PriceRange({ bounds, values, step, onChange }) {
  const span = Math.max(1, bounds.max - bounds.min)
  const left = ((values.min - bounds.min) / span) * 100
  const right = ((values.max - bounds.min) / span) * 100
  const width = Math.max(0, right - left)

  const updateMin = (event) => {
    const nextMin = Math.min(Number(event.target.value), values.max - step)
    onChange(Math.max(bounds.min, nextMin), values.max)
  }

  const updateMax = (event) => {
    const nextMax = Math.max(Number(event.target.value), values.min + step)
    onChange(values.min, Math.min(bounds.max, nextMax))
  }

  return (
    <div className="price-filter">
      <div className="price-filter-head">
        <span>Price range</span>
        <span className="price-filter-values">
          {formatCurrency(values.min)}
          <span aria-hidden="true"> — </span>
          {values.max >= bounds.max ? `${formatCurrency(values.max)}+` : formatCurrency(values.max)}
        </span>
      </div>
      <div className="price-range-slider">
        <span className="price-range-track" aria-hidden="true" />
        <span
          className="price-range-fill"
          style={{ left: `${left}%`, width: `${width}%` }}
          aria-hidden="true"
        />
        <input
          type="range"
          min={bounds.min}
          max={bounds.max}
          step={step}
          value={values.min}
          onChange={updateMin}
          aria-label="Minimum price"
        />
        <input
          type="range"
          min={bounds.min}
          max={bounds.max}
          step={step}
          value={values.max}
          onChange={updateMax}
          aria-label="Maximum price"
        />
      </div>
      <div className="price-range-scale" aria-hidden="true">
        <span>{formatCurrency(bounds.min)}</span>
        <span>{formatCurrency(bounds.max)}</span>
      </div>
    </div>
  )
}

export default function Properties() {
  useDocumentTitle(
    'Properties for Sale & Rent in Karachi',
    'Browse sample houses, apartments, plots, shops and offices in Karachi. Contact Karachi Estate Property Advisor for current property assistance.',
  )
  const [searchParams, setSearchParams] = useSearchParams()
  const { favourites } = useFavourites()
  const gridRef = useRef(null)
  const pendingFlip = useRef(null)
  const firstRender = useRef(true)

  const purposeParam = searchParams.get('purpose')
  const purpose = purposeParam === 'Sale' || purposeParam === 'Rent' ? purposeParam : 'All'
  const location = searchParams.get('location') || ''
  const type = searchParams.get('type') || ''
  const query = searchParams.get('q') || ''
  const beds = Number(searchParams.get('beds') || 0)
  const sort = sortLabels[searchParams.get('sort')] ? searchParams.get('sort') : 'newest'
  const favoritesOnly = searchParams.get('favorites') === '1'
  const view = searchParams.get('view') === 'list' ? 'list' : 'grid'
  const bounds = priceBounds[purpose] || priceBounds.All
  const step = purpose === 'Rent' ? 5000 : 500000
  const clamp = (value) => Math.min(bounds.max, Math.max(bounds.min, Number(value)))
  const minPrice = clamp(searchParams.get('minPrice') || bounds.min)
  const maxPrice = clamp(searchParams.get('maxPrice') || bounds.max)

  const captureFlip = () => {
    if (gridRef.current) {
      pendingFlip.current = Flip.getState(gridRef.current.querySelectorAll('.property-card'))
    }
  }

  const setParam = (key, value, resetPrice = false) => {
    captureFlip()
    const next = new URLSearchParams(searchParams)
    if (value === '' || value === null || value === undefined) next.delete(key)
    else next.set(key, String(value))
    if (resetPrice) {
      next.delete('minPrice')
      next.delete('maxPrice')
    }
    setSearchParams(next, { replace: true })
  }

  const updatePurpose = (event) => {
    captureFlip()
    const next = new URLSearchParams(searchParams)
    if (event.target.value === 'All') next.delete('purpose')
    else next.set('purpose', event.target.value)
    next.delete('minPrice')
    next.delete('maxPrice')
    setSearchParams(next, { replace: true })
  }

  const updatePrice = (nextMin, nextMax) => {
    captureFlip()
    const next = new URLSearchParams(searchParams)
    if (nextMin <= bounds.min) next.delete('minPrice')
    else next.set('minPrice', String(nextMin))
    if (nextMax >= bounds.max) next.delete('maxPrice')
    else next.set('maxPrice', String(nextMax))
    setSearchParams(next, { replace: true })
  }

  const changeView = (nextView) => {
    if (nextView === view) return
    captureFlip()
    const next = new URLSearchParams(searchParams)
    if (nextView === 'grid') next.delete('view')
    else next.set('view', nextView)
    setSearchParams(next, { replace: true })
  }

  const clearFilters = () => {
    captureFlip()
    const next = new URLSearchParams()
    if (view === 'list') next.set('view', 'list')
    setSearchParams(next, { replace: true })
  }

  const normalizedQuery = query.trim().toLowerCase()

  let filteredProperties = properties.filter((property) => {
    if (purpose !== 'All' && property.purpose !== purpose) return false
    if (location && property.location !== location) return false
    if (type && property.type !== type) return false
    if (beds && property.beds < beds) return false
    if (property.price < minPrice || property.price > maxPrice) return false
    if (favoritesOnly && !favourites.includes(property.id)) return false
    if (normalizedQuery) {
      const haystack = [property.title, property.location, property.type, property.description]
        .join(' ')
        .toLowerCase()
      if (!haystack.includes(normalizedQuery)) return false
    }
    return true
  })

  filteredProperties = [...filteredProperties].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price
    if (sort === 'price-desc') return b.price - a.price
    return new Date(b.listedAt) - new Date(a.listedAt)
  })

  const filterKey = filteredProperties.map((property) => property.id).join('|')
  const hasFilters = [
    'location',
    'purpose',
    'type',
    'beds',
    'minPrice',
    'maxPrice',
    'favorites',
    'sort',
    'q',
  ].some((key) => searchParams.has(key))

  useGSAP(
    () => {
      const grid = gridRef.current
      if (!grid) {
        pendingFlip.current = null
        return undefined
      }

      const cards = gsap.utils.toArray('.property-card', grid)

      if (firstRender.current) {
        firstRender.current = false
        gsap.from(cards, {
          autoAlpha: 0,
          y: 32,
          duration: 0.8,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 90%',
            once: true,
          },
        })
        return undefined
      }

      if (pendingFlip.current) {
        const state = pendingFlip.current
        pendingFlip.current = null
        Flip.from(state, {
          duration: 0.55,
          ease: 'power2.out',
          absolute: true,
          stagger: 0.05,
          onEnter: (elements) =>
            gsap.fromTo(
              elements,
              { autoAlpha: 0, scale: 0.96 },
              { autoAlpha: 1, scale: 1, duration: 0.45, ease: 'power2.out' },
            ),
        })
      } else {
        gsap.fromTo(
          cards,
          { autoAlpha: 0, y: 26 },
          { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out' },
        )
      }

      return undefined
    },
    { scope: gridRef, dependencies: [filterKey, view] },
  )

  return (
    <>
      <PageHero
        eyebrow="Karachi property listings"
        title="Properties for Sale & Rent in Karachi"
        description="Explore sample houses, apartments, plots, shops and offices. Refine the list by location, type, budget and bedrooms."
        image={pageImage}
        imageAlt="Aerial view of a city neighbourhood at golden hour"
      />

      <section className="properties-section">
        <div className="container properties-container">
          <div className="filters-panel" data-animate="fade-up" aria-label="Property filters">
            <div className="filters-head">
              <h2>
                <SlidersHorizontal size={18} aria-hidden="true" />
                Refine your search
              </h2>
              <button
                type="button"
                className="clear-filters"
                onClick={clearFilters}
                disabled={!hasFilters}
              >
                <X size={15} aria-hidden="true" />
                Clear filters
              </button>
            </div>

            <div className="filters-grid">
              <div className="filter-field filter-search-field">
                <label htmlFor="filter-query">Search</label>
                <div className="filter-input-wrap">
                  <Search size={15} aria-hidden="true" />
                  <input
                    id="filter-query"
                    type="search"
                    className="filter-input"
                    placeholder="Title, area or keyword"
                    value={query}
                    onChange={(event) => setParam('q', event.target.value)}
                  />
                </div>
              </div>

              <FilterField label="Location" htmlFor="filter-location">
                <select
                  id="filter-location"
                  value={location}
                  onChange={(event) => setParam('location', event.target.value)}
                >
                  <option value="">All locations</option>
                  {locations.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </FilterField>

              <FilterField label="Buy or rent" htmlFor="filter-purpose">
                <select id="filter-purpose" value={purpose} onChange={updatePurpose}>
                  <option value="All">Buy or rent</option>
                  <option value="Sale">Buy</option>
                  <option value="Rent">Rent</option>
                </select>
              </FilterField>

              <FilterField label="Property type" htmlFor="filter-type">
                <select
                  id="filter-type"
                  value={type}
                  onChange={(event) => setParam('type', event.target.value)}
                >
                  <option value="">All types</option>
                  {propertyTypes.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </FilterField>

              <FilterField label="Bedrooms" htmlFor="filter-beds">
                <select
                  id="filter-beds"
                  value={beds || ''}
                  onChange={(event) => setParam('beds', event.target.value)}
                >
                  <option value="">Any bedrooms</option>
                  <option value="1">1+ bedroom</option>
                  <option value="2">2+ bedrooms</option>
                  <option value="3">3+ bedrooms</option>
                  <option value="4">4+ bedrooms</option>
                  <option value="5">5+ bedrooms</option>
                </select>
              </FilterField>
            </div>

            <div className="filters-lower">
              <PriceRange
                bounds={bounds}
                values={{ min: minPrice, max: maxPrice }}
                step={step}
                onChange={updatePrice}
              />

              <FilterField label="Sort by" htmlFor="filter-sort">
                <select
                  id="filter-sort"
                  value={sort}
                  onChange={(event) =>
                    setParam('sort', event.target.value === 'newest' ? '' : event.target.value)
                  }
                >
                  {Object.entries(sortLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </FilterField>

              <div className="view-toggle" role="group" aria-label="Property layout">
                <button
                  type="button"
                  className={view === 'grid' ? 'is-active' : ''}
                  onClick={() => changeView('grid')}
                  aria-pressed={view === 'grid'}
                  aria-label="Grid view"
                >
                  <LayoutGrid size={18} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className={view === 'list' ? 'is-active' : ''}
                  onClick={() => changeView('list')}
                  aria-pressed={view === 'list'}
                  aria-label="List view"
                >
                  <List size={19} aria-hidden="true" />
                </button>
              </div>
            </div>

            {favoritesOnly ? (
              <div className="saved-filter-note">
                <Heart size={15} fill="currentColor" aria-hidden="true" />
                Showing your saved properties
                <button
                  type="button"
                  onClick={() => setParam('favorites', '')}
                  aria-label="Show all properties instead of saved homes"
                >
                  Show all
                </button>
              </div>
            ) : null}
          </div>

          <div className="results-bar">
            <p aria-live="polite">
              <strong>{filteredProperties.length}</strong>{' '}
              {filteredProperties.length === 1 ? 'property' : 'properties'}
              <span className="results-total"> of {properties.length} sample listings</span>
              {favoritesOnly ? ' saved' : ''}
            </p>
            <p className="results-location">
              <MapPin size={15} aria-hidden="true" />
              {location || 'Karachi'}
            </p>
          </div>

          <p className="listing-disclaimer listing-disclaimer--inline">{SAMPLE_LISTINGS_NOTE}</p>

          {filteredProperties.length ? (
            <div className={`properties-grid ${view === 'list' ? 'is-list' : 'is-grid'}`} ref={gridRef}>
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="empty-state" role="status">
              <div className="empty-state-art" aria-hidden="true">
                <span className="empty-state-ring" />
                <SearchX size={42} />
              </div>
              <p className="eyebrow">Nothing quite yet</p>
              <h2>{favoritesOnly ? 'Your saved collection is empty' : 'No properties match those filters'}</h2>
              <p>
                {favoritesOnly
                  ? 'Tap the heart on any property to keep it here for later.'
                  : 'Try widening the price range, changing the area or clearing the search keyword.'}
              </p>
              <div className="empty-state-actions">
                <button type="button" className="btn btn-gold" onClick={clearFilters}>
                  Clear all filters
                </button>
                <Link to="/properties" className="btn btn-outline-navy">
                  Browse all properties
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
