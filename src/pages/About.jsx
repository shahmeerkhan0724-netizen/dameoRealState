import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Phone,
  Star,
} from 'lucide-react'
import siteConfig from '../config/siteConfig'
import { aboutAssistance, approach, highlights, values } from '../data/siteData'
import { whatsappLink } from '../lib/contact'
import useDocumentTitle from '../hooks/useDocumentTitle'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import SmartImage from '../components/SmartImage'
import SectionHeading from '../components/SectionHeading'
import WhatsAppIcon from '../components/WhatsAppIcon'

const pageImage =
  'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1400&q=70'

const storyImage =
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=75'

export default function About() {
  useDocumentTitle(
    'About Us',
    'Learn about Karachi Estate Property Advisor, a Karachi-based real estate agency assisting buyers, sellers, tenants and investors.',
  )

  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Property guidance with a local focus"
        description="Karachi Estate Property Advisor helps buyers, sellers, tenants and investors navigate residential and commercial property in Karachi."
        image={pageImage}
        imageAlt="Karachi city skyline at dusk with warm window lights"
      />

      <section className="section about-story-section">
        <div className="container about-story-grid">
          <Reveal className="about-story-media" variant="fade-right">
            <SmartImage
              src={storyImage}
              alt="Modern residential property with clean lines and a paved entrance"
              className="about-story-image"
              sizes="(max-width: 768px) 100vw, 520px"
            />
            <div className="about-image-badge">
              <span className="about-image-badge-number">{siteConfig.rating.value}</span>
              <span className="about-image-badge-label">
                {siteConfig.rating.source} rating from {siteConfig.rating.count} review
              </span>
            </div>
          </Reveal>

          <Reveal className="about-story-copy" variant="fade-left">
            <p className="eyebrow">Who we are</p>
            <h2>A Karachi property advisor you can speak to directly</h2>
            <p>
              {siteConfig.brandName} is a real estate agency based in Shah Faisal Town, Karachi.
              We work with people who are buying, selling, renting or investing in property and
              want clear, direct communication rather than a sales pitch.
            </p>
            <p>
              Our focus is residential and commercial property across Karachi. That includes
              houses, apartments, residential plots, commercial buildings, shops and office
              spaces. We help you share your requirement once and then discuss the options that
              fit it.
            </p>
            <p>
              We do not claim to know everything about every street. What we do offer is a
              straightforward process, practical local context and a reminder to verify the
              important details before you commit.
            </p>
            <div className="about-signature">
              <div>
                <p className="about-signature-name">{siteConfig.brandName}</p>
                <p className="about-signature-role">
                  <MapPin size={13} aria-hidden="true" />
                  {siteConfig.addressShort}
                </p>
              </div>
              <Link to="/contact" className="text-link">
                Contact us
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="about-highlights-section" aria-label="Business highlights">
        <div className="container">
          <div className="about-highlights-panel">
            {highlights.map((highlight) => {
              const Icon = highlight.icon
              return (
                <div className="about-highlight" key={highlight.label}>
                  <span className="about-highlight-icon" aria-hidden="true">
                    <Icon size={18} />
                  </span>
                  <p className="about-highlight-value">
                    {highlight.value}
                    {highlight.suffix ? <span>{highlight.suffix}</span> : null}
                  </p>
                  <p className="about-highlight-label">{highlight.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section about-assistance-section">
        <div className="container">
          <div className="about-assistance-grid">
            <div className="about-assistance-copy" data-animate="fade-right">
              <SectionHeading
                eyebrow="How we assist"
                title="Practical support across the property process"
                text="Whether you are starting a search or preparing to sell, the conversation begins with your requirement."
              />
              <p>
                We keep the scope of our assistance clear. We can help you shortlist options,
                arrange viewings and prepare the questions to ask. Legal, tax and financial
                verification should always be handled by qualified professionals.
              </p>
              <Link to="/services" className="text-link">
                Explore our services
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>

            <div className="about-assistance-list" data-stagger>
              {aboutAssistance.map((item) => {
                const Icon = item.icon
                return (
                  <article className="about-assistance-item" key={item.title}>
                    <span className="about-assistance-icon" aria-hidden="true">
                      <Icon size={21} />
                    </span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section values-section">
        <div className="container">
          <SectionHeading
            eyebrow="What guides us"
            title="Clear intentions, in every conversation"
            text="Three ideas that shape the way we work and the advice we give."
            align="center"
            className="values-heading"
          />

          <div className="values-grid" data-stagger>
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <article className="value-card" key={value.title}>
                  <span className="value-number">0{index + 1}</span>
                  <span className="value-icon" aria-hidden="true">
                    <Icon size={24} />
                  </span>
                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section approach-section">
        <div className="container">
          <div className="section-heading-row">
            <SectionHeading
              eyebrow="Our approach"
              title="Simple steps, clear expectations"
              text="No unnecessary pressure. Just a practical route from your first question to a more informed decision."
            />
            <div className="rating-chip" aria-label={`${siteConfig.rating.value} out of ${siteConfig.rating.outOf} on ${siteConfig.rating.source}`}>
              <span className="rating-chip-stars" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((star) => (
                  <Star key={star} size={13} fill="currentColor" />
                ))}
              </span>
              <span>
                {siteConfig.rating.value}/{siteConfig.rating.outOf} · {siteConfig.rating.count}{' '}
                {siteConfig.rating.source} review
              </span>
            </div>
          </div>

          <div className="approach-cards" data-stagger>
            {approach.map((item) => {
              const Icon = item.icon
              return (
                <article className="approach-card" key={item.title}>
                  <span className="approach-card-icon" aria-hidden="true">
                    <Icon size={22} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="container about-cta-inner">
          <div>
            <p className="eyebrow">Start a conversation</p>
            <h2>Tell us what you are looking for.</h2>
          </div>
          <div className="cta-actions">
            <a
              href={whatsappLink()}
              className="btn btn-gold"
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppIcon size={17} />
              Chat on WhatsApp
            </a>
            <a href={siteConfig.phoneHref} className="btn btn-outline-light">
              <Phone size={16} aria-hidden="true" />
              {siteConfig.phone}
            </a>
          </div>
        </div>
        <p className="about-cta-note">
          <ArrowUpRight size={14} aria-hidden="true" />
          {siteConfig.category} · {siteConfig.addressShort}
        </p>
      </section>
    </>
  )
}
