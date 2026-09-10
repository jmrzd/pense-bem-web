import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState, type FormEvent, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { Icon } from '../components/Icon'
import { Panel } from '../components/Panel'
import { usePlayer } from '../context/PlayerContext'
import { programs } from '../data/programs'
import { useDashboard } from '../hooks/useDashboard'

const PREVIEW_QUESTIONS = [
  { programIcon: programs[0].icon, text: programs[0].questions[4].prompt },
  { programIcon: programs[1].icon, text: programs[1].questions[7].prompt },
  { programIcon: programs[2].icon, text: programs[2].questions[2].prompt },
  { programIcon: programs[0].icon, text: programs[0].questions[19].prompt },
  { programIcon: programs[1].icon, text: programs[1].questions[15].prompt },
]

const PREVIEW_INTERVAL_MS = 3200

function QuestionPreview() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % PREVIEW_QUESTIONS.length), PREVIEW_INTERVAL_MS)
    return () => clearInterval(timer)
  }, [])

  const current = PREVIEW_QUESTIONS[index]

  return (
    <div className="tag relative mx-auto mt-5 max-w-sm bg-paper !py-2.5 !text-[0.72rem] normal-case tracking-normal">
      <span className="flex-none text-base leading-none">{current.programIcon}</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.25 }}
          className="truncate font-semibold"
        >
          {current.text}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

function FloatingIcon({
  icon,
  size,
  className,
  animateProps,
  delay = 0,
  duration,
}: {
  icon: 'gamepad' | 'trophy' | 'star' | 'target'
  size: number
  className: string
  animateProps: { y: number[]; rotate: number[] }
  delay?: number
  duration: number
}) {
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute text-chip-dark/15 ${className}`}
      animate={animateProps}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <Icon name={icon} size={size} />
    </motion.div>
  )
}

function TiltCard({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 18 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 150, damping: 18 })

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const bounds = ref.current?.getBoundingClientRect()
    if (!bounds) return
    x.set((event.clientX - bounds.left) / bounds.width - 0.5)
    y.set((event.clientY - bounds.top) / bounds.height - 0.5)
  }

  function handlePointerLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  )
}

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
    <div className="mx-auto max-w-2xl px-4 pt-10 sm:pt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 90, damping: 16 }}
      >
        <TiltCard>
        <Panel className="relative overflow-hidden !p-0">
          <div className="relative overflow-hidden border-b-[3px] border-ink bg-mustard px-6 py-10 text-center sm:px-14 sm:py-14">
            <FloatingIcon
              icon="gamepad"
              size={30}
              className="left-3 top-8 sm:left-10 sm:top-10"
              animateProps={{ y: [0, -10, 0], rotate: [-8, 4, -8] }}
              duration={6.5}
            />
            <FloatingIcon
              icon="trophy"
              size={26}
              className="right-4 top-14 sm:right-12 sm:top-16"
              animateProps={{ y: [0, 9, 0], rotate: [6, -5, 6] }}
              duration={7.5}
              delay={0.4}
            />
            <FloatingIcon
              icon="star"
              size={22}
              className="bottom-6 left-8 sm:left-16"
              animateProps={{ y: [0, -8, 0], rotate: [0, 10, 0] }}
              duration={5.5}
              delay={0.8}
            />
            <FloatingIcon
              icon="target"
              size={28}
              className="bottom-10 right-6 sm:right-16"
              animateProps={{ y: [0, 8, 0], rotate: [-4, 8, -4] }}
              duration={8}
              delay={1.1}
            />

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="tag relative mx-auto mb-6 bg-paper"
            >
              <Icon name="star" size={13} /> RELEITURA WEB DO CLÁSSICO
            </motion.div>

            <h1 className="relative font-hero text-6xl leading-[0.95] text-chip-dark sm:text-7xl">
              PENSE
              <br />
              <span className="bg-coral px-3 text-chip-light">BEM</span>
            </h1>

            <p className="relative mt-5 font-display text-base font-semibold text-chip-dark/70 sm:text-lg">
              o quiz que testa sua mente
            </p>

            <QuestionPreview />
          </div>

          <div className="bg-paper px-6 py-8 text-center sm:px-14 sm:py-10">
            <p className="mx-auto max-w-md text-balance text-ink-soft">
              30 perguntas, 3 tentativas por pergunta e até <span className="font-bold text-ink">90 pontos</span> em
              jogo. Escolha um apelido e encare o desafio.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-5 flex flex-wrap items-center justify-center gap-2.5"
            >
              {stats.totalMatches === 0 ? (
                <span className="tag bg-teal text-chip-light">
                  <Icon name="flame" size={13} /> SEJA O PRIMEIRO A ENTRAR NO RANKING
                </span>
              ) : (
                <>
                  <span className="tag bg-cream">
                    <Icon name="gamepad" size={13} /> {stats.totalMatches} PARTIDAS
                  </span>
                  <span className="tag bg-cream">
                    <Icon name="crown" size={13} /> RECORDE: {stats.bestScore} PTS
                  </span>
                  <span className="tag bg-cream">
                    <Icon name="users" size={13} /> {stats.totalPlayers} JOGADORES
                  </span>
                </>
              )}
            </motion.div>

            <div className="ticket-tear my-6" />

            <form onSubmit={handleSubmit} className="text-left">
              <label htmlFor="nickname" className="block text-xs font-bold uppercase tracking-widest text-ink-soft">
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
              {error && <p className="mt-2 text-sm font-bold text-coral-dark">{error}</p>}
              <Button type="submit" size="lg" className="mt-4 w-full">
                <Icon name="rocket" size={18} /> Jogar agora
              </Button>
            </form>
          </div>
        </Panel>
        </TiltCard>
      </motion.div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { icon: 'target' as const, title: '3 tentativas', desc: '3 / 2 / 1 pontos pela tentativa certa', accent: 'text-mustard-dark' },
          { icon: 'trophy' as const, title: 'Ranking real', desc: 'Dados de quem realmente jogou', accent: 'text-teal-dark' },
          { icon: 'chart' as const, title: 'Dashboard', desc: 'Estatísticas completas das partidas', accent: 'text-coral-dark' },
        ].map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.06 }}
          >
            <div className="panel-sm flex h-full items-start gap-3 rounded-xl bg-paper p-4">
              <Icon name={f.icon} size={22} className={`mt-0.5 flex-none ${f.accent}`} />
              <div>
                <p className="font-display text-sm font-bold">{f.title}</p>
                <p className="mt-0.5 text-xs text-ink-soft">{f.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
