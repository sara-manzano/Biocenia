import { useDeferredValue, useMemo, useState } from 'react'
import InfoCard from '../../components/InfoCard'
import SpeciesCard from '../../components/SpeciesCard'
import { useBiocenia } from '../../context/useBiocenia.js'
import { useSpeciesCatalog } from '../../hooks/useSpeciesCatalog.js'

export default function SpeciesPage() {
  const [searchValue, setSearchValue] = useState('')
  const deferredSearch = useDeferredValue(searchValue)
  const { favorites, selectedHabitat, setSelectedHabitat, toggleFavorite } = useBiocenia()
  const { species, habitats, totalSpecies, isLoading, error } = useSpeciesCatalog(
    selectedHabitat,
    deferredSearch,
  )

  const pageSummary = useMemo(
    () => [
      {
        title: 'Fichas visibles',
        description: `${species.length} especies en pantalla`,
        meta: `El catálogo toma ${totalSpecies} referencias base y las enriquece con información pública.`,
      },
      {
        title: 'Seguimiento personal',
        description: `${favorites.length} especies apartadas`,
        meta: 'Quedan guardadas mientras comparas hábitats y cierras el recorrido.',
      },
    ],
    [favorites.length, species.length, totalSpecies],
  )

  return (
    <div className="page-stack">
      <section className="content-section">
        <div className="page-header">
          <div className="page-caption">
            <p className="eyebrow">Catálogo</p>
            <h2>Un catálogo breve, curado y útil para decidir qué vale la pena seguir</h2>
            <p>
              No intenta mostrarlo todo. Filtra rápido, conserva tus favoritas y deja cada ficha con suficiente contexto para tomar una decisión.
            </p>
          </div>
          <div className="results-badge">{species.length} resultados</div>
        </div>

        <div className="detail-grid">
          {pageSummary.map((item) => (
            <InfoCard
              key={item.title}
              title={item.title}
              description={item.description}
              meta={item.meta}
            />
          ))}
        </div>
      </section>

      <section className="content-section">
        <div className="filters-panel">
          <div className="filters-row">
            <label className="field-label" htmlFor="species-search">
              Buscar por nombre, región o estado
              <input
                id="species-search"
                className="field"
                type="search"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Jaguar, arrecife, vulnerable..."
              />
            </label>

            <label className="field-label" htmlFor="habitat-filter">
              Hábitat seleccionado
              <select
                id="habitat-filter"
                className="field-select"
                value={selectedHabitat}
                onChange={(event) => setSelectedHabitat(event.target.value)}
              >
                {habitats.map((habitat) => (
                  <option key={habitat} value={habitat}>
                    {habitat}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="chip-row" aria-label="Filtros rápidos por hábitat">
            {habitats.map((habitat) => (
              <button
                key={habitat}
                type="button"
                onClick={() => setSelectedHabitat(habitat)}
                className={selectedHabitat === habitat ? 'chip-button is-active' : 'chip-button'}
              >
                {habitat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section">
        {isLoading ? <div className="inline-note">Cargando especies...</div> : null}
        {error ? <div className="form-feedback is-error">{error}</div> : null}
        {!isLoading && !error && species.length === 0 ? (
          <div className="empty-state">
            <p className="eyebrow">Sin resultados</p>
            <h3>No aparece ninguna ficha con ese cruce</h3>
            <p>Prueba con un hábitat más amplio o una palabra menos específica.</p>
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
    </div>
  )
}