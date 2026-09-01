import { useCallback, useEffect, useMemo, useState } from 'react'
import BioceniaContext from './biocenia-context.js'
import {
  DEFAULT_LANGUAGE,
  HABITAT_LABELS,
  getHabitatLabel,
  getHabitatOptions,
  getSiteCopy,
  getSupportedLanguage,
} from '../data/siteContent.js'

const LANGUAGE_STORAGE_KEY = 'biocenia-language'
const HABITAT_STORAGE_KEY = 'biocenia-selected-habitat'
const FAVORITES_STORAGE_KEY = 'biocenia-favorites'
const RESERVATION_STORAGE_KEY = 'biocenia-reservation'

function readStoredValue(storageKey, fallbackValue) {
  if (typeof window === 'undefined') {
    return fallbackValue
  }

  const storedValue = window.localStorage.getItem(storageKey)

  if (!storedValue) {
    return fallbackValue
  }

  try {
    return JSON.parse(storedValue)
  } catch {
    return fallbackValue
  }
}

export function BioceniaProvider({ children }) {
  const [selectedHabitat, setSelectedHabitat] = useState(() => {
    const storedHabitat = readStoredValue(HABITAT_STORAGE_KEY, 'all')
    return typeof storedHabitat === 'string' && Object.hasOwn(HABITAT_LABELS, storedHabitat)
      ? storedHabitat
      : 'all'
  })
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = readStoredValue(FAVORITES_STORAGE_KEY, [])
    return Array.isArray(storedFavorites)
      ? storedFavorites.filter((favoriteId) => typeof favoriteId === 'string')
      : []
  })
  const [reservation, setReservation] = useState(() => {
    const storedReservation = readStoredValue(RESERVATION_STORAGE_KEY, null)
    return storedReservation && typeof storedReservation === 'object' ? storedReservation : null
  })
  const [language, setLanguageState] = useState(() => {
    if (typeof window === 'undefined') {
      return DEFAULT_LANGUAGE
    }

    return getSupportedLanguage(window.localStorage.getItem(LANGUAGE_STORAGE_KEY) ?? DEFAULT_LANGUAGE)
  })

  const toggleFavorite = useCallback((speciesId) => {
    setFavorites((currentFavorites) =>
      currentFavorites.includes(speciesId)
        ? currentFavorites.filter((currentId) => currentId !== speciesId)
        : [...currentFavorites, speciesId],
    )
  }, [])

  const saveReservation = useCallback((nextReservation) => {
    setReservation(nextReservation)
  }, [])

  const setLanguage = useCallback((nextLanguage) => {
    setLanguageState(getSupportedLanguage(nextLanguage))
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
    }

    document.documentElement.lang = language
  }, [language])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(HABITAT_STORAGE_KEY, JSON.stringify(selectedHabitat))
    }
  }, [selectedHabitat])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites))
    }
  }, [favorites])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    if (reservation) {
      window.localStorage.setItem(RESERVATION_STORAGE_KEY, JSON.stringify(reservation))
      return
    }

    window.localStorage.removeItem(RESERVATION_STORAGE_KEY)
  }, [reservation])

  const copy = useMemo(() => getSiteCopy(language), [language])
  const habitatOptions = useMemo(() => getHabitatOptions(language), [language])
  const localizeHabitat = useCallback(
    (habitatId) => getHabitatLabel(habitatId, language),
    [language],
  )

  const value = useMemo(
    () => ({
      copy,
      selectedHabitat,
      setSelectedHabitat,
      favorites,
      toggleFavorite,
      reservation,
      saveReservation,
      language,
      setLanguage,
      habitatOptions,
      getHabitatLabel: localizeHabitat,
    }),
    [
      copy,
      favorites,
      habitatOptions,
      language,
      localizeHabitat,
      reservation,
      saveReservation,
      selectedHabitat,
      setLanguage,
      toggleFavorite,
    ],
  )

  return <BioceniaContext.Provider value={value}>{children}</BioceniaContext.Provider>
}