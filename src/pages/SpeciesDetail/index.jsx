import { Link, useParams } from 'react-router-dom'
import { useBiocenia } from '../../context/useBiocenia.jsx'
import { getSpeciesById } from '../../data/siteContent.jsx'

export default function SpeciesDetailPage() {
  const { speciesId } = useParams()
  const { copy, language } = useBiocenia()
  const species = getSpeciesById(speciesId, language)

  if (!species) {
    return (
      <div className="page-stack">
        <section className="content-section detail-page-section">
          <div className="empty-state">
            <p className="eyebrow">{copy.notFound.title}</p>
            <h2>{copy.notFound.description}</h2>
            <Link className="primary-link" to="/species">
              {copy.species.detail.back}
            </Link>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="page-stack">
      <section className="content-section detail-page-section">
        <div className="detail-page-card">
          <div className="page-header detail-page-header">
            <div className="page-caption detail-page-caption">
              <p className="eyebrow">{copy.species.detail.eyebrow}</p>
              <h2>{species.name}</h2>
              <p>{species.description}</p>
            </div>

            <Link className="secondary-link" to="/species">
              {copy.species.detail.back}
            </Link>
          </div>

          <div className="detail-page-grid">
            <div className="detail-media-shell">
              {species.videoEmbedUrl ? (
                <iframe
                  src={species.videoEmbedUrl}
                  title={species.name}
                  className="detail-video-frame"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : species.videoUrl ? (
                <video
                  className="detail-video-frame"
                  src={species.videoUrl}
                  controls
                  preload="metadata"
                  playsInline
                />
              ) : species.image ? (
                <img
                  src={species.image}
                  alt={species.name}
                  className="detail-image"
                  style={{ objectPosition: species.imagePosition }}
                />
              ) : null}
            </div>

            <div className="detail-aside">
              <div className="detail-meta-list">
                <div className="summary-item">
                  <span>{copy.species.habitatLabel}</span>
                  <strong>{species.habitat}</strong>
                </div>
                <div className="summary-item">
                  <span>{copy.species.statusLabel}</span>
                  <strong>{species.status}</strong>
                </div>
                <div className="summary-item">
                  <span>{copy.species.regionLabel}</span>
                  <strong>{species.region}</strong>
                </div>
              </div>

              {!species.videoUrl && !species.videoEmbedUrl ? (
                <div className="inline-note detail-note">
                  <strong>{copy.species.detail.noVideo}</strong>
                  <p>{copy.species.detail.noVideoDescription}</p>
                </div>
              ) : null}

              <a href={species.sourceUrl} target="_blank" rel="noreferrer" className="source-link">
                {copy.species.detail.sourceLabel}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}