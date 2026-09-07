import { Link, useParams } from 'react-router-dom'
import { useBioceniaCopy, useBioceniaLanguage } from '../../context/useBiocenia.jsx'
import { getSpeciesById } from '../../data/siteContent.jsx'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.jsx'

function withPlaybackParams(url, autoPlayEnabled) {
  if (!url) {
    return url
  }

  try {
    const resolvedUrl = new URL(url)
    resolvedUrl.searchParams.set('controls', autoPlayEnabled ? '0' : '1')

    if (autoPlayEnabled) {
      resolvedUrl.searchParams.set('autoplay', '1')
      resolvedUrl.searchParams.set('mute', '1')
      resolvedUrl.searchParams.set('playsinline', '1')
    } else {
      resolvedUrl.searchParams.delete('autoplay')
      resolvedUrl.searchParams.delete('mute')
      resolvedUrl.searchParams.delete('playsinline')
    }

    return resolvedUrl.toString()
  } catch {
    return url
  }
}

export default function SpeciesDetailPage() {
  const { speciesId } = useParams()
  const copy = useBioceniaCopy()
  const { language } = useBioceniaLanguage()
  const prefersReducedMotion = usePrefersReducedMotion()
  const species = getSpeciesById(speciesId, language)
  const sourceHref = species?.videoSourceUrl || species?.sourceUrl || ''

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
                  src={withPlaybackParams(species.videoEmbedUrl, !prefersReducedMotion)}
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
                  poster={species.image || undefined}
                  aria-label={species.name}
                  autoPlay={!prefersReducedMotion}
                  controls={prefersReducedMotion}
                  loop
                  muted
                  playsInline
                  preload="auto"
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

              <a href={sourceHref} target="_blank" rel="noreferrer" className="source-link">
                {copy.species.detail.sourceLabel}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}