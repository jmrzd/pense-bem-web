import { motion } from 'framer-motion'
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { Icon } from '../components/Icon'
import { Panel } from '../components/Panel'
import { usePlayer } from '../context/PlayerContext'
import { useDashboard } from '../hooks/useDashboard'

export function Home() {
  const { setNickname } = usePlayer()
  const navigate = useNavigate()
  const stats = useDashboard()
  const [nickname, setNicknameValue] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const trimmed = nickname.trim()

    if (trimmed.length < 2) {
      setError('Digite pelo menos 2 caracteres para o seu apelido.')
      return
    }

    if (trimmed.length > 20) {
      setError('Apelido muito longo — use até 20 caracteres.')
      return
    }

    setError(null)
    setNickname(trimmed)
    navigate('/programas')
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center px-4 pt-10 text-center sm:pt-16">
      <div className="relative mb-2 flex flex-col items-center">
        <div className="absolute -inset-x-8 top-4 -z-10 h-32 -rotate-2 border-y-[3px] border-ink bg-mustard sm:h-40 md:h-48" />

        <motion.div
          initial={{ opacity: 0, y: -12, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          className="tag mb-6 bg-paper"
        >
          <Icon name="star" size={13} /> RELEITURA WEB DO CLÁSSICO
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 120, damping: 14 }}
          className="font-hero text-6xl leading-[0.95] sm:text-8xl"
        >
          PENSE
          <br />
          <span className="bg-coral px-3 text-paper">BEM</span>
        </motion.h1>
      </div>

      <p className="mt-6 max-w-xl font-display text-lg font-semibold text-ink-soft">o quiz que testa sua mente</p>

      <p className="mt-4 max-w-xl text-balance text-ink-soft">
        30 perguntas, 3 tentativas por pergunta e até <span className="font-bold text-ink">90 pontos</span> em jogo.
        Escolha um apelido, encare o desafio e dispute o topo do ranking.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-6 flex flex-wrap items-center justify-center gap-3"
      >
        {stats.totalMatches === 0 ? (
          <span className="tag bg-teal text-paper">
            <Icon name="flame" size={13} /> SEJA O PRIMEIRO A ENTRAR NO RANKING
          </span>
        ) : (
          <>
            <span className="tag bg-paper">
              <Icon name="gamepad" size={13} /> {stats.totalMatches} PARTIDAS JOGADAS
            </span>
            <span className="tag bg-paper">
              <Icon name="crown" size={13} /> RECORDE: {stats.bestScore} PTS ({stats.bestScoreNickname.toUpperCase()})
            </span>
            <span className="tag bg-paper">
              <Icon name="users" size={13} /> {stats.totalPlayers} JOGADORES
            </span>
          </>
        )}
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        onSubmit={handleSubmit}
        className="mt-8 w-full max-w-md"
      >
        <Panel className="ticket">
          <label htmlFor="nickname" className="block text-left text-xs font-bold uppercase tracking-widest text-ink-soft">
            Seu nome ou apelido
          </label>
          <input
            id="nickname"
            autoFocus
            value={nickname}
            onChange={(e) => setNicknameValue(e.target.value)}
            placeholder="Ex: Gelado"
            maxLength={20}
            className="mt-2 w-full rounded-xl border-[2.5px] border-ink bg-cream px-4 py-3 text-lg font-bold text-ink placeholder:text-ink-soft/50 focus:outline-none focus:ring-4 focus:ring-mustard"
          />
          {error && <p className="mt-2 text-left text-sm font-bold text-coral-dark">{error}</p>}
          <div className="ticket-tear my-5" />
          <Button type="submit" size="lg" className="w-full">
            <Icon name="rocket" size={18} /> Jogar agora
          </Button>
        </Panel>
      </motion.form>

      <div className="mt-14 grid w-full grid-cols-1 gap-5 sm:grid-cols-3">
        {[
          { icon: 'target' as const, title: '3 tentativas', desc: '3 / 2 / 1 pontos conforme a tentativa certa', bg: 'bg-mustard', rot: '-1.5deg' },
          { icon: 'trophy' as const, title: 'Ranking real', desc: 'Dados de quem realmente jogou', bg: 'bg-teal text-paper', rot: '1deg' },
          { icon: 'chart' as const, title: 'Dashboard', desc: 'Estatísticas completas das partidas', bg: 'bg-coral text-paper', rot: '-1deg' },
        ].map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.08 }}
            style={{ rotate: f.rot }}
          >
            <Panel className={`h-full ${f.bg}`}>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg border-2 border-ink bg-paper text-ink">
                <Icon name={f.icon} size={20} />
              </div>
              <p className="font-display font-bold">{f.title}</p>
              <p className="mt-1 text-sm opacity-80">{f.desc}</p>
            </Panel>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
