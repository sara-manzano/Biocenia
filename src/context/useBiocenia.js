import { useContext } from 'react'
import BioceniaContext from './biocenia-context.js'

export function useBiocenia() {
  const context = useContext(BioceniaContext)

  if (!context) {
    throw new Error('useBiocenia debe utilizarse dentro de BioceniaProvider')
  }

  return context
}