import { Link } from 'react-router-dom'

function ActionLink({ action }) {
  const className = action.variant === 'secondary' ? 'secondary-link' : 'primary-link'

  return (
    <Link to={action.to} className={className}>
      {action.label}
    </Link>
  )
}

export default function PageHero({ eyebrow, title, description, actions, aside }) {
  return (
    <section className="page-hero">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
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
}