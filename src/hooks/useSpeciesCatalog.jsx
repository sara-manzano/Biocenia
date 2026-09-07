import { useEffect, useMemo, useState } from 'react'
import {
  getHabitatLabel,
  getSpeciesCatalog,
  getSupportedLanguage,
  localizeSpeciesCatalogEntries,
} from '../data/siteContent.jsx'

const SPECIES_CATALOG_ENDPOINT = '/api/species-catalog.json'

export function useSpeciesCatalogData(language) {
  const resolvedLanguage = getSupportedLanguage(language)
  const [catalogEntries, setCatalogEntries] = useState(null)
  const [hasFetchError, setHasFetchError] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    let isActive = true

    async function loadSpeciesCatalog() {
      setHasFetchError(false)

      try {
        const response = await fetch(SPECIES_CATALOG_ENDPOINT, { signal: controller.signal })

        if (!response.ok) {
          throw new Error(`Species catalog request failed with status ${response.status}`)
        }

        const payload = await response.json()

        if (!Array.isArray(payload)) {
          throw new Error('Species catalog payload must be an array')
        }

        if (!isActive) {
          return
        }

        setCatalogEntries(payload)
      } catch (error) {
        if (!isActive || error.name === 'AbortError') {
          return
        }

        setHasFetchError(true)
        setCatalogEntries(null)
      }
    }

    loadSpeciesCatalog()

    return () => {
      isActive = false
      controller.abort()
    }
  }, [])

  const species = useMemo(
    () => (catalogEntries !== null
      ? localizeSpeciesCatalogEntries(catalogEntries, resolvedLanguage)
      : getSpeciesCatalog(resolvedLanguage)),
    [catalogEntries, resolvedLanguage],
  )

  return {
    species,
    isLoading: catalogEntries === null && !hasFetchError,
    error: hasFetchError ? 'catalog-fetch-failed' : '',
  }
}

export function useSpeciesCatalog(selectedHabitat, query, language) {
  const resolvedLanguage = getSupportedLanguage(language)
  const { species, isLoading, error } = useSpeciesCatalogData(language)

  const normalizedQuery = useMemo(() => query.trim().toLowerCase(), [query])

  const habitats = useMemo(
    () => [
      { id: 'all', label: getHabitatLabel('all', resolvedLanguage) },
      ...[...new Set(species.map((item) => item.habitatId))].map((habitatId) => ({
        id: habitatId,
        label: getHabitatLabel(habitatId, resolvedLanguage),
      })),
    ],
    [resolvedLanguage, species],
  )

  const filteredSpecies = useMemo(
    () =>
      species.filter((item) => {
        const matchesHabitat = selectedHabitat === 'all' || item.habitatId === selectedHabitat
        const matchesQuery =
          normalizedQuery.length === 0 ||
          `${item.name} ${item.region} ${item.status} ${item.habitat}`
            .toLowerCase()
            .includes(normalizedQuery)

        return matchesHabitat && matchesQuery
      }),
    [normalizedQuery, selectedHabitat, species],
  )

  return {
    species: filteredSpecies,
    habitats,
    totalSpecies: species.length,
    isLoading,
    error,
  }
}