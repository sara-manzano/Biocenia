import { memo } from 'react'

const InfoCard = memo(function InfoCard({ title, description, meta, tone = 'default', image, imageAlt }) {
  const className = tone === 'accent' ? 'info-card accent' : 'info-card'

  return (
    <article className={className}>
      {image ? (
        <div className="info-card-media">
          <img src={image} alt={imageAlt ?? title} className="info-card-image" />
        </div>
      ) : null}

      <div className="info-card-body">
        <h3>{title}</h3>
        <p>{description}</p>
        {meta ? <p className="card-meta">{meta}</p> : null}
      </div>
    </article>
  )
})

export default InfoCard