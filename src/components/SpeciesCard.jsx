import { memo } from 'react'
import { ExternalLink, Heart } from 'lucide-react'

const SpeciesCard = memo(function SpeciesCard({ species, isFavorite, onToggleFavorite }) {
  return (
    <article className="species-card">
      {species.image ? (
        <div className="species-media">
          <img src={species.image} alt={species.name} className="species-image" />
        </div>
      ) : null}

      <div className="species-card-head">
        <div className="species-card-body">
          <div className="species-status">{species.status}</div>
          <h3>{species.name}</h3>
          <p>{species.description}</p>
        </div>

        <button
          type="button"
          onClick={() => onToggleFavorite(species.id)}
          className={isFavorite ? 'favorite-button is-active' : 'favorite-button'}
          aria-pressed={isFavorite}
        >
          <Heart className="badge-icon" aria-hidden="true" />
          {isFavorite ? 'Guardada' : 'Guardar'}
        </button>
      </div>

      <div className="species-card-foot">
        <div className="species-card-tags">
          <span className="species-region">{species.region}</span>
          <p className="card-meta">{species.habitat}</p>
        </div>
        {species.sourceUrl ? (
          <a
            href={species.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="source-link"
          >
            Fuente
            <ExternalLink className="badge-icon" aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </article>
  )
})

export default SpeciesCard