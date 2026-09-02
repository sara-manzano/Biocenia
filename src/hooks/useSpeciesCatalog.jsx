import { useMemo } from 'react'
import {
  getHabitatLabel,
  getSpeciesCatalog,
  getSupportedLanguage,
} from '../data/siteContent.jsx'

export function useSpeciesCatalog(selectedHabitat, query, language) {
  const resolvedLanguage = getSupportedLanguage(language)
  const species = useMemo(() => getSpeciesCatalog(resolvedLanguage), [resolvedLanguage])

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