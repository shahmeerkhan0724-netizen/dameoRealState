import { useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react'
import siteConfig from '../config/siteConfig'
import { faqs, services } from '../data/siteData'
import useDocumentTitle from '../hooks/useDocumentTitle'
import PageHero from '../components/PageHero'
import MapPlaceholder from '../components/MapPlaceholder'
import FaqAccordion from '../components/FaqAccordion'
import SectionHeading from '../components/SectionHeading'

const pageImage =
  'https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=1400&q=70'

const subjectOptions = ['General enquiry', ...services.map((service) => service.title)]

const initialForm = {
  name: '',
  email: '',
  phone: '',
  subject: 'General enquiry',
  message: '',
}

export default function Contact() {
  useDocumentTitle('Contact us')
  const [searchParams] = useSearchParams()
  const initialSubject = subjectOptions.includes(searchParams.get('subject'))
    ? searchParams.get('subject')
    : 'General enquiry'
  const [form, setForm] = useState({ ...initialForm, subject: initialSubject })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef(null)

  const setField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current }
        delete next[field]
        return next
      })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = {}

    if (form.name.trim().length < 2) nextErrors.name = 'Please tell us your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.'
    }
    if (!/^[+()\d\s-]{7,}$/.test(form.phone.trim())) {
      nextErrors.phone = 'Please enter a valid phone number.'
    }
    if (form.message.trim().length < 10) {
      nextErrors.message = 'Please share a little more detail (at least 10 characters).'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      window.requestAnimationFrame(() => {
        formRef.current?.querySelector('[aria-invalid="true"]')?.focus()
      })
      return
    }

    setSubmitted(true)
  }

  const resetForm = () => {
    setForm({ ...initialForm, subject: initialSubject })
    setErrors({})
    setSubmitted(false)
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s talk about what’s next"
        description="A question, a viewing, a valuation — however we can help, start here."
        image={pageImage}
        imageAlt="A leafy city street with townhouses in soft afternoon light"
      />

      <section className="section contact-section">
        <div className="container">
          <div className="contact-info-grid" data-stagger>
            <a href={siteConfig.phoneHref} className="contact-info-card">
              <span className="contact-info-icon" aria-hidden="true">
                <Phone size={20} />
              </span>
              <span>
                <span className="contact-info-label">Call us</span>
                <strong>{siteConfig.phone}</strong>
              </span>
              <ArrowRight size={17} aria-hidden="true" />
            </a>

            <a href={`mailto:${siteConfig.email}`} className="contact-info-card">
              <span className="contact-info-icon" aria-hidden="true">
                <Mail size={20} />
              </span>
              <span>
                <span className="contact-info-label">Email us</span>
                <strong>{siteConfig.email}</strong>
              </span>
              <ArrowRight size={17} aria-hidden="true" />
            </a>

            <div className="contact-info-card">
              <span className="contact-info-icon" aria-hidden="true">
                <MapPin size={20} />
              </span>
              <span>
                <span className="contact-info-label">Visit us</span>
                <strong>{siteConfig.addressShort}</strong>
              </span>
            </div>

            <div className="contact-info-card">
              <span className="contact-info-icon" aria-hidden="true">
                <Clock3 size={20} />
              </span>
              <span>
                <span className="contact-info-label">Opening hours</span>
                <strong>{siteConfig.workingHours[0].hours}</strong>
              </span>
            </div>
          </div>

          <div className="contact-main-grid">
            <div className="contact-form-card" data-animate="fade-right">
              {submitted ? (
                <div className="contact-success" role="status" aria-live="polite">
                  <span className="contact-success-icon" aria-hidden="true">
                    <CheckCircle2 size={32} />
                  </span>
                  <p className="eyebrow">Message sent</p>
                  <h2>Thank you for reaching out.</h2>
                  <p>
                    We&apos;ve received your note and will reply within one business day. If it is
                    urgent, call us on {siteConfig.phone}.
                  </p>
                  <button type="button" className="btn btn-outline-navy" onClick={resetForm}>
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <div className="contact-form-heading">
                    <p className="eyebrow">Send a note</p>
                    <h2>How can we help?</h2>
                    <p>{siteConfig.responseTime}</p>
                  </div>

                  <form className="contact-form" onSubmit={handleSubmit} ref={formRef} noValidate>
                    <div className="contact-form-row">
                      <div className="form-field">
                        <label htmlFor="contact-name">Your name</label>
                        <input
                          id="contact-name"
                          type="text"
                          autoComplete="name"
                          placeholder="Full name"
                          value={form.name}
                          onChange={(event) => setField('name', event.target.value)}
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={errors.name ? 'contact-name-error' : undefined}
                        />
                        {errors.name ? (
                          <p className="form-error" id="contact-name-error" role="alert">
                            {errors.name}
                          </p>
                        ) : null}
                      </div>

                      <div className="form-field">
                        <label htmlFor="contact-email">Email address</label>
                        <input
                          id="contact-email"
                          type="email"
                          autoComplete="email"
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={(event) => setField('email', event.target.value)}
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={errors.email ? 'contact-email-error' : undefined}
                        />
                        {errors.email ? (
                          <p className="form-error" id="contact-email-error" role="alert">
                            {errors.email}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="contact-form-row">
                      <div className="form-field">
                        <label htmlFor="contact-phone">Phone number</label>
                        <input
                          id="contact-phone"
                          type="tel"
                          autoComplete="tel"
                          placeholder={siteConfig.phone}
                          value={form.phone}
                          onChange={(event) => setField('phone', event.target.value)}
                          aria-invalid={Boolean(errors.phone)}
                          aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                        />
                        {errors.phone ? (
                          <p className="form-error" id="contact-phone-error" role="alert">
                            {errors.phone}
                          </p>
                        ) : null}
                      </div>

                      <div className="form-field">
                        <label htmlFor="contact-subject">What is this about?</label>
                        <select
                          id="contact-subject"
                          value={form.subject}
                          onChange={(event) => setField('subject', event.target.value)}
                        >
                          {subjectOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-field">
                      <label htmlFor="contact-message">Your message</label>
                      <textarea
                        id="contact-message"
                        rows="6"
                        placeholder="Tell us a little about what you're looking for..."
                        value={form.message}
                        onChange={(event) => setField('message', event.target.value)}
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={errors.message ? 'contact-message-error' : undefined}
                      />
                      {errors.message ? (
                        <p className="form-error" id="contact-message-error" role="alert">
                          {errors.message}
                        </p>
                      ) : null}
                    </div>

                    <button type="submit" className="btn btn-gold">
                      Send message
                      <Send size={16} aria-hidden="true" />
                    </button>
                    <p className="form-note">
                      This is a demonstration form. Your details are not stored or sent anywhere.
                    </p>
                  </form>
                </>
              )}
            </div>

            <div className="contact-side" data-animate="fade-left">
              <MapPlaceholder label={siteConfig.addressShort} className="contact-map" />

              <div className="contact-hours">
                <p className="eyebrow">Opening hours</p>
                <h2>Come by for a coffee</h2>
                <dl>
                  {siteConfig.workingHours.map((slot) => (
                    <div key={slot.days}>
                      <dt>{slot.days}</dt>
                      <dd>{slot.hours}</dd>
                    </div>
                  ))}
                </dl>
                <p className="contact-hours-note">
                  {siteConfig.address}
                  <br />
                  Visits by appointment are always welcome.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section contact-faq-section">
        <div className="container contact-faq-grid">
          <SectionHeading
            eyebrow="Good to know"
            title="Questions, answered"
            text="A few things people ask before their first conversation. If yours is not here, just ask."
          />
          <FaqAccordion items={faqs} />
        </div>
      </section>
    </>
  )
}
