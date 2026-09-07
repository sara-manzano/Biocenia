import { memo } from 'react'
import { ExternalLink, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useBioceniaCopy } from '../context/useBiocenia.jsx'

const SpeciesCard = memo(function SpeciesCard({ species, isFavorite, onToggleFavorite }) {
  const copy = useBioceniaCopy()
  const sourceHref = species.videoSourceUrl || species.sourceUrl

  return (
    <article
      className={[
        'species-card',
        species.image ? 'has-species-image' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <button
        type="button"
        onClick={() => onToggleFavorite(species.id)}
        className={isFavorite ? 'favorite-button favorite-button--icon favorite-button--corner is-active' : 'favorite-button favorite-button--icon favorite-button--corner'}
        aria-pressed={isFavorite}
        aria-label={isFavorite ? copy.species.saved : copy.species.save}
        title={isFavorite ? copy.species.saved : copy.species.save}
      >
        <Heart className="favorite-button-icon" fill="currentColor" aria-hidden="true" />
      </button>

      {species.image ? (
        <div className="species-media">
          <img
            src={species.image}
            alt={species.name}
            className="species-image"
            style={{ objectPosition: species.imagePosition }}
            loading="lazy"
          />
        </div>
      ) : null}

      <div className="species-card-head">
        <div className="species-card-body">
          <div className="species-card-meta-row">
            <div className="species-status">{species.status}</div>
            <span className="species-region">{species.region}</span>
          </div>
          <h3>{species.name}</h3>
          <p>{species.description}</p>
        </div>
      </div>

      <div className="species-card-foot">
        <div className="species-card-tags">
          <p className="card-meta">{species.habitat}</p>
        </div>
        <div className="species-card-actions">
          <Link to={`/species/${species.id}`} className="secondary-link species-card-action detail-hub-link">
            {copy.species.detailHub.action}
          </Link>
          {sourceHref ? (
            <a
              href={sourceHref}
              target="_blank"
              rel="noreferrer"
              className="secondary-link species-card-action source-link"
            >
              {copy.species.source}
              <ExternalLink className="badge-icon" aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  )
})

export default SpeciesCard