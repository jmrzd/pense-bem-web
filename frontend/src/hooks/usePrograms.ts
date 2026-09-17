import { useEffect, useState } from 'react'
import { fetchPrograms } from '../services/programService'
import type { Program } from '../types'

export function usePrograms() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetchPrograms()
      .then((result) => {
        if (!cancelled) setPrograms(result)
      })
      .catch(() => {
        if (!cancelled) setError('Não foi possível carregar os programas.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return { programs, loading, error }
}
