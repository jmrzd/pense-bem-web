import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AnimatedNumber } from '../components/AnimatedNumber'
import { Button } from '../components/Button'
import { ErrorMessage } from '../components/ErrorMessage'
import { Icon, type IconName } from '../components/Icon'
import { Panel } from '../components/Panel'
import { fireCelebration } from '../lib/confetti'
import { getLastMatch, listMatches } from '../services/matchService'

const MAX_SCORE = 90

function getRank(score: number): { label: string; icon: IconName } {
  if (score >= 80) return { label: 'Mestre do Pense Bem', icon: 'crown' }
  if (score >= 60) return { label: 'Craque da Trivia', icon: 'flame' }
  if (score >= 40) return { label: 'Bom desafiante', icon: 'target' }
  if (score >= 20) return { label: 'Ainda esquentando', icon: 'sprout' }
  return { label: 'Bora estudar mais', icon: 'book' }
}

export function Result() {
  const location = useLocation()
  const navigate = useNavigate()
  const matchId = (location.state as { matchId?: string } | null)?.matchId
  const match = matchId ? listMatches().find((m) => m.id === matchId) ?? getLastMatch() : getLastMatch()

  useEffect(() => {
    if (match && match.score >= 60) fireCelebration()
  }, [match])

  if (!match) {
    return (
      <div className="mx-auto max-w-md px-4 py-20">
        <ErrorMessage
          title="Nenhum resultado encontrado"
          message="Jogue uma partida primeiro para ver seu resultado aqui."
          onRetry={() => navigate('/programas')}
        />
      </div>
    )
  }

  const rank = getRank(match.score)
  const firstAttempt = match.answers.filter((a) => a.solved && a.attempts[a.attempts.length - 1].attemptNumber === 1).length
  const secondAttempt = match.answers.filter((a) => a.solved && a.attempts[a.attempts.length - 1].attemptNumber === 2).length
  const thirdAttempt = match.answers.filter((a) => a.solved && a.attempts[a.attempts.length - 1].attemptNumber === 3).length
  const missed = match.answers.filter((a) => !a.solved).length

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 text-center">
      <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring' }}>
        <p className="text-sm font-bold uppercase tracking-widest text-ink-soft">Partida finalizada</p>
        <div className="panel-sm mx-auto mb-3 mt-3 flex h-14 w-14 items-center justify-center rounded-xl bg-mustard text-chip-dark">
          <Icon name={rank.icon} size={26} />
        </div>
        <h1 className="font-hero text-3xl sm:text-4xl">{rank.label.toUpperCase()}</h1>
        <p className="mt-1 font-semibold text-ink-soft">
          {match.playerNickname} · {match.programName}
        </p>
      </motion.div>

      <Panel className="ticket mt-8 bg-mustard text-chip-dark">
        <p className="text-xs font-bold uppercase tracking-widest text-chip-dark/70">Pontuação final</p>
        <p className="mt-1 font-hero text-6xl">
          <AnimatedNumber value={match.score} durationMs={1200} />
          <span className="text-3xl text-chip-dark/50"> / {MAX_SCORE}</span>
        </p>

        <div className="mt-3 h-4 w-full overflow-hidden rounded-lg border-[2.5px] border-ink bg-paper">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(match.score / MAX_SCORE) * 100}%` }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-full bg-coral"
          />
        </div>

        <p className="mt-4 text-sm font-semibold text-chip-dark/80">
          {match.correctCount} de {match.answers.length} perguntas corretas
        </p>

        <div className="ticket-tear my-5" />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: '1ª tentativa', value: firstAttempt, bg: 'bg-paper text-ink' },
            { label: '2ª tentativa', value: secondAttempt, bg: 'bg-paper text-ink' },
            { label: '3ª tentativa', value: thirdAttempt, bg: 'bg-paper text-ink' },
            { label: 'Erradas', value: missed, bg: 'bg-coral text-chip-light' },
          ].map((stat) => (
            <div key={stat.label} className={`panel-sm rounded-lg p-3 ${stat.bg}`}>
              <p className="font-display text-2xl font-extrabold">{stat.value}</p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-wide opacity-70">{stat.label}</p>
            </div>
          ))}
        </div>
      </Panel>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button size="lg" onClick={() => navigate(`/quiz/${match.programId}`)}>
          <Icon name="gamepad" size={18} /> Jogar novamente
        </Button>
        <Button size="lg" variant="secondary" onClick={() => navigate('/ranking')}>
          <Icon name="trophy" size={18} /> Ver ranking
        </Button>
        <Button size="lg" variant="secondary" onClick={() => navigate('/dashboard')}>
          <Icon name="chart" size={18} /> Dashboard
        </Button>
      </div>
    </div>
  )
}
