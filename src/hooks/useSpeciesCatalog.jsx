import { useMemo } from 'react'
import {
  DEFAULT_LANGUAGE,
  getHabitatLabel,
  getSupportedLanguage,
  speciesCatalogSources,
} from '../data/siteContent.jsx'

export function useSpeciesCatalog(selectedHabitat, query, language) {
  const resolvedLanguage = getSupportedLanguage(language)
  const species = useMemo(
    () =>
      speciesCatalogSources.map((source) => ({
        id: source.id,
        name: source.name[resolvedLanguage] ?? source.name[DEFAULT_LANGUAGE],
        habitatId: source.habitatId,
        habitat: getHabitatLabel(source.habitatId, resolvedLanguage),
        status: source.status[resolvedLanguage] ?? source.status[DEFAULT_LANGUAGE],
        region: source.region[resolvedLanguage] ?? source.region[DEFAULT_LANGUAGE],
        description:
          source.fallbackDescription[resolvedLanguage] ??
          source.fallbackDescription[DEFAULT_LANGUAGE] ??
          '',
        image: source.image ?? '',
        sourceUrl: source.sourceUrl ?? `https://en.wikipedia.org/wiki/${source.wikipediaTitle}`,
      })),
    [resolvedLanguage],
  )

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

  const normalizedQuery = query.trim().toLowerCase()

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
    isLoading: false,
    error: '',
  }
}