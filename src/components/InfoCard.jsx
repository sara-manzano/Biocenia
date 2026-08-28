import { memo } from 'react'

const InfoCard = memo(function InfoCard({ title, description, meta, tone = 'default' }) {
  const className = tone === 'accent' ? 'info-card accent' : 'info-card'

  return (
    <article className={className}>
      <div className="info-card-body">
        <h3>{title}</h3>
        <p>{description}</p>
        {meta ? <p className="card-meta">{meta}</p> : null}
      </div>
    </article>
  )
})

export default InfoCard