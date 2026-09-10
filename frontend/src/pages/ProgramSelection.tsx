import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Icon, type IconName } from '../components/Icon'
import { Panel } from '../components/Panel'
import { usePlayer } from '../context/PlayerContext'
import { listPrograms } from '../services/programService'
import type { Program } from '../types'

const ACCENT_CLASSES: Record<Program['accent'], string> = {
  mustard: 'bg-mustard',
  coral: 'bg-coral text-paper',
  teal: 'bg-teal text-paper',
}

const PROGRAM_ICONS: Record<string, IconName> = {
  'conhecimentos-gerais': 'globe',
  'ciencia-natureza': 'dna',
  'games-cultura-pop': 'gamepad',
}

export function ProgramSelection() {
  const { player } = usePlayer()
  const navigate = useNavigate()
  const programs = listPrograms()

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-ink-soft">
          Bem-vindo, <span className="text-coral-dark">{player?.nickname}</span>
        </p>
        <h1 className="mt-2 font-hero text-4xl sm:text-5xl">ESCOLHA SEU PROGRAMA</h1>
        <p className="mt-3 text-ink-soft">Cada programa tem 30 perguntas e até 90 pontos disponíveis.</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {programs.map((program, index) => (
          <motion.button
            key={program.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
            onClick={() => navigate(`/quiz/${program.id}`)}
            className="press text-left"
          >
            <Panel className="relative h-full">
              <span className="panel-sm absolute -right-3 -top-3 flex h-11 w-11 rotate-6 items-center justify-center rounded-full bg-paper font-hero text-sm">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl border-[2.5px] border-ink ${ACCENT_CLASSES[program.accent]}`}
              >
                <Icon name={PROGRAM_ICONS[program.id] ?? 'star'} size={28} strokeWidth={2} />
              </div>
              <h2 className="mt-4 font-display text-xl font-bold">{program.name}</h2>
              <p className="mt-1 text-sm font-bold text-ink-soft">{program.tagline}</p>
              <p className="mt-3 text-sm text-ink-soft">{program.description}</p>
              <div className="mt-5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-ink-soft">
                <span>30 perguntas</span>
                <span>até 90 pts</span>
              </div>
              <div
                className={`panel-sm mt-4 inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-bold ${ACCENT_CLASSES[program.accent]}`}
              >
                Jogar agora →
              </div>
            </Panel>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
