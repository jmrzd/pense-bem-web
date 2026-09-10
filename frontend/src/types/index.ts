export interface Option {
  id: string
  text: string
}

export interface Question {
  id: number
  questionNumber: number
  prompt: string
  options: Option[]
  correctOptionId: string
}

export interface Program {
  id: string
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
