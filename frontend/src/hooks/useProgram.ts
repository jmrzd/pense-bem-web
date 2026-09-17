import { useEffect, useState } from 'react'
import { fetchProgramWithQuestions } from '../services/programService'
import type { Program } from '../types'

export function useProgram(code: string | undefined) {
  const [program, setProgram] = useState<Program | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!code) {
      setLoading(false)
      return
    }
    let cancelled = false
    setLoading(true)
    setError(null)
    fetchProgramWithQuestions(code)
      .then((result) => {
        if (!cancelled) setProgram(result)
      })
      .catch(() => {
        if (!cancelled) setError('Não foi possível carregar esse programa.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [code])

  return { program, loading, error }
}
