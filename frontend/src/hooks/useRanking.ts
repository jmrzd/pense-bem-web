import { useEffect, useState } from 'react'
import { fetchRanking } from '../services/rankingService'
import type { RankingEntry } from '../types'

export function useRanking() {
  const [ranking, setRanking] = useState<RankingEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    fetchRanking()
      .then((result) => {
        if (!cancelled) setRanking(result)
      })
      .catch(() => {
        // se a API estiver fora do ar, mostra o ranking vazio em vez de travar a tela
        if (!cancelled) setRanking([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return { ranking, loading }
}
