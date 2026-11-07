import { useEffect } from 'react'
import siteConfig from '../config/siteConfig'

export default function useDocumentTitle(title, description = siteConfig.metaDescription) {
  useEffect(() => {
    document.title = title ? `${title} | ${siteConfig.brandName}` : `${siteConfig.brandName} | ${siteConfig.tagline}`

    const meta = document.querySelector('meta[name="description"]')
    if (meta && description) {
      meta.setAttribute('content', description)
    }
  }, [title, description])
}
