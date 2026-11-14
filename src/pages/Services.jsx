import { Link } from 'react-router-dom'
import { ArrowRight, Check, Phone } from 'lucide-react'
import siteConfig from '../config/siteConfig'
import { approach, services } from '../data/siteData'
import { serviceWhatsAppLink, whatsappLink } from '../lib/contact'
import useDocumentTitle from '../hooks/useDocumentTitle'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import Magnetic from '../components/Magnetic'
import WhatsAppIcon from '../components/WhatsAppIcon'

const pageImage =
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=70'

export default function Services() {
  useDocumentTitle(
    'Property Services in Karachi',
    'Property buying, selling, residential, commercial, consultation and investment guidance services from Karachi Estate Property Advisor.',
  )

  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Property assistance in Karachi"
        description="Support for buying, selling, renting and reviewing residential and commercial property across Karachi."
        image={pageImage}
        imageAlt="Calm modern meeting room with natural light and timber details"
      />

      <section className="section services-section">
        <div className="container">
          <div className="services-intro" data-animate="fade-up">
            <SectionHeading
              eyebrow="How we help"
              title="Six ways to work with us"
              text="Choose the support that matches your requirement, or start with a conversation and we will help you identify the right next step."
            />
            <p className="services-intro-note">
              All enquiries are handled by phone or WhatsApp. There is no automated form or
              callback system.
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
                  <a
                    href={serviceWhatsAppLink(service.title)}
                    className="btn btn-whatsapp btn-sm service-card-cta"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <WhatsAppIcon size={16} />
                    Enquire on WhatsApp
                  </a>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section service-approach">
        <div className="container service-approach-grid">
          <Reveal className="service-approach-copy" variant="fade-right">
            <p className="eyebrow">Our approach</p>
            <h2>A straightforward way to work together</h2>
            <p>
              Property decisions carry weight. Our role is to keep the conversation useful, share
              the practical context and help you prepare the right questions before you commit.
            </p>
            <ul className="approach-list">
              {approach.map((item, index) => (
                <li key={item.title}>
                  <span>0{index + 1}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="service-approach-card" variant="fade-left">
            <p className="eyebrow">Ready when you are</p>
            <h2>Not sure where to begin?</h2>
            <p>
              Tell us your preferred area, budget and property type. We will reply with a clear
              next step and the details we need to assist you.
            </p>
            <a href={siteConfig.phoneHref} className="service-approach-phone">
              <Phone size={18} aria-hidden="true" />
              {siteConfig.phone}
            </a>
            <Magnetic strength={0.16}>
              <a
                href={whatsappLink()}
                className="btn btn-gold"
                target="_blank"
                rel="noreferrer"
              >
                <WhatsAppIcon size={17} />
                Chat on WhatsApp
              </a>
            </Magnetic>
            <p className="service-approach-note">
              Direct communication by phone and WhatsApp. No legal, tax or financial advice is
              provided.
            </p>
            <Link to="/contact" className="service-approach-link">
              See full contact details
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
