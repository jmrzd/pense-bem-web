import { storage } from '../lib/storage'
import type { QuizSession } from '../types'

const KEY = 'quiz-session'

export function saveSession(session: QuizSession): void {
  storage.write(KEY, session)
}

export function getSession(programId: string, playerId: string): QuizSession | null {
  const session = storage.read<QuizSession | null>(KEY, null)
  if (!session || session.programId !== programId || session.playerId !== playerId) return null
  return session
}

export function clearSession(): void {
  storage.write(KEY, null)
}

export const quizSessionService = { saveSession, getSession, clearSession }
