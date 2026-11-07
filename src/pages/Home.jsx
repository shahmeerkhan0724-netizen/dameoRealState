import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  MoveHorizontal,
  Search,
  Sparkles,
} from 'lucide-react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import siteConfig from '../config/siteConfig'
import properties, { locations, propertyTypes } from '../data/properties'
import { features, howItWorks, propertyTypeTiles } from '../data/siteData'
import { formatCompactCurrency, formatCurrency } from '../lib/format'
import { splitWords } from '../lib/splitText'
import { useAppReady } from '../context/AppReadyContext'
import { usePrefersReducedMotion } from '../hooks/useMotion'
import useDocumentTitle from '../hooks/useDocumentTitle'
import SmartImage from '../components/SmartImage'
import PropertyCard from '../components/PropertyCard'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import Magnetic from '../components/Magnetic'
import Counter from '../components/Counter'
import TestimonialSlider from '../components/TestimonialSlider'

const featuredProperties = properties.filter((property) => property.featured).slice(0, 6)

function HeroSearch() {
  const navigate = useNavigate()
  const [purpose, setPurpose] = useState('Sale')
  const [location, setLocation] = useState('')
  const [type, setType] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const budgetOptions =
    purpose === 'Rent'
      ? [
          { value: '', label: 'Any monthly rent' },
          { value: '2000', label: `Up to ${formatCurrency(2000)}` },
          { value: '3000', label: `Up to ${formatCurrency(3000)}` },
          { value: '4500', label: `Up to ${formatCurrency(4500)}` },
          { value: '7500', label: `Up to ${formatCurrency(7500)}` },
          { value: '15000', label: `Up to ${formatCurrency(15000)}` },
        ]
      : [
          { value: '', label: 'Any budget' },
          { value: '300000', label: `Up to ${formatCompactCurrency(300000)}` },
          { value: '500000', label: `Up to ${formatCompactCurrency(500000)}` },
          { value: '750000', label: `Up to ${formatCompactCurrency(750000)}` },
          { value: '1000000', label: `Up to ${formatCompactCurrency(1000000)}` },
          { value: '1500000', label: `Up to ${formatCompactCurrency(1500000)}` },
          { value: '3000000', label: `Up to ${formatCompactCurrency(3000000)}` },
        ]

  const handlePurposeChange = (event) => {
    setPurpose(event.target.value)
    setMaxPrice('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const params = new URLSearchParams()
    params.set('purpose', purpose)
    if (location) params.set('location', location)
    if (type) params.set('type', type)
    if (maxPrice) params.set('maxPrice', maxPrice)
    navigate(`/properties?${params.toString()}`)
  }

  return (
    <form className="hero-search-panel" onSubmit={handleSubmit} aria-label="Search properties">
      <div className="hero-search-grid">
        <div className="hero-field">
          <label htmlFor="hero-location">City or area</label>
          <div className="hero-select-wrap">
            <select id="hero-location" value={location} onChange={(event) => setLocation(event.target.value)}>
              <option value="">All areas</option>
              {locations.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
            <ChevronDown size={15} aria-hidden="true" />
          </div>
        </div>

        <div className="hero-field">
          <label htmlFor="hero-purpose">Looking to</label>
          <div className="hero-select-wrap">
            <select id="hero-purpose" value={purpose} onChange={handlePurposeChange}>
              <option value="Sale">Buy</option>
              <option value="Rent">Rent</option>
            </select>
            <ChevronDown size={15} aria-hidden="true" />
          </div>
        </div>

        <div className="hero-field">
          <label htmlFor="hero-type">Property type</label>
          <div className="hero-select-wrap">
            <select id="hero-type" value={type} onChange={(event) => setType(event.target.value)}>
              <option value="">Any type</option>
              {propertyTypes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <ChevronDown size={15} aria-hidden="true" />
          </div>
        </div>

        <div className="hero-field">
          <label htmlFor="hero-budget">Budget</label>
          <div className="hero-select-wrap">
            <select
              id="hero-budget"
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
            >
              {budgetOptions.map((option) => (
                <option key={option.value || 'any'} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown size={15} aria-hidden="true" />
          </div>
        </div>

        <Magnetic className="hero-search-action" strength={0.16}>
          <button type="submit" className="btn btn-gold hero-search-submit">
            Search
            <Search size={17} aria-hidden="true" />
          </button>
        </Magnetic>
      </div>
    </form>
  )
}

export default function Home() {
  useDocumentTitle(siteConfig.tagline)
  const heroRef = useRef(null)
  const headingRef = useRef(null)
  const typesRef = useRef(null)
  const typesTrackRef = useRef(null)
  const howRef = useRef(null)
  const ctaRef = useRef(null)
  const ready = useAppReady()
  const reducedMotion = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (!ready || !heroRef.current) return undefined
      if (reducedMotion) return undefined

      const split = splitWords(headingRef.current)
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

      timeline
        .from('.hero-kicker', { y: 20, autoAlpha: 0, duration: 0.6 })
        .from(
          split.words,
          { yPercent: 125, duration: 1.05, stagger: 0.05, ease: 'power4.out' },
          '-=0.4',
        )
        .from('.hero-sub', { y: 22, autoAlpha: 0, duration: 0.7 }, '-=0.6')
        .from('.hero-search-panel', { y: 28, autoAlpha: 0, duration: 0.75 }, '-=0.45')
        .from('.hero-quick-links', { y: 14, autoAlpha: 0, duration: 0.5 }, '-=0.42')
        .from('.hero-scroll', { autoAlpha: 0, duration: 0.5 }, '-=0.3')

      gsap.fromTo(
        '.hero-bg-img img',
        { scale: 1.12 },
        { scale: 1.02, duration: 9, ease: 'power1.out' },
      )

      gsap.to('.hero-bg-img img', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to('.scroll-dot', {
        y: 11,
        repeat: -1,
        yoyo: true,
        duration: 1.15,
        ease: 'sine.inOut',
      })

      return () => split.revert()
    },
    { scope: heroRef, dependencies: [ready, reducedMotion] },
  )

  useGSAP(
    () => {
      if (!typesRef.current || !typesTrackRef.current) return undefined
      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const track = typesTrackRef.current
        const section = typesRef.current
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 64)

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${distance() + 160}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        return () => {
          tween.scrollTrigger?.kill()
          tween.kill()
          gsap.set(track, { x: 0 })
        }
      })

      return () => mm.revert()
    },
    { scope: typesRef },
  )

  useGSAP(
    () => {
      if (!howRef.current) return undefined
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const desktop = window.matchMedia('(min-width: 768px)').matches
        const lineFill = howRef.current.querySelector('.timeline-line-fill')
        if (lineFill) {
          gsap.fromTo(
            lineFill,
            { scaleX: desktop ? 0 : 1, scaleY: desktop ? 1 : 0 },
            {
              scaleX: 1,
              scaleY: 1,
              transformOrigin: desktop ? 'left center' : 'center top',
              ease: 'none',
              scrollTrigger: {
                trigger: howRef.current.querySelector('.timeline-steps'),
                start: 'top 76%',
                end: 'bottom 68%',
                scrub: 0.6,
              },
            },
          )
        }

        const steps = Array.from(howRef.current.querySelectorAll('.timeline-step'))
        const triggers = steps.map((step) =>
          ScrollTrigger.create({
            trigger: step,
            start: 'top 80%',
            once: true,
            onEnter: () => step.classList.add('is-active'),
          }),
        )

        return () => triggers.forEach((trigger) => trigger.kill())
      })

      return () => mm.revert()
    },
    { scope: howRef },
  )

  useGSAP(
    () => {
      if (!ctaRef.current || reducedMotion) return undefined
      const image = ctaRef.current.querySelector('.cta-bg img')
      if (!image) return undefined

      const tween = gsap.fromTo(
        image,
        { yPercent: -8, scale: 1.08 },
        {
          yPercent: 9,
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    },
    { scope: ctaRef, dependencies: [reducedMotion] },
  )

  return (
    <>
      <section className="hero" ref={heroRef} aria-labelledby="hero-title">
        <div className="hero-bg">
          <SmartImage
            src={siteConfig.hero.backgroundImage}
            alt={siteConfig.hero.backgroundAlt}
            className="hero-bg-img"
            sizes="100vw"
          />
          <div className="hero-overlay" aria-hidden="true" />
          <div className="hero-grain" aria-hidden="true" />
        </div>

        <div className="container hero-content">
          <p className="hero-kicker">
            <span className="hero-kicker-dot" aria-hidden="true" />
            {siteConfig.hero.eyebrow}
          </p>

          <h1 id="hero-title" className="hero-title" ref={headingRef}>
            {siteConfig.hero.headlineLines.map((line, index) => (
              <span
                className={`hero-line ${index === siteConfig.hero.headlineLines.length - 1 ? 'is-accent' : ''}`}
                data-split-line
                key={line}
              >
                {line}
              </span>
            ))}
          </h1>

          <p className="hero-sub">{siteConfig.hero.subtext}</p>

          <HeroSearch />

          <div className="hero-quick-links">
            <span>Popular:</span>
            {locations.slice(0, 3).map((area) => (
              <Link key={area} to={`/properties?location=${encodeURIComponent(area)}`}>
                {area}
                <ArrowUpRight size={13} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>

        <a href="#featured-homes" className="hero-scroll" aria-label="Scroll to featured properties">
          <span>Scroll to explore</span>
          <span className="scroll-track" aria-hidden="true">
            <span className="scroll-dot" />
          </span>
        </a>
      </section>

      <section className="stats-band" aria-label="Our experience in numbers">
        <div className="container">
          <div className="stats-panel">
            {siteConfig.stats.map((stat) => (
              <Counter key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      <section className="section featured-section" id="featured-homes">
        <div className="container">
          <div className="section-heading-row" data-animate="fade-up">
            <SectionHeading
              eyebrow="A curated collection"
              title="Homes with a little more character"
              text="Six places we would happily call home ourselves — each chosen for its light, layout and location."
            />
            <Link to="/properties" className="text-link">
              View all properties
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="property-grid" data-stagger>
            {featuredProperties.map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="property-types-section" ref={typesRef} aria-labelledby="types-title">
        <div className="types-pin">
          <div className="container">
            <div className="types-header">
              <SectionHeading
                eyebrow="Browse by type"
                title="Find the shape of home that fits"
                text="From a first apartment to a forever house, begin with the kind of space you have in mind."
              />
              <p className="types-scroll-hint">
                <MoveHorizontal size={18} aria-hidden="true" />
                Scroll to explore
              </p>
            </div>
          </div>

          <div className="types-viewport">
            <div className="types-track" ref={typesTrackRef}>
              {propertyTypeTiles.map((tile) => {
                const count = properties.filter((property) => property.type === tile.name).length
                return (
                  <Link
                    to={`/properties?type=${tile.name}`}
                    className="type-card"
                    key={tile.name}
                    aria-label={`Browse ${tile.title} (${count} listings)`}
                  >
                    <SmartImage
                      src={tile.image}
                      alt={tile.alt}
                      className="type-card-image"
                      sizes="(max-width: 768px) 100vw, 380px"
                    />
                    <span className="type-card-shade" aria-hidden="true" />
                    <span className="type-card-content">
                      <span className="type-card-count">
                        {String(count).padStart(2, '0')} listings
                      </span>
                      <span className="type-card-bottom">
                        <span>
                          <span className="type-card-name">{tile.title}</span>
                          <span className="type-card-description">{tile.description}</span>
                        </span>
                        <span className="type-card-arrow" aria-hidden="true">
                          <ArrowUpRight size={20} />
                        </span>
                      </span>
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section why-section">
        <div className="container">
          <div className="why-grid">
            <div className="why-intro" data-animate="fade-right">
              <SectionHeading
                eyebrow="Why work with us"
                title="Property advice that feels personal"
                text="We combine local knowledge with a quieter, more considered way of working. The result is a search that respects your time — and your plans."
              />
              <Link to="/about" className="text-link">
                Meet the team
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <div className="why-note">
                <Sparkles size={18} aria-hidden="true" />
                <p>One advisor, from first conversation to final key.</p>
              </div>
            </div>

            <div className="feature-list" data-stagger>
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <article className="feature-card" key={feature.title}>
                    <span className="feature-icon" aria-hidden="true">
                      <Icon size={22} />
                    </span>
                    <div>
                      <h3>{feature.title}</h3>
                      <p>{feature.text}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section how-section" ref={howRef} aria-labelledby="how-title">
        <div className="container">
          <SectionHeading
            eyebrow="How it works"
            title="A simple path to the right place"
            text="Three clear steps, with a real person beside you at every one."
            align="center"
            className="how-heading"
          />

          <div className="timeline-steps">
            <div className="timeline-line" aria-hidden="true">
              <span className="timeline-line-fill" />
            </div>
            {howItWorks.map((step) => {
              const Icon = step.icon
              return (
                <article className="timeline-step" key={step.step}>
                  <div className="timeline-step-top">
                    <span className="timeline-step-number">{step.step}</span>
                    <span className="timeline-step-icon" aria-hidden="true">
                      <Icon size={24} />
                    </span>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <TestimonialSlider />

      <section className="cta-banner" ref={ctaRef}>
        <div className="cta-bg">
          <SmartImage
            src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1400&q=70"
            alt="Warmly lit contemporary house with a garden terrace"
            className="cta-bg-image"
            sizes="100vw"
          />
          <span className="cta-overlay" aria-hidden="true" />
        </div>
        <div className="container cta-content">
          <Reveal variant="fade-up">
            <p className="eyebrow">A no-obligation conversation</p>
            <h2>What could your home be worth today?</h2>
            <p>
              Share a few details and we&apos;ll arrange a considered valuation, with clear local
              context and absolutely no pressure.
            </p>
            <Magnetic strength={0.2}>
              <Link to="/contact" className="btn btn-gold">
                Request a free valuation
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </>
  )
}
