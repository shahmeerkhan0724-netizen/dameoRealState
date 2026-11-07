import { useEffect, useState } from 'react'
import { useLenis } from '../context/SmoothScrollContext'

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  )

  useEffect(() => {
    const media = window.matchMedia(query)
    const update = () => setMatches(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [query])

  return matches
}

export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useScrollLock(locked) {
  const lenis = useLenis()

  useEffect(() => {
    if (!locked) return undefined

    const root = document.documentElement
    root.classList.add('scroll-locked')
    if (lenis) lenis.stop()

    return () => {
      root.classList.remove('scroll-locked')
      if (lenis) lenis.start()
    }
  }, [locked, lenis])
}
