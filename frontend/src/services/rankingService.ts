import type { RankingEntry } from '../types'
import { listMatches } from './matchService'

export function getRanking(): RankingEntry[] {
  const matches = listMatches()
  const byPlayer = new Map<string, RankingEntry>()

  for (const match of matches) {
    const current = byPlayer.get(match.playerId)
    if (!current) {
      byPlayer.set(match.playerId, {
        playerId: match.playerId,
        nickname: match.playerNickname,
        bestScore: match.score,
        matchCount: 1,
        lastPlayedAt: match.finishedAt,
      })
      continue
    }

    current.matchCount += 1
    current.bestScore = Math.max(current.bestScore, match.score)
    if (new Date(match.finishedAt).getTime() > new Date(current.lastPlayedAt).getTime()) {
      current.lastPlayedAt = match.finishedAt
    }
  }

  return Array.from(byPlayer.values()).sort((a, b) => b.bestScore - a.bestScore)
}

export const rankingService = { getRanking }
