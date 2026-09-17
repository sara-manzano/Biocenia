import { memo } from 'react'
import { Link } from 'react-router-dom'

const ActionLink = memo(function ActionLink({ action }) {
  const className = action.variant === 'secondary' ? 'secondary-link' : 'primary-link'

  return (
    <Link to={action.to} className={className}>
      {action.label}
    </Link>
  )
})

const PageHero = memo(function PageHero({
  eyebrow,
  title,
  description,
  actions,
  aside,
  contentClassName = '',
  titleClassName = '',
  sectionClassName = '',
  style,
}) {
  return (
    <section className={`page-hero ${sectionClassName}`.trim()} style={style}>
      <div className={contentClassName}>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className={titleClassName}>{title}</h1>
        <p className="hero-copy">{description}</p>

        {actions?.length ? (
          <div className="hero-actions">
            {actions.map((action) => (
              <ActionLink key={action.to} action={action} />
            ))}
          </div>
        ) : null}
      </div>

      {aside}
    </section>
  )
})

export default PageHero