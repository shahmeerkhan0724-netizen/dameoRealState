import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import siteConfig from '../config/siteConfig'
import { services } from '../data/siteData'
import useDocumentTitle from '../hooks/useDocumentTitle'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import Magnetic from '../components/Magnetic'

const pageImage =
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=70'

export default function Services() {
  useDocumentTitle('Services')

  return (
    <>
      <PageHero
        eyebrow="How we help"
        title="Guidance for every move"
        description="Buying, selling, renting or investing — thoughtful support at the pace that suits you."
        image={pageImage}
        imageAlt="A calm modern meeting room with natural light and timber details"
      />

      <section className="section services-section">
        <div className="container">
          <div className="services-intro" data-animate="fade-up">
            <SectionHeading
              eyebrow="Our services"
              title="One team, from first question to final key"
              text="Choose the support you need, or simply start with a conversation. We will help you find the right next step."
            />
            <p className="services-intro-note">
              Every service is shaped around clear communication, local knowledge and a genuinely
              unhurried approach.
            </p>
          </div>

          <div className="services-grid" data-stagger>
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <article className="service-card" key={service.title}>
                  <div className="service-card-top">
                    <span className="service-icon" aria-hidden="true">
                      <Icon size={24} />
                    </span>
                    <span className="service-number">0{index + 1}</span>
                  </div>
                  <h2>{service.title}</h2>
                  <p>{service.description}</p>
                  <ul className="service-points">
                    {service.points.map((point) => (
                      <li key={point}>
                        <Check size={14} aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/contact?subject=${encodeURIComponent(service.title)}`}
                    className="service-link"
                  >
                    Ask about this
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section service-approach">
        <div className="container service-approach-grid">
          <Reveal className="service-approach-copy" variant="fade-right">
            <p className="eyebrow">The difference</p>
            <h2>A calmer process, by design</h2>
            <p>
              Property decisions carry weight. We make space for questions, keep the paperwork
              moving and tell you what we would do if we were in your position.
            </p>
            <ul className="approach-list">
              <li>
                <span>01</span>
                <div>
                  <h3>A dedicated advisor</h3>
                  <p>One familiar voice who knows your brief and your timeline.</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <h3>Clear, honest updates</h3>
                  <p>No silence, no spin — just useful progress when it matters.</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <h3>Local eyes, wider view</h3>
                  <p>Street-level knowledge paired with a thoughtful read on the market.</p>
                </div>
              </li>
            </ul>
          </Reveal>

          <Reveal className="service-approach-card" variant="fade-left">
            <p className="eyebrow">Ready when you are</p>
            <h2>Not sure where to begin?</h2>
            <p>
              Tell us a little about your plans. We will reply with a clear next step, not a sales
              pitch.
            </p>
            <a href={siteConfig.phoneHref} className="service-approach-phone">
              {siteConfig.phone}
            </a>
            <Magnetic strength={0.16}>
              <Link to="/contact" className="btn btn-gold">
                Book a conversation
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </Magnetic>
            <p className="service-approach-note">{siteConfig.responseTime}</p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
