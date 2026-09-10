import { useCallback, useMemo, useState } from 'react'
import { createId } from '../lib/id'
import { saveMatch } from '../services/matchService'
import type { AnsweredQuestion, AttemptRecord, Match, Program } from '../types'

export type QuestionFeedback = 'idle' | 'correct' | 'incorrect' | 'revealed'

const POINTS_BY_ATTEMPT: Record<1 | 2 | 3, number> = { 1: 3, 2: 2, 3: 1 }

interface UseQuizOptions {
  program: Program
  playerId: string
  playerNickname: string
  onFinish: (match: Match) => void
}

export function useQuiz({ program, playerId, playerNickname, onFinish }: UseQuizOptions) {
  const [startedAt] = useState(() => new Date().toISOString())
  const [currentIndex, setCurrentIndex] = useState(0)
  const [attempts, setAttempts] = useState<AttemptRecord[]>([])
  const [triedOptionIds, setTriedOptionIds] = useState<string[]>([])
  const [feedback, setFeedback] = useState<QuestionFeedback>('idle')
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<AnsweredQuestion[]>([])
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)

  const totalQuestions = program.questions.length
  const currentQuestion = program.questions[currentIndex]
  const attemptNumber = (attempts.length + 1) as 1 | 2 | 3
  const isLastQuestion = currentIndex === totalQuestions - 1

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
  }
}
