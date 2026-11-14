import { useEffect } from 'react'
import siteConfig from '../config/siteConfig'

/**
 * Keeps the document title and the primary social/SEO metadata in sync
 * with the current route. `title` may be omitted for the homepage, which
 * uses the full configured site title.
 */
export default function useDocumentTitle(title, description = siteConfig.metaDescription) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${siteConfig.brandName}` : siteConfig.title
    document.title = fullTitle

    const setMeta = (selector, attribute, value) => {
      const node = document.querySelector(selector)
      if (node && value) node.setAttribute(attribute, value)
    }

    setMeta('meta[name="description"]', 'content', description)
    setMeta('meta[property="og:title"]', 'content', fullTitle)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[name="twitter:title"]', 'content', fullTitle)
    setMeta('meta[name="twitter:description"]', 'content', description)
  }, [title, description])
}
