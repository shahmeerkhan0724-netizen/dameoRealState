export default function SectionHeading({
  eyebrow,
  title,
  text,
  align = 'left',
  className = '',
  children,
}) {
  return (
    <div className={`section-heading align-${align} ${className}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      {title ? <h2>{title}</h2> : null}
      {text ? <p className="section-heading-text">{text}</p> : null}
      {children}
    </div>
  )
}
