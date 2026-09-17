import { useEffect, useState } from 'react'
import { fetchDashboardStats } from '../services/dashboardService'
import type { DashboardStats } from '../types'

const EMPTY_STATS: DashboardStats = {
  totalPlayers: 0,
  totalMatches: 0,
  averageScore: 0,
  accuracyRate: 0,
  bestScore: 0,
  bestScoreNickname: '—',
  mostActivePlayer: '—',
  mostActivePlayerMatches: 0,
  firstAttemptHits: 0,
  secondAttemptHits: 0,
  thirdAttemptHits: 0,
  missedCount: 0,
  hardestQuestions: [],
  scoreEvolution: [],
  scoreDistribution: [
    { label: '0-15', total: 0 },
    { label: '16-30', total: 0 },
    { label: '31-45', total: 0 },
    { label: '46-60', total: 0 },
    { label: '61-75', total: 0 },
    { label: '76-90', total: 0 },
  ],
}

export function useDashboard() {
  const [stats, setStats] = useState<DashboardStats>(EMPTY_STATS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    fetchDashboardStats()
      .then((result) => {
        if (!cancelled) setStats(result)
      })
      .catch(() => {
        // API fora do ar: mostra os indicadores zerados em vez de travar a tela
        if (!cancelled) setStats(EMPTY_STATS)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return { ...stats, loading }
}
