import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import siteConfig from '../config/siteConfig'

const FavouritesContext = createContext(null)

function readStoredFavourites() {
  try {
    const stored = window.localStorage.getItem(siteConfig.storageKey)
    const parsed = stored ? JSON.parse(stored) : []
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : []
  } catch {
    return []
  }
}

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState(readStoredFavourites)

  useEffect(() => {
    try {
      window.localStorage.setItem(siteConfig.storageKey, JSON.stringify(favourites))
    } catch {
      // The demo still works when storage is unavailable.
    }
  }, [favourites])

  const toggleFavourite = useCallback((id) => {
    setFavourites((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }, [])

  const isFavourite = useCallback(
    (id) => favourites.includes(id),
    [favourites],
  )

  const value = useMemo(
    () => ({
      favourites,
      count: favourites.length,
      toggleFavourite,
      isFavourite,
    }),
    [favourites, toggleFavourite, isFavourite],
  )

  return <FavouritesContext.Provider value={value}>{children}</FavouritesContext.Provider>
}

export function useFavourites() {
  const context = useContext(FavouritesContext)
  if (!context) {
    throw new Error('useFavourites must be used inside FavouritesProvider')
  }
  return context
}
