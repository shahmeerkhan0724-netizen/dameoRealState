import { useRef, useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { gsap, useGSAP } from '../lib/gsap'
import { usePrefersReducedMotion } from '../hooks/useMotion'

function FaqItem({ faq, isOpen, onToggle, index }) {
  const panelRef = useRef(null)
  const innerRef = useRef(null)
  const reducedMotion = usePrefersReducedMotion()

  useGSAP(
    () => {
      const panel = panelRef.current
      const inner = innerRef.current
      if (!panel || !inner) return

      if (reducedMotion) {
        gsap.set(panel, { height: isOpen ? 'auto' : 0, autoAlpha: isOpen ? 1 : 0 })
        return
      }

      gsap.to(panel, {
        height: isOpen ? 'auto' : 0,
        autoAlpha: isOpen ? 1 : 0,
        duration: 0.42,
        ease: isOpen ? 'power3.out' : 'power2.inOut',
      })
    },
    { dependencies: [isOpen, reducedMotion] },
  )

  return (
    <div className={`faq-item ${isOpen ? 'is-open' : ''}`}>
      <h3>
        <button
          type="button"
          className="faq-question"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`faq-panel-${index}`}
          id={`faq-question-${index}`}
        >
          <span>{faq.question}</span>
          <span className="faq-icon" aria-hidden="true">
            {isOpen ? <Minus size={18} /> : <Plus size={18} />}
          </span>
        </button>
      </h3>
      <div
        className="faq-panel"
        id={`faq-panel-${index}`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
        ref={panelRef}
        style={{ height: 0, opacity: 0, overflow: 'hidden' }}
      >
        <div className="faq-answer" ref={innerRef}>
          <p>{faq.answer}</p>
        </div>
      </div>
    </div>
  )
}

export default function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="faq-list">
      {items.map((faq, index) => (
        <FaqItem
          key={faq.question}
          faq={faq}
          index={index}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex((current) => (current === index ? -1 : index))}
        />
      ))}
    </div>
  )
}
