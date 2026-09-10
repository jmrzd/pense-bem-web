import { useMemo } from 'react'
import { getRanking } from '../services/rankingService'

export function useRanking() {
  return useMemo(() => getRanking(), [])
}
