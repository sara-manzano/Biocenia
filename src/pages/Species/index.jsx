import { Compass, Search, Sparkles } from 'lucide-react'
import { useDeferredValue, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import InfoCard from '../../components/InfoCard'
import SpeciesCard from '../../components/SpeciesCard'
import { useBiocenia } from '../../context/useBiocenia.jsx'
import { getEditorialVideos } from '../../data/siteContent.jsx'
import { useSpeciesCatalog } from '../../hooks/useSpeciesCatalog.jsx'

export default function SpeciesPage() {
  const [searchValue, setSearchValue] = useState('')
  const deferredSearch = useDeferredValue(searchValue)
  const { copy, favorites, language, selectedHabitat, setSelectedHabitat, toggleFavorite } = useBiocenia()
  const { wildlife } = getEditorialVideos()
  const { species, habitats, totalSpecies, isLoading, error } = useSpeciesCatalog(
    selectedHabitat,
    deferredSearch,
    language,
  )

  const pageSummary = useMemo(
    () => [
      {
        title: copy.species.visibleCards,
        description: copy.species.visibleCardsDescription(species.length),
        meta: copy.species.visibleCardsMeta(totalSpecies),
      },
      {
        title: copy.species.personalTracking,
        description: copy.species.personalTrackingDescription(favorites.length),
        meta: copy.species.personalTrackingMeta,
      },
    ],
    [copy.species, favorites.length, species.length, totalSpecies],
  )

  return (
    <div className="page-stack">
      <section className="content-section species-hero-shell">
        <div className="species-hero-card">
          <div className="page-header species-page-header">
            <div className="page-caption species-page-caption">
              <p className="eyebrow">{copy.species.eyebrow}</p>
              <h2>{copy.species.title}</h2>
              <p>{copy.species.description}</p>
            </div>
            <div className="results-badge species-results-badge">{copy.species.results(species.length)}</div>
          </div>

          <div className="species-summary-grid">
            {pageSummary.map((item) => (
              <InfoCard
                key={item.title}
                title={item.title}
                description={item.description}
                meta={item.meta}
              />
            ))}

            <div className="species-summary-panel">
              <span className="visit-kicker species-kicker">
                <Sparkles aria-hidden="true" />
                {copy.species.quickFilters}
              </span>
              <div className="species-summary-list">
                <div className="species-summary-item">
                  <Search aria-hidden="true" />
                  <span>{searchValue.trim() || copy.species.searchPlaceholder}</span>
                </div>
                <div className="species-summary-item">
                  <Compass aria-hidden="true" />
                  <span>{habitats.find((habitat) => habitat.id === selectedHabitat)?.label ?? habitats[0]?.label}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="species-overview-video">
            <div className="species-overview-copy">
              <p className="eyebrow">{copy.species.overviewVideo.eyebrow}</p>
              <h3>{copy.species.overviewVideo.title}</h3>
              <p>{copy.species.overviewVideo.description}</p>
              <a href={wildlife.sourceUrl} target="_blank" rel="noreferrer" className="source-link">
                {copy.species.overviewVideo.sourceLabel}
              </a>
            </div>

            <div className="species-overview-shell">
              <video
                className="editorial-video-player"
                src={wildlife.videoUrl}
                controls
                preload="metadata"
                playsInline
              />
            </div>
          </div>
        </div>
      </section>

      <section className="content-section species-controls-section">
        <div className="filters-panel">
          <div className="panel-heading species-controls-heading">
            <p className="eyebrow">{copy.species.quickFilters}</p>
            <h3>{copy.species.habitatLabel}</h3>
          </div>

          <div className="filters-row">
            <label className="field-label" htmlFor="species-search">
              {copy.species.searchLabel}
              <input
                id="species-search"
                className="field"
                type="search"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder={copy.species.searchPlaceholder}
              />
            </label>

            <label className="field-label" htmlFor="habitat-filter">
              {copy.species.habitatLabel}
              <select
                id="habitat-filter"
                className="field-select"
                value={selectedHabitat}
                onChange={(event) => setSelectedHabitat(event.target.value)}
              >
                {habitats.map((habitat) => (
                  <option key={habitat.id} value={habitat.id}>
                    {habitat.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="chip-row" aria-label={copy.species.quickFilters}>
            {habitats.map((habitat) => (
              <button
                key={habitat.id}
                type="button"
                onClick={() => setSelectedHabitat(habitat.id)}
                className={selectedHabitat === habitat.id ? 'chip-button is-active' : 'chip-button'}
              >
                {habitat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section species-catalog-section">
        {isLoading ? <div className="inline-note">{copy.species.loading}</div> : null}
        {error ? <div className="form-feedback is-error">{error}</div> : null}
        {!isLoading && !error && species.length === 0 ? (
          <div className="empty-state">
            <p className="eyebrow">{copy.species.emptyEyebrow}</p>
            <h3>{copy.species.emptyTitle}</h3>
            <p>{copy.species.emptyDescription}</p>
          </div>
        ) : null}

        <div className="species-grid">
          {species.map((item) => (
            <SpeciesCard
              key={item.id}
              species={item}
              isFavorite={favorites.includes(item.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </section>

      <section className="content-section detail-hub-section">
        <div className="section-heading detail-hub-heading">
          <p className="eyebrow">{copy.species.detailHub.eyebrow}</p>
          <h2>{copy.species.detailHub.title}</h2>
          <p>{copy.species.detailHub.description}</p>
        </div>

        <div className="detail-hub-grid">
          {species.map((item) => (
            <article key={item.id} className="detail-hub-card">
              <div>
                <div className="species-card-meta-row">
                  <div className="species-status">{item.status}</div>
                  <span className="species-region">{item.region}</span>
                </div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>

              <Link className="secondary-link detail-hub-link" to={`/species/${item.id}`}>
                {copy.species.detailHub.action}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}