import { memo } from 'react'
import { ExternalLink, Heart } from 'lucide-react'
import { useBiocenia } from '../context/useBiocenia.jsx'

const SpeciesCard = memo(function SpeciesCard({ species, isFavorite, onToggleFavorite }) {
  const { copy } = useBiocenia()

  return (
    <article className={species.image ? 'species-card has-species-image' : 'species-card'}>
      {species.image ? (
        <div className="species-media">
          <img
            src={species.image}
            alt={species.name}
            className="species-image"
            style={{ objectPosition: species.imagePosition }}
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

        <button
          type="button"
          onClick={() => onToggleFavorite(species.id)}
          className={isFavorite ? 'favorite-button is-active' : 'favorite-button'}
          aria-pressed={isFavorite}
        >
          <Heart className="badge-icon" aria-hidden="true" />
          {isFavorite ? copy.species.saved : copy.species.save}
        </button>
      </div>

      <div className="species-card-foot">
        <div className="species-card-tags">
          <p className="card-meta">{species.habitat}</p>
        </div>
        {species.sourceUrl ? (
          <a
            href={species.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="source-link"
          >
            {copy.species.source}
            <ExternalLink className="badge-icon" aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </article>
  )
})

export default SpeciesCard