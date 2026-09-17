export interface Option {
  id: string // código de exibição (A/B/C/D), igual ao option_code do backend
  apiOptionId: number // id real da alternativa no backend, usado pra enviar a resposta
  text: string
}

export interface Question {
  id: number // id da pergunta no backend
  questionNumber: number
  prompt: string
  options: Option[]
}

export interface Program {
  id: string // slug/code, usado nas rotas do frontend (ex.: "conhecimentos-gerais")
  apiProgramId: number // id numérico do backend, usado pra iniciar partidas
  name: string
  tagline: string
  description: string
  icon: string
  accent: 'mustard' | 'coral' | 'teal'
  questions: Question[]
}

export interface Player {
  id: string
  nickname: string
  createdAt: string
}

export interface AttemptRecord {
  attemptNumber: 1 | 2 | 3
  optionId: string
  correct: boolean
}

export interface AnsweredQuestion {
  questionId: number
  questionNumber: number
  prompt: string
  attempts: AttemptRecord[]
  pointsAwarded: number
  solved: boolean
}

export interface Match {
  id: string
  playerId: string
  playerNickname: string
  programId: string
  programName: string
  answers: AnsweredQuestion[]
  score: number
  correctCount: number
  startedAt: string
  finishedAt: string
}

export type QuestionFeedback = 'idle' | 'correct' | 'incorrect' | 'revealed'

export interface QuizSession {
  apiMatchId: number
  programId: string
  playerId: string
  playerNickname: string
  startedAt: string
  currentIndex: number
  attempts: AttemptRecord[]
  triedOptionIds: string[]
  feedback: QuestionFeedback
  revealedCorrectOptionId: string | null
  score: number
  answers: AnsweredQuestion[]
}

export interface RankingEntry {
  playerId: string
  nickname: string
  bestScore: number
  matchCount: number
  lastPlayedAt: string
}

export interface DashboardStats {
  totalPlayers: number
  totalMatches: number
  averageScore: number
  accuracyRate: number
  bestScore: number
  bestScoreNickname: string
  mostActivePlayer: string
  mostActivePlayerMatches: number
  firstAttemptHits: number
  secondAttemptHits: number
  thirdAttemptHits: number
  missedCount: number
  hardestQuestions: { prompt: string; programName: string; missRate: number }[]
  scoreEvolution: { matchLabel: string; score: number; nickname: string }[]
  scoreDistribution: { label: string; total: number }[]
}
