import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { AttemptsDots } from '../components/AttemptsDots'
import { Button } from '../components/Button'
import { ErrorMessage } from '../components/ErrorMessage'
import { Icon } from '../components/Icon'
import { OptionButton, type OptionStatus } from '../components/OptionButton'
import { Panel } from '../components/Panel'
import { ProgressBar } from '../components/ProgressBar'

import { usePlayer } from '../context/PlayerContext'
import { useProgram } from '../hooks/useProgram'
import { useQuiz } from '../hooks/useQuiz'
import { fireCelebration, fireSmallBurst } from '../lib/confetti'

import type { Match, Program } from '../types'

export function Quiz() {
  const { programId } = useParams<{ programId: string }>()
  const { player } = usePlayer()
  const navigate = useNavigate()

  const { program, loading, error } = useProgram(programId)

  const handleFinish = useCallback(
    (match: Match) => {
      fireCelebration()

      navigate('/resultado', {
        state: {
          matchId: match.id,
        },
      })
    },
    [navigate],
  )

  if (!player) {
    return (
      <div className="mx-auto max-w-md px-4 py-20">
        <ErrorMessage
          title="Você ainda não entrou"
          message="Digite seu apelido na tela inicial antes de jogar."
          onRetry={() => navigate('/')}
        />
      </div>
    )
  }

  if (loading) {
    return (
      <p className="mx-auto max-w-md px-4 py-20 text-center text-ink-soft">
        Carregando perguntas…
      </p>
    )
  }

  if (error || !program) {
    return (
      <div className="mx-auto max-w-md px-4 py-20">
        <ErrorMessage
          title="Programa não encontrado"
          message={
            error ??
            'Esse programa não existe ou o link está incorreto. Volte e escolha um programa válido.'
          }
          onRetry={() => navigate('/programas')}
        />
      </div>
    )
  }

  return (
    <QuizRunner
      program={program}
      apiPlayerId={Number(player.id)}
      playerId={player.id}
      playerNickname={player.nickname}
      onFinish={handleFinish}
    />
  )
}

function QuizRunner({
  program,
  apiPlayerId,
  playerId,
  playerNickname,
  onFinish,
}: {
  program: Program
  apiPlayerId: number
  playerId: string
  playerNickname: string
  onFinish: (match: Match) => void
}) {
  const quiz = useQuiz({
    program,
    apiPlayerId,
    playerId,
    playerNickname,
    onFinish,
  })

  const [showResumeBanner, setShowResumeBanner] = useState(
    quiz.wasResumed,
  )

  useEffect(() => {
    if (quiz.feedback === 'correct') {
      fireSmallBurst()
    }
  }, [quiz.feedback])

  if (quiz.matchStartError) {
    return (
      <div className="mx-auto max-w-md px-4 py-20">
        <ErrorMessage
          title="Não foi possível iniciar a partida"
          message={quiz.matchStartError}
          onRetry={() => window.location.reload()}
        />
      </div>
    )
  }

  if (quiz.matchStarting) {
    return (
      <p className="mx-auto max-w-md px-4 py-20 text-center text-ink-soft">
        Preparando sua partida…
      </p>
    )
  }

  function optionStatus(optionId: string): OptionStatus {
    const isCorrectOption =
      optionId === quiz.revealedCorrectOptionId

    if (quiz.feedback === 'revealed') {
      return isCorrectOption
        ? 'reveal-correct'
        : quiz.triedOptionIds.includes(optionId)
          ? 'incorrect'
          : 'disabled'
    }

    if (quiz.feedback === 'correct') {
      return isCorrectOption ? 'correct' : 'disabled'
    }

    if (quiz.triedOptionIds.includes(optionId)) {
      return 'incorrect'
    }

    if (quiz.selectedOptionId === optionId) {
      return 'selected'
    }

    return 'idle'
  }

  const isLocked =
    quiz.feedback === 'correct' ||
    quiz.feedback === 'revealed'

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {showResumeBanner && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="panel-sm mb-6 flex items-center justify-between gap-3 rounded-lg bg-cobalt px-4 py-2.5 text-chip-light"
        >
          <span className="flex items-center gap-2 text-sm font-bold">
            <Icon
              name="rocket"
              size={16}
              className="flex-none"
            />

            Continuando de onde você parou — pergunta{' '}
            {quiz.currentIndex + 1} de {quiz.totalQuestions}.
          </span>

          <button
            type="button"
            onClick={() => setShowResumeBanner(false)}
            aria-label="Fechar aviso"
            className="flex-none rounded-md border-2 border-chip-light/60 p-1 hover:bg-chip-light/10"
          >
            <Icon name="x" size={14} />
          </button>
        </motion.div>
      )}

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="tag bg-paper">
          {program.name}
        </div>

        <div className="flex items-center gap-4">
          <AttemptsDots
            attemptNumber={quiz.attemptNumber}
          />

          <div className="panel-sm rounded-lg bg-mustard px-4 py-2 font-display text-lg font-extrabold text-chip-dark">
            {quiz.score} pts
          </div>
        </div>
      </div>

      <p className="mb-2 font-hero text-xl">
        PERGUNTA {quiz.currentIndex + 1}

        <span className="text-ink-soft">
          {' '}
          / {quiz.totalQuestions}
        </span>
      </p>

      <ProgressBar percent={quiz.progressPercent} />

      <AnimatePresence mode="wait">
        <motion.div
          key={quiz.currentQuestion.id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.25 }}
          className="mt-6"
        >
          <Panel>
            <h2 className="font-display text-xl font-bold leading-snug sm:text-2xl">
              {quiz.currentQuestion.prompt
                .replace('[VISUAL]', '')
                .trim()}
            </h2>

            {quiz.currentQuestion.imageUrl && (
              <div className="mt-5 overflow-hidden rounded-xl border-[2.5px] border-ink bg-paper p-3">
                <img
                  src={quiz.currentQuestion.imageUrl}
                  alt={`Imagem da pergunta ${quiz.currentQuestion.questionNumber}`}
                  className="mx-auto max-h-[380px] w-full object-contain"
                />
              </div>
            )}

            <div className="mt-6 flex flex-col gap-3">
              {quiz.currentQuestion.options.map(
                (option) => (
                  <OptionButton
                    key={option.id}
                    option={option}
                    status={optionStatus(option.id)}
                    disabled={
                      isLocked ||
                      quiz.triedOptionIds.includes(
                        option.id,
                      )
                    }
                    onClick={() =>
                      quiz.setSelectedOptionId(
                        option.id,
                      )
                    }
                  />
                ),
              )}
            </div>

            <FeedbackBanner
              feedback={quiz.feedback}
              attemptsRemaining={
                quiz.attemptsRemaining
              }
            />

            {quiz.submitError && (
              <p className="mt-4 text-center text-sm font-bold text-coral-dark">
                {quiz.submitError}
              </p>
            )}

            <div className="mt-6 flex justify-end">
              {isLocked ? (
                <Button
                  size="lg"
                  variant="teal"
                  onClick={quiz.goToNextQuestion}
                >
                  {quiz.isLastQuestion ? (
                    <>
                      <Icon
                        name="trophy"
                        size={18}
                      />

                      Ver resultado
                    </>
                  ) : (
                    <>
                      Próxima pergunta

                      <Icon
                        name="arrowRight"
                        size={18}
                      />
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  size="lg"
                  onClick={quiz.confirmAnswer}
                  disabled={
                    !quiz.selectedOptionId ||
                    quiz.submitting
                  }
                >
                  {quiz.submitting
                    ? 'Enviando…'
                    : 'Confirmar resposta'}
                </Button>
              )}
            </div>
          </Panel>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function FeedbackBanner({
  feedback,
  attemptsRemaining,
}: {
  feedback: ReturnType<typeof useQuiz>['feedback']
  attemptsRemaining: number
}) {
  if (feedback === 'idle') {
    return null
  }

  const messages: Record<
    string,
    {
      text: string
      icon: 'check' | 'x' | 'bulb'
      className: string
    }
  > = {
    correct: {
      text: 'Resposta correta! Pontos garantidos.',
      icon: 'check',
      className: 'bg-teal text-chip-light',
    },

    incorrect: {
      text: `Resposta incorreta. Você ainda tem ${attemptsRemaining} tentativa${
        attemptsRemaining > 1 ? 's' : ''
      }.`,
      icon: 'x',
      className: 'bg-coral text-chip-light',
    },

    revealed: {
      text: 'Suas tentativas acabaram. A resposta certa está em destaque.',
      icon: 'bulb',
      className: 'bg-mustard text-chip-dark',
    },
  }

  const message = messages[feedback]

  return (
    <motion.p
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mt-4 flex items-center justify-center gap-2 rounded-lg border-2 border-ink px-4 py-2.5 text-center text-sm font-bold ${message.className}`}
    >
      <Icon
        name={message.icon}
        size={18}
        className="flex-none"
      />

      {message.text}
    </motion.p>
  )
}