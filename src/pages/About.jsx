import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Instagram, Linkedin, Quote } from 'lucide-react'
import siteConfig from '../config/siteConfig'
import { stats, team, values } from '../data/siteData'
import useDocumentTitle from '../hooks/useDocumentTitle'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import SmartImage from '../components/SmartImage'
import SectionHeading from '../components/SectionHeading'
import Counter from '../components/Counter'

const pageImage =
  'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1400&q=70'

const socialIcons = {
  Instagram,
  LinkedIn: Linkedin,
}

export default function About() {
  useDocumentTitle('About us')
  const years = new Date().getFullYear() - siteConfig.foundedYear

  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="A more considered way to move"
        description="We are a small, independent team with a simple belief: finding a home should feel human."
        image={pageImage}
        imageAlt="City skyline at dusk with warm lights in the windows"
      />

      <section className="section about-story-section">
        <div className="container about-story-grid">
          <Reveal className="about-story-media" variant="fade-right">
            <SmartImage
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=70"
              alt="A small team in conversation around a bright studio table"
              className="about-story-image"
              sizes="(max-width: 768px) 100vw, 520px"
            />
            <div className="about-image-badge">
              <span className="about-image-badge-number">{years}+</span>
              <span className="about-image-badge-label">years of thoughtful moves</span>
            </div>
          </Reveal>

          <Reveal className="about-story-copy" variant="fade-left">
            <p className="eyebrow">Since {siteConfig.foundedYear}</p>
            <h2>Local knowledge, held lightly</h2>
            <p>
              {siteConfig.brandName} began with a simple belief: property advice should feel less
              like a sales pitch and more like a good conversation. A place to ask the real
              questions, take your time and make a decision that fits your life.
            </p>
            <p>
              Over the years, that belief has shaped everything — from the homes we choose to
              represent to the way we answer the phone. We stay deliberately small so every client
              has one advisor, one clear plan and a genuinely personal experience.
            </p>
            <p>
              Today we work across {siteConfig.stats[3]?.value || 24} fictional neighbourhoods, but
              our measure of success is unchanged: the quiet confidence of a client who knows they
              made the right move.
            </p>
            <div className="about-signature">
              <div>
                <p className="about-signature-name">Agent One</p>
                <p className="about-signature-role">Founder, {siteConfig.brandName}</p>
              </div>
              <Link to="/contact" className="text-link">
                Start a conversation
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="about-stats-section" aria-label="Our experience in numbers">
        <div className="container">
          <div className="about-stats-panel">
            {stats.map((stat) => (
              <Counter key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      <section className="section values-section">
        <div className="container">
          <SectionHeading
            eyebrow="What guides us"
            title="Clear intentions, in every conversation"
            text="Three ideas that sit behind the way we work, the advice we give and the homes we represent."
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

          <Reveal className="about-quote" variant="zoom">
            <Quote size={30} aria-hidden="true" />
            <blockquote>
              “The best property decisions are made with a clear head and a calm heart. Our job is
              to make room for both.”
            </blockquote>
            <p>Agent One · Founder</p>
          </Reveal>
        </div>
      </section>

      <section className="section team-section">
        <div className="container">
          <div className="section-heading-row">
            <SectionHeading
              eyebrow="The people"
              title="Small team. Real attention."
              text="A group of local advisors who believe the details matter and the relationship comes first."
            />
            <Link to="/contact" className="text-link">
              Work with us
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="team-grid" data-stagger>
            {team.map((person) => (
              <article className="team-card" key={person.name}>
                <div className="team-card-media">
                  <SmartImage
                    src={person.image}
                    alt={person.alt}
                    className="team-card-image"
                    sizes="(max-width: 768px) 100vw, 280px"
                  />
                  <div className="team-socials">
                    {Object.entries(person.socials).map(([network, href]) => {
                      const Icon = socialIcons[network]
                      if (!Icon) return null
                      return (
                        <a
                          key={network}
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${person.name} on ${network}`}
                        >
                          <Icon size={16} aria-hidden="true" />
                        </a>
                      )
                    })}
                    <Link to="/contact" aria-label={`Contact ${person.name}`}>
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
                <div className="team-card-copy">
                  <h3>{person.name}</h3>
                  <p>{person.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="container about-cta-inner">
          <div>
            <p className="eyebrow">A first conversation</p>
            <h2>Tell us what home means to you.</h2>
          </div>
          <Link to="/contact" className="btn btn-gold">
            Get in touch
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  )
}
