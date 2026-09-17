import { api } from '../lib/api'
import type { RankingEntry } from '../types'

interface RankingEntryDto {
  player_id: number
  nickname: string
  best_score: number
  match_count: number
  last_played_at: string
}

export async function fetchRanking(): Promise<RankingEntry[]> {
  const dtos = await api.get<RankingEntryDto[]>('/ranking')
  return dtos.map((dto) => ({
    playerId: String(dto.player_id),
    nickname: dto.nickname,
    bestScore: dto.best_score,
    matchCount: dto.match_count,
    lastPlayedAt: dto.last_played_at,
  }))
}
