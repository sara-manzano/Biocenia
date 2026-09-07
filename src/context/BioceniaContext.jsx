import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  BioceniaCopyContext,
  BioceniaFavoritesContext,
  BioceniaHabitatContext,
  BioceniaLanguageContext,
  BioceniaReservationContext,
} from './biocenia-context.jsx'
import {
  DEFAULT_LANGUAGE,
  HABITAT_LABELS,
  getHabitatLabel,
  getSiteCopy,
  getSupportedLanguage,
} from '../data/siteContent.jsx'

const STORAGE_KEYS = {
  LANGUAGE: 'biocenia-language',
  HABITAT: 'biocenia-selected-habitat',
  FAVORITES: 'biocenia-favorites',
  RESERVATION: 'biocenia-reservation',
}

const DEFAULT_HABITAT = 'all'

function normalizeHabitatSelection(habitatId) {
  return typeof habitatId === 'string' && Object.hasOwn(HABITAT_LABELS, habitatId)
    ? habitatId
    : DEFAULT_HABITAT
}

function normalizeFavorites(favorites) {
  return Array.isArray(favorites)
    ? [...new Set(favorites.filter((favoriteId) => typeof favoriteId === 'string'))]
    : []
}

function normalizeReservation(reservation) {
  if (!reservation || typeof reservation !== 'object' || Array.isArray(reservation)) {
    return null
  }

  const { name, email, date, visitors, notes, habitatId, reference, createdAt } = reservation

  const cleanName = typeof name === 'string' ? name.trim() : ''
  const cleanEmail = typeof email === 'string' ? email.trim() : ''
  const cleanDate = typeof date === 'string' ? date : ''

  if (!cleanName || !cleanEmail || !cleanDate) {
    return null
  }

  return {
    name: cleanName,
    email: cleanEmail,
    date: cleanDate,
    visitors: typeof visitors === 'string' || typeof visitors === 'number' ? String(visitors) : '',
    notes: typeof notes === 'string' ? notes.trim() : '',
    habitatId: normalizeHabitatSelection(habitatId),
    reference: typeof reference === 'string' ? reference : '',
    createdAt: typeof createdAt === 'string' ? createdAt : '',
  }
}

function readStoredValue(storageKey, fallbackValue) {
  if (typeof window === 'undefined') {
    return fallbackValue
  }

  try {
    const storedValue = window.localStorage.getItem(storageKey)

    if (!storedValue) {
      return fallbackValue
    }

    return JSON.parse(storedValue)
  } catch {
    return fallbackValue
  }
}

function writeStoredValue(storageKey, value) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(storageKey, JSON.stringify(value))
  } catch (error) {
    console.error(`Error guardando ${storageKey} en localStorage:`, error)
  }
}

function removeStoredValue(storageKey) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.removeItem(storageKey)
  } catch (error) {
    console.error(`Error eliminando ${storageKey} de localStorage:`, error)
  }
}

export function BioceniaProvider({ children }) {
  const [selectedHabitat, setSelectedHabitat] = useState(() => {
    const storedHabitat = readStoredValue(STORAGE_KEYS.HABITAT, DEFAULT_HABITAT)
    return normalizeHabitatSelection(storedHabitat)
  })
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = readStoredValue(STORAGE_KEYS.FAVORITES, [])
    return normalizeFavorites(storedFavorites)
  })
  const [reservation, setReservation] = useState(() => {
    const storedReservation = readStoredValue(STORAGE_KEYS.RESERVATION, null)
    return normalizeReservation(storedReservation)
  })
  const [language, setLanguageState] = useState(() => {
    if (typeof window === 'undefined') {
      return DEFAULT_LANGUAGE
    }

    return getSupportedLanguage(window.localStorage.getItem(STORAGE_KEYS.LANGUAGE) ?? DEFAULT_LANGUAGE)
  })

  const toggleFavorite = useCallback((speciesId) => {
    if (typeof speciesId !== 'string' || speciesId.length === 0) {
      return
    }

    setFavorites((currentFavorites) =>
      currentFavorites.includes(speciesId)
        ? currentFavorites.filter((currentId) => currentId !== speciesId)
        : [...currentFavorites, speciesId],
    )
  }, [])

  const saveReservation = useCallback((nextReservation) => {
    setReservation(normalizeReservation(nextReservation))
  }, [])

  const setLanguage = useCallback((nextLanguage) => {
    setLanguageState(getSupportedLanguage(nextLanguage))
  }, [])

  const updateSelectedHabitat = useCallback((nextHabitat) => {
    setSelectedHabitat(normalizeHabitatSelection(nextHabitat))
  }, [])

  useEffect(() => {
    writeStoredValue(STORAGE_KEYS.LANGUAGE, language)
    document.documentElement.lang = language
  }, [language])

  useEffect(() => {
    writeStoredValue(STORAGE_KEYS.HABITAT, selectedHabitat)
  }, [selectedHabitat])

  useEffect(() => {
    writeStoredValue(STORAGE_KEYS.FAVORITES, favorites)
  }, [favorites])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    if (reservation) {
      writeStoredValue(STORAGE_KEYS.RESERVATION, reservation)
      return
    }

    removeStoredValue(STORAGE_KEYS.RESERVATION)
  }, [reservation])

  const copy = useMemo(() => getSiteCopy(language), [language])
  const localizeHabitat = useCallback(
    (habitatId) => getHabitatLabel(habitatId, language),
    [language],
  )

  const habitatValue = useMemo(
    () => ({
      selectedHabitat,
      setSelectedHabitat: updateSelectedHabitat,
      getHabitatLabel: localizeHabitat,
    }),
    [localizeHabitat, selectedHabitat, updateSelectedHabitat],
  )

  const favoritesValue = useMemo(
    () => ({
      favorites,
      toggleFavorite,
    }),
    [favorites, toggleFavorite],
  )

  const reservationValue = useMemo(
    () => ({
      reservation,
      saveReservation,
    }),
    [reservation, saveReservation],
  )

  const languageValue = useMemo(
    () => ({
      language,
      setLanguage,
    }),
    [language, setLanguage],
  )

  return (
    <BioceniaLanguageContext.Provider value={languageValue}>
      <BioceniaCopyContext.Provider value={copy}>
        <BioceniaHabitatContext.Provider value={habitatValue}>
          <BioceniaFavoritesContext.Provider value={favoritesValue}>
            <BioceniaReservationContext.Provider value={reservationValue}>{children}</BioceniaReservationContext.Provider>
          </BioceniaFavoritesContext.Provider>
        </BioceniaHabitatContext.Provider>
      </BioceniaCopyContext.Provider>
    </BioceniaLanguageContext.Provider>
  )
}