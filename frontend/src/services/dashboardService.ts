import type { DashboardStats } from '../types'
import { listMatches } from './matchService'

const SCORE_BUCKETS = [
  { label: '0-15', min: 0, max: 15 },
  { label: '16-30', min: 16, max: 30 },
  { label: '31-45', min: 31, max: 45 },
  { label: '46-60', min: 46, max: 60 },
  { label: '61-75', min: 61, max: 75 },
  { label: '76-90', min: 76, max: 90 },
]

export function getDashboardStats(): DashboardStats {
  const matches = listMatches()

  if (matches.length === 0) {
    return {
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
      scoreDistribution: SCORE_BUCKETS.map((b) => ({ label: b.label, total: 0 })),
    }
  }

  const playerIds = new Set(matches.map((m) => m.playerId))
  const totalScore = matches.reduce((acc, m) => acc + m.score, 0)

  let firstAttemptHits = 0
  let secondAttemptHits = 0
  let thirdAttemptHits = 0
  let missedCount = 0
  let totalQuestions = 0
  let correctQuestions = 0

  const questionMissStats = new Map<string, { prompt: string; programName: string; misses: number; total: number }>()

  const matchesPerPlayer = new Map<string, number>()

  for (const match of matches) {
    matchesPerPlayer.set(match.playerId, (matchesPerPlayer.get(match.playerId) ?? 0) + 1)

    for (const answer of match.answers) {
      totalQuestions += 1
      if (answer.solved) correctQuestions += 1

      const questionKey = `${match.programId}:${answer.questionId}`
      const stats = questionMissStats.get(questionKey) ?? {
        prompt: answer.prompt,
        programName: match.programName,
        misses: 0,
        total: 0,
      }
      stats.total += 1

      const lastAttempt = answer.attempts[answer.attempts.length - 1]
      if (!answer.solved) {
        missedCount += 1
        stats.misses += 1
      } else if (lastAttempt.attemptNumber === 1) {
        firstAttemptHits += 1
      } else if (lastAttempt.attemptNumber === 2) {
        secondAttemptHits += 1
      } else if (lastAttempt.attemptNumber === 3) {
        thirdAttemptHits += 1
      }

      questionMissStats.set(questionKey, stats)
    }
  }

  const bestMatch = matches.reduce((best, m) => (m.score > best.score ? m : best), matches[0])

  const [mostActivePlayerId, mostActivePlayerMatches] = Array.from(matchesPerPlayer.entries()).sort(
    (a, b) => b[1] - a[1],
  )[0]
  const mostActivePlayerNickname =
    matches.find((m) => m.playerId === mostActivePlayerId)?.playerNickname ?? '—'

  const hardestQuestions = Array.from(questionMissStats.values())
    .filter((q) => q.total >= 1)
    .map((q) => ({ prompt: q.prompt, programName: q.programName, missRate: Math.round((q.misses / q.total) * 100) }))
    .sort((a, b) => b.missRate - a.missRate)
    .slice(0, 5)

  const sortedByDate = [...matches].sort(
    (a, b) => new Date(a.finishedAt).getTime() - new Date(b.finishedAt).getTime(),
  )
  const scoreEvolution = sortedByDate.slice(-15).map((m, index) => ({
    matchLabel: `#${index + 1}`,
    score: m.score,
    nickname: m.playerNickname,
  }))

  const scoreDistribution = SCORE_BUCKETS.map((bucket) => ({
    label: bucket.label,
    total: matches.filter((m) => m.score >= bucket.min && m.score <= bucket.max).length,
  }))

  return {
    totalPlayers: playerIds.size,
    totalMatches: matches.length,
    averageScore: Math.round((totalScore / matches.length) * 10) / 10,
    accuracyRate: totalQuestions === 0 ? 0 : Math.round((correctQuestions / totalQuestions) * 100),
    bestScore: bestMatch.score,
    bestScoreNickname: bestMatch.playerNickname,
    mostActivePlayer: mostActivePlayerNickname,
    mostActivePlayerMatches,
    firstAttemptHits,
    secondAttemptHits,
    thirdAttemptHits,
    missedCount,
    hardestQuestions,
    scoreEvolution,
    scoreDistribution,
  }
}

export const dashboardService = { getDashboardStats }
