import { useCallback, useMemo, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import { AppReadyContext } from './context/AppReadyContext'
import { FavouritesProvider } from './context/FavouritesContext'
import { SmoothScrollProvider } from './context/SmoothScrollContext'
import Home from './pages/Home'
import Properties from './pages/Properties'
import PropertyDetail from './pages/PropertyDetail'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function shouldShowIntro() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try {
    return window.sessionStorage.getItem('yourbrand-intro-seen') !== '1'
  } catch {
    return true
  }
}

export default function App() {
  const showIntroInitially = useMemo(shouldShowIntro, [])
  const [showIntro, setShowIntro] = useState(showIntroInitially)
  const [introDone, setIntroDone] = useState(!showIntroInitially)

  const finishIntro = useCallback(() => {
    try {
      window.sessionStorage.setItem('yourbrand-intro-seen', '1')
    } catch {
      // Session storage is optional for this demo.
    }
    setShowIntro(false)
    setIntroDone(true)
  }, [])

  return (
    <FavouritesProvider>
      <SmoothScrollProvider>
        <AppReadyContext.Provider value={introDone}>
          {showIntro ? <Preloader onComplete={finishIntro} /> : null}
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="properties" element={<Properties />} />
              <Route path="properties/:id" element={<PropertyDetail />} />
              <Route path="about" element={<About />} />
              <Route path="services" element={<Services />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          <CustomCursor />
        </AppReadyContext.Provider>
      </SmoothScrollProvider>
    </FavouritesProvider>
  )
}
