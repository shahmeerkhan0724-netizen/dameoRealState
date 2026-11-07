import { createContext, useContext, useEffect, useState } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../lib/gsap'

const SmoothScrollContext = createContext(null)

export function SmoothScrollProvider({ children }) {
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let instance = null
    let ticker = null

    const destroy = () => {
      if (ticker) {
        gsap.ticker.remove(ticker)
        ticker = null
      }
      if (instance) {
        instance.destroy()
        instance = null
      }
      setLenis(null)
    }

    const setup = () => {
      if (reducedMotion.matches) return

      instance = new Lenis({
        autoRaf: false,
        duration: 1.15,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.35,
        anchors: { offset: -96 },
      })

      instance.on('scroll', ScrollTrigger.update)

      ticker = (time) => instance.raf(time * 1000)
      gsap.ticker.add(ticker)
      gsap.ticker.lagSmoothing(0)
      setLenis(instance)
      ScrollTrigger.refresh()
    }

    setup()

    const onMotionPreferenceChange = () => {
      destroy()
      setup()
      ScrollTrigger.refresh()
    }

    reducedMotion.addEventListener('change', onMotionPreferenceChange)

    return () => {
      reducedMotion.removeEventListener('change', onMotionPreferenceChange)
      destroy()
    }
  }, [])

  return <SmoothScrollContext.Provider value={lenis}>{children}</SmoothScrollContext.Provider>
}

export function useLenis() {
  return useContext(SmoothScrollContext)
}
