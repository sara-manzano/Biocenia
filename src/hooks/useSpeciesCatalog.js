import { useEffect, useMemo, useState } from 'react'
import { speciesCatalogSources } from '../data/siteContent.js'

const WIKIPEDIA_SUMMARY_ENDPOINT = 'https://en.wikipedia.org/api/rest_v1/page/summary/'

export function useSpeciesCatalog(selectedHabitat, query) {
  const [species, setSpecies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true
    const controller = new AbortController()

    async function loadSpecies() {
      setIsLoading(true)
      setError('')

      try {
        const responses = await Promise.allSettled(
          speciesCatalogSources.map(async (source) => {
            const response = await fetch(
              `${WIKIPEDIA_SUMMARY_ENDPOINT}${encodeURIComponent(source.wikipediaTitle)}`,
              { signal: controller.signal },
            )

            if (!response.ok) {
              throw new Error(`No fue posible cargar ${source.name}.`)
            }

            const data = await response.json()

            return {
              id: source.id,
              name: source.name,
              habitat: source.habitat,
              status: source.status,
              región: source.region,
              description: data.extract ?? source.fallbackDescription,
              image: data.thumbnail?.source ?? '',
              sourceUrl: data.content_urls?.desktop?.page ?? '',
            }
          }),
        )

        const data = responses
          .filter((result) => result.status === 'fulfilled')
          .map((result) => result.value)

        if (data.length === 0) {
          throw new Error('No fue posible cargar el catálogo.')
        }

        if (isActive) {
          setSpecies(data)
        }
      } catch (loadError) {
        if (loadError.name !== 'AbortError' && isActive) {
          setError('No se pudo cargar el catálogo desde la API pública.')
          setSpecies([])
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    loadSpecies()

    return () => {
      isActive = false
      controller.abort()
    }
  }, [])

  const habitats = useMemo(
    () => ['Todos', ...new Set(species.map((item) => item.habitat))],
    [species],
  )

  const normalizedQuery = query.trim().toLowerCase()

  const filteredSpecies = useMemo(
    () =>
      species.filter((item) => {
        const matchesHabitat = selectedHabitat === 'Todos' || item.habitat === selectedHabitat
        const matchesQuery =
          normalizedQuery.length === 0 ||
          `${item.name} ${item.región} ${item.status}`.toLowerCase().includes(normalizedQuery)

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