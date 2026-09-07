import { useContext } from 'react'
import {
  BioceniaCopyContext,
  BioceniaFavoritesContext,
  BioceniaHabitatContext,
  BioceniaLanguageContext,
  BioceniaReservationContext,
} from './biocenia-context.jsx'

function useRequiredContext(context, hookName) {
  const value = useContext(context)

  if (!value) {
    throw new Error(`${hookName} debe utilizarse dentro de BioceniaProvider`)
  }

  return value
}

export function useBioceniaCopy() {
  return useRequiredContext(BioceniaCopyContext, 'useBioceniaCopy')
}

export function useBioceniaHabitat() {
  return useRequiredContext(BioceniaHabitatContext, 'useBioceniaHabitat')
}

export function useBioceniaFavorites() {
  return useRequiredContext(BioceniaFavoritesContext, 'useBioceniaFavorites')
}

export function useBioceniaReservation() {
  return useRequiredContext(BioceniaReservationContext, 'useBioceniaReservation')
}

export function useBioceniaLanguage() {
  return useRequiredContext(BioceniaLanguageContext, 'useBioceniaLanguage')
}