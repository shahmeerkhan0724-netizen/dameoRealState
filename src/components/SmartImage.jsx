import { useEffect, useState } from 'react'
import { House } from 'lucide-react'

export default function SmartImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  loading = 'lazy',
  sizes = '(max-width: 768px) 100vw, 50vw',
}) {
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setFailed(false)
  }, [src])

  if (failed) {
    return (
      <span
        className={`smart-image is-fallback ${className}`}
        role="img"
        aria-label={alt || 'Property image placeholder'}
      >
        <span className="smart-image-fallback" aria-hidden="true">
          <House size={34} strokeWidth={1.4} />
        </span>
      </span>
    )
  }

  return (
    <span className={`smart-image ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        sizes={sizes}
        className={imgClassName}
        onError={() => setFailed(true)}
      />
    </span>
  )
}
