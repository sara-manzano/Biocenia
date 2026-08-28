import { useCallback, useMemo, useState } from 'react'
import BioceniaContext from './biocenia-context.js'

export function BioceniaProvider({ children }) {
  const [selectedHabitat, setSelectedHabitat] = useState('Todos')
  const [favorites, setFavorites] = useState([])
  const [reservation, setReservation] = useState(null)

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

  const value = useMemo(
    () => ({
      selectedHabitat,
      setSelectedHabitat,
      favorites,
      toggleFavorite,
      reservation,
      saveReservation,
    }),
    [favorites, reservation, saveReservation, selectedHabitat, toggleFavorite],
  )

  return <BioceniaContext.Provider value={value}>{children}</BioceniaContext.Provider>
}