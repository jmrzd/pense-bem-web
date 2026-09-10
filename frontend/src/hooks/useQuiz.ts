import { useCallback, useEffect, useMemo, useState } from 'react'
import { createId } from '../lib/id'
import { saveMatch } from '../services/matchService'
import { clearSession, getSession, saveSession } from '../services/quizSessionService'
import type { AnsweredQuestion, AttemptRecord, Match, Program, QuestionFeedback, QuizSession } from '../types'

export type { QuestionFeedback }

const POINTS_BY_ATTEMPT: Record<1 | 2 | 3, number> = { 1: 3, 2: 2, 3: 1 }

interface UseQuizOptions {
  program: Program
  playerId: string
  playerNickname: string
  onFinish: (match: Match) => void
}

export function useQuiz({ program, playerId, playerNickname, onFinish }: UseQuizOptions) {
  const [resumedSession] = useState(() => getSession(program.id, playerId))
  const wasResumed = resumedSession !== null && resumedSession.currentIndex + resumedSession.answers.length > 0

  const [startedAt] = useState(() => resumedSession?.startedAt ?? new Date().toISOString())
  const [currentIndex, setCurrentIndex] = useState(() => resumedSession?.currentIndex ?? 0)
  const [attempts, setAttempts] = useState<AttemptRecord[]>(() => resumedSession?.attempts ?? [])
  const [triedOptionIds, setTriedOptionIds] = useState<string[]>(() => resumedSession?.triedOptionIds ?? [])
  const [feedback, setFeedback] = useState<QuestionFeedback>(() => resumedSession?.feedback ?? 'idle')
  const [score, setScore] = useState(() => resumedSession?.score ?? 0)
  const [answers, setAnswers] = useState<AnsweredQuestion[]>(() => resumedSession?.answers ?? [])
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)

  const totalQuestions = program.questions.length
  const currentQuestion = program.questions[currentIndex]
  const attemptNumber = (attempts.length + 1) as 1 | 2 | 3
  const isLastQuestion = currentIndex === totalQuestions - 1

  useEffect(() => {
    const session: QuizSession = {
      programId: program.id,
      playerId,
      playerNickname,
      startedAt,
      currentIndex,
      attempts,
      triedOptionIds,
      feedback,
      score,
      answers,
    }
    saveSession(session)
  }, [answers, attempts, currentIndex, feedback, playerId, playerNickname, program.id, score, startedAt, triedOptionIds])

  const confirmAnswer = useCallback(() => {
    if (!selectedOptionId || feedback === 'correct' || feedback === 'revealed') return

    const correct = selectedOptionId === currentQuestion.correctOptionId
    const record: AttemptRecord = { attemptNumber, optionId: selectedOptionId, correct }
    const nextAttempts = [...attempts, record]
    setAttempts(nextAttempts)
    setTriedOptionIds((prev) => [...prev, selectedOptionId])

    if (correct) {
      const points = POINTS_BY_ATTEMPT[attemptNumber]
      setScore((prev) => prev + points)
      setFeedback('correct')
      setAnswers((prev) => [
        ...prev,
        {
          questionId: currentQuestion.id,
          questionNumber: currentQuestion.questionNumber,
          prompt: currentQuestion.prompt,
          attempts: nextAttempts,
          pointsAwarded: points,
          solved: true,
        },
      ])
      return
    }

    if (nextAttempts.length >= 3) {
      setFeedback('revealed')
      setAnswers((prev) => [
        ...prev,
        {
          questionId: currentQuestion.id,
          questionNumber: currentQuestion.questionNumber,
          prompt: currentQuestion.prompt,
          attempts: nextAttempts,
          pointsAwarded: 0,
          solved: false,
        },
      ])
      return
    }

    setFeedback('incorrect')
    setSelectedOptionId(null)
  }, [attemptNumber, attempts, currentQuestion, feedback, selectedOptionId])

  const goToNextQuestion = useCallback(() => {
    if (feedback !== 'correct' && feedback !== 'revealed') return

    if (isLastQuestion) {
      const finishedAt = new Date().toISOString()
      const finalScore = score
      const match: Match = {
        id: createId('match'),
        playerId,
        playerNickname,
        programId: program.id,
        programName: program.name,
        answers,
        score: finalScore,
        correctCount: answers.filter((a) => a.solved).length,
        startedAt,
        finishedAt,
      }
      saveMatch(match)
      clearSession()
      onFinish(match)
      return
    }

    setCurrentIndex((prev) => prev + 1)
    setAttempts([])
    setTriedOptionIds([])
    setFeedback('idle')
    setSelectedOptionId(null)
  }, [answers, feedback, isLastQuestion, onFinish, playerId, playerNickname, program.id, program.name, score, startedAt])

  const progressPercent = useMemo(() => Math.round((currentIndex / totalQuestions) * 100), [currentIndex, totalQuestions])

  return {
    currentQuestion,
    currentIndex,
    totalQuestions,
    attemptNumber,
    attemptsRemaining: 3 - attempts.length,
    feedback,
    score,
    selectedOptionId,
    setSelectedOptionId,
    triedOptionIds,
    confirmAnswer,
    goToNextQuestion,
    isLastQuestion,
    progressPercent,
    wasResumed,
  }
}
