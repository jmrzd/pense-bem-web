import { useCallback, useEffect, useMemo, useState } from 'react'
import { saveMatch } from '../services/matchService'
import { clearSession, getSession, saveSession } from '../services/quizSessionService'
import { startMatch, submitAnswer } from '../services/quizApi'
import type { AnsweredQuestion, AttemptRecord, Match, Program, QuestionFeedback, QuizSession } from '../types'

export type { QuestionFeedback }

interface UseQuizOptions {
  program: Program
  apiPlayerId: number
  playerId: string
  playerNickname: string
  onFinish: (match: Match) => void
}

export function useQuiz({ program, apiPlayerId, playerId, playerNickname, onFinish }: UseQuizOptions) {
  const [resumedSession] = useState(() => {
    const session = getSession(program.id, playerId)
    // sessoes antigas (de antes da integracao com o backend) nao tem
    // apiMatchId — nesse caso trata como se nao houvesse sessao pra retomar.
    return session && session.apiMatchId ? session : null
  })
  const wasResumed = resumedSession !== null && resumedSession.currentIndex + resumedSession.answers.length > 0

  const [apiMatchId, setApiMatchId] = useState<number | null>(resumedSession?.apiMatchId ?? null)
  const [matchStarting, setMatchStarting] = useState(apiMatchId === null)
  const [matchStartError, setMatchStartError] = useState<string | null>(null)

  const [startedAt] = useState(() => resumedSession?.startedAt ?? new Date().toISOString())
  const [currentIndex, setCurrentIndex] = useState(() => resumedSession?.currentIndex ?? 0)
  const [attempts, setAttempts] = useState<AttemptRecord[]>(() => resumedSession?.attempts ?? [])
  const [triedOptionIds, setTriedOptionIds] = useState<string[]>(() => resumedSession?.triedOptionIds ?? [])
  const [feedback, setFeedback] = useState<QuestionFeedback>(() => resumedSession?.feedback ?? 'idle')
  const [revealedCorrectOptionId, setRevealedCorrectOptionId] = useState<string | null>(
    () => resumedSession?.revealedCorrectOptionId ?? null,
  )
  const [score, setScore] = useState(() => resumedSession?.score ?? 0)
  const [answers, setAnswers] = useState<AnsweredQuestion[]>(() => resumedSession?.answers ?? [])
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const totalQuestions = program.questions.length
  const currentQuestion = program.questions[currentIndex]
  const attemptNumber = (attempts.length + 1) as 1 | 2 | 3
  const isLastQuestion = currentIndex === totalQuestions - 1

  useEffect(() => {
    if (apiMatchId !== null) return
    let cancelled = false
    startMatch(apiPlayerId, program.apiProgramId)
      .then(({ apiMatchId: id }) => {
        if (!cancelled) setApiMatchId(id)
      })
      .catch(() => {
        if (!cancelled) setMatchStartError('Não foi possível iniciar a partida. Tente novamente.')
      })
      .finally(() => {
        if (!cancelled) setMatchStarting(false)
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (apiMatchId === null) return
    const session: QuizSession = {
      apiMatchId,
      programId: program.id,
      playerId,
      playerNickname,
      startedAt,
      currentIndex,
      attempts,
      triedOptionIds,
      feedback,
      revealedCorrectOptionId,
      score,
      answers,
    }
    saveSession(session)
  }, [
    apiMatchId,
    answers,
    attempts,
    currentIndex,
    feedback,
    playerId,
    playerNickname,
    program.id,
    revealedCorrectOptionId,
    score,
    startedAt,
    triedOptionIds,
  ])

  const confirmAnswer = useCallback(async () => {
    if (!selectedOptionId || feedback === 'correct' || feedback === 'revealed' || submitting || apiMatchId === null) return

    const option = currentQuestion.options.find((o) => o.id === selectedOptionId)
    if (!option) return

    setSubmitting(true)
    setSubmitError(null)

    let result
    try {
      result = await submitAnswer(apiMatchId, currentQuestion.id, option.apiOptionId)
    } catch {
      setSubmitError('Não foi possível enviar sua resposta. Tente de novo.')
      setSubmitting(false)
      return
    }

    const record: AttemptRecord = { attemptNumber: result.attempt_number, optionId: selectedOptionId, correct: result.correct }
    const nextAttempts = [...attempts, record]
    setAttempts(nextAttempts)
    setTriedOptionIds((prev) => [...prev, selectedOptionId])
    setScore(result.current_score)
    setSubmitting(false)

    if (result.correct_option_id !== null) {
      const correctOption = currentQuestion.options.find((o) => o.apiOptionId === result.correct_option_id)
      setRevealedCorrectOptionId(correctOption?.id ?? null)
    }

    if (result.correct) {
      setFeedback('correct')
      setAnswers((prev) => [
        ...prev,
        {
          questionId: currentQuestion.id,
          questionNumber: currentQuestion.questionNumber,
          prompt: currentQuestion.prompt,
          attempts: nextAttempts,
          pointsAwarded: result.points_awarded,
          solved: true,
        },
      ])
      return
    }

    if (result.question_finished) {
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
  }, [apiMatchId, attempts, currentQuestion, feedback, selectedOptionId, submitting])

  const goToNextQuestion = useCallback(() => {
    if (feedback !== 'correct' && feedback !== 'revealed') return

    if (isLastQuestion) {
      const finishedAt = new Date().toISOString()
      const match: Match = {
        id: String(apiMatchId),
        playerId,
        playerNickname,
        programId: program.id,
        programName: program.name,
        answers,
        score,
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
    setRevealedCorrectOptionId(null)
    setSelectedOptionId(null)
  }, [answers, apiMatchId, feedback, isLastQuestion, onFinish, playerId, playerNickname, program.id, program.name, score, startedAt])

  const progressPercent = useMemo(() => Math.round((currentIndex / totalQuestions) * 100), [currentIndex, totalQuestions])

  return {
    matchStarting,
    matchStartError,
    currentQuestion,
    currentIndex,
    totalQuestions,
    attemptNumber,
    attemptsRemaining: 3 - attempts.length,
    feedback,
    revealedCorrectOptionId,
    score,
    selectedOptionId,
    setSelectedOptionId,
    triedOptionIds,
    submitting,
    submitError,
    confirmAnswer,
    goToNextQuestion,
    isLastQuestion,
    progressPercent,
    wasResumed,
  }
}
