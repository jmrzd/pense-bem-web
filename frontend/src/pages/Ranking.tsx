import { motion } from 'framer-motion'
import { Icon } from '../components/Icon'
import { PageHeading } from '../components/PageHeading'
import { Panel } from '../components/Panel'
import { Podium } from '../dashboard/Podium'
import { RankingTable } from '../dashboard/RankingTable'
import { useRanking } from '../hooks/useRanking'

export function Ranking() {
  const ranking = useRanking()
  const rest = ranking.slice(3)

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <PageHeading icon="trophy" title="RANKING GERAL" subtitle="O melhor score de cada jogador, feito de partidas reais." />
      </motion.div>

      {ranking.length === 0 ? (
        <Panel className="mx-auto max-w-md bg-mustard text-center text-chip-dark">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl border-2 border-ink bg-paper">
            <Icon name="gamepad" size={26} />
          </div>
          <p className="mt-3 font-display font-bold">Ninguém jogou ainda</p>
          <p className="mt-1 text-sm opacity-70">Seja o primeiro a aparecer no ranking!</p>
        </Panel>
      ) : (
        <>
          <Panel className="pb-2">
            <Podium entries={ranking} />
          </Panel>

          {rest.length > 0 && (
            <Panel className="mt-8">
              <RankingTable entries={rest} />
            </Panel>
          )}
        </>
      )}
    </div>
  )
}
