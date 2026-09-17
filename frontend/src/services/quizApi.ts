import { api } from '../lib/api'

interface MatchDto {
  id: number
  player_id: number
  program_id: number
  status: string
  score: number
  started_at: string
  finished_at: string | null
}

export interface AnswerResultDto {
  attempt_number: 1 | 2 | 3
  correct: boolean
  points_awarded: number
  current_score: number
  question_finished: boolean
  match_finished: boolean
  correct_option_id: number | null
}

export async function startMatch(playerId: number, programId: number): Promise<{ apiMatchId: number }> {
  const dto = await api.post<MatchDto>('/matches', { player_id: playerId, program_id: programId })
  return { apiMatchId: dto.id }
}

export function submitAnswer(apiMatchId: number, questionId: number, optionId: number): Promise<AnswerResultDto> {
  return api.post<AnswerResultDto>(`/matches/${apiMatchId}/answers`, {
    question_id: questionId,
    option_id: optionId,
  })
}
