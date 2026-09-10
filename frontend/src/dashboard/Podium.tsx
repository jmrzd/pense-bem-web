import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import type { RankingEntry } from '../types'

const PODIUM_CONFIG = [
  { place: 2, height: 'h-28', medal: '🥈', order: 'order-1', bg: 'bg-paper' },
  { place: 1, height: 'h-40', medal: '🥇', order: 'order-2', bg: 'bg-mustard' },
  { place: 3, height: 'h-20', medal: '🥉', order: 'order-3', bg: 'bg-paper' },
]

export function Podium({ entries }: { entries: RankingEntry[] }) {
  const top3 = entries.slice(0, 3)
  if (top3.length === 0) return null

  return (
    <div className="flex items-end justify-center gap-4 sm:gap-8">
      {PODIUM_CONFIG.map((config) => {
        const entry = top3[config.place - 1]
        if (!entry) return <div key={config.place} className={clsx('flex-1', config.order)} />

        return (
          <motion.div
            key={entry.playerId}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: config.place * 0.12, type: 'spring', stiffness: 120 }}
            className={clsx('flex flex-1 flex-col items-center gap-3', config.order)}
          >
            <div className="text-3xl sm:text-4xl">{config.medal}</div>
            <div className="panel-sm flex h-12 w-12 items-center justify-center rounded-full bg-coral font-display text-lg font-bold text-paper sm:h-16 sm:w-16 sm:text-xl">
              {entry.nickname.slice(0, 2).toUpperCase()}
            </div>
            <p className="max-w-[7rem] truncate text-center text-sm font-bold text-ink sm:text-base">{entry.nickname}</p>
            <p className="font-display text-lg font-extrabold text-coral-dark sm:text-2xl">{entry.bestScore}</p>
            <div className={clsx('w-full rounded-t-lg border-[2.5px] border-b-0 border-ink', config.height, config.bg)} />
          </motion.div>
        )
      })}
    </div>
  )
}
