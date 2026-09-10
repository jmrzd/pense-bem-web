import { motion } from 'framer-motion'
import type { RankingEntry } from '../types'

export function RankingTable({ entries }: { entries: RankingEntry[] }) {
  if (entries.length === 0) {
    return <p className="py-6 text-center text-ink-soft">Ninguém além do pódio ainda. Jogue para aparecer aqui!</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[420px] border-separate border-spacing-y-2 text-left text-sm">
        <thead>
          <tr className="text-xs font-bold uppercase tracking-wider text-ink-soft">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Jogador</th>
            <th className="px-4 py-2">Melhor pontuação</th>
            <th className="px-4 py-2">Partidas</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <motion.tr   
              key={entry.playerId}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
              className="border-2 border-ink bg-paper"
            >
              <td className="rounded-l-lg px-4 py-3 font-display font-bold text-ink-soft">{index + 4}º</td>
              <td className="px-4 py-3 font-bold text-ink">{entry.nickname}</td>
              <td className="px-4 py-3 font-display font-bold text-coral-dark">{entry.bestScore}</td>
              <td className="rounded-r-lg px-4 py-3 text-ink-soft">{entry.matchCount}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
