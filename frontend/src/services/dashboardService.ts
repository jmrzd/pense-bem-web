import { api } from '../lib/api'
import type { DashboardStats } from '../types'

interface DashboardStatsDto {
  total_players: number
  total_matches: number
  average_score: number
  accuracy_rate: number
  best_score: number
  best_score_nickname: string
  most_active_player: string
  most_active_player_matches: number
  first_attempt_hits: number
  second_attempt_hits: number
  third_attempt_hits: number
  missed_count: number
  hardest_questions: { prompt: string; program_title: string; miss_rate: number }[]
  score_evolution: { match_label: string; score: number; nickname: string }[]
  score_distribution: { label: string; total: number }[]
}

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const dto = await api.get<DashboardStatsDto>('/dashboard')
  return {
    totalPlayers: dto.total_players,
    totalMatches: dto.total_matches,
    averageScore: dto.average_score,
    accuracyRate: dto.accuracy_rate,
    bestScore: dto.best_score,
    bestScoreNickname: dto.best_score_nickname,
    mostActivePlayer: dto.most_active_player,
    mostActivePlayerMatches: dto.most_active_player_matches,
    firstAttemptHits: dto.first_attempt_hits,
    secondAttemptHits: dto.second_attempt_hits,
    thirdAttemptHits: dto.third_attempt_hits,
    missedCount: dto.missed_count,
    hardestQuestions: dto.hardest_questions.map((q) => ({
      prompt: q.prompt,
      programName: q.program_title,
      missRate: q.miss_rate,
    })),
    scoreEvolution: dto.score_evolution.map((s) => ({ matchLabel: s.match_label, score: s.score, nickname: s.nickname })),
    scoreDistribution: dto.score_distribution,
  }
}
