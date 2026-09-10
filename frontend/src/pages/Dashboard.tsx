import { motion } from 'framer-motion'
import { Icon } from '../components/Icon'
import { PageHeading } from '../components/PageHeading'
import { Panel } from '../components/Panel'
import { AttemptsBreakdownChart } from '../dashboard/AttemptsBreakdownChart'
import { ScoreDistributionChart } from '../dashboard/ScoreDistributionChart'
import { ScoreEvolutionChart } from '../dashboard/ScoreEvolutionChart'
import { StatTile } from '../dashboard/StatTile'
import { useDashboard } from '../hooks/useDashboard'

export function Dashboard() {
  const stats = useDashboard()

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <PageHeading icon="chart" title="DASHBOARD" subtitle="Estatísticas construídas a partir de partidas reais do jogo." />
      </motion.div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <StatTile icon="users" label="Jogadores" value={stats.totalPlayers} delay={0} accent="bg-cobalt" />
        <StatTile icon="gamepad" label="Partidas" value={stats.totalMatches} delay={0.05} accent="bg-coral" />
        <StatTile icon="chart" label="Média" value={stats.averageScore} delay={0.1} accent="bg-teal" />
        <StatTile icon="target" label="Acertos" value={stats.accuracyRate} suffix="%" delay={0.15} accent="bg-mustard" />
        <StatTile icon="crown" label="Melhor score" value={stats.bestScore} delay={0.2} accent="bg-coral" />
        <StatTile icon="flame" label="Partidas do +ativo" value={stats.mostActivePlayerMatches} delay={0.25} accent="bg-teal" />
      </div>

      <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-ink-soft">
        <span className="flex items-center gap-1.5">
          <Icon name="trophy" size={15} /> Recorde de <span className="font-bold text-ink">{stats.bestScoreNickname}</span>
        </span>
        <span>·</span>
        <span className="flex items-center gap-1.5">
          <Icon name="flame" size={15} /> Jogador mais ativo:{' '}
          <span className="font-bold text-ink">{stats.mostActivePlayer}</span>
        </span>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel>
          <h2 className="flex items-center gap-2 font-display text-lg font-bold">
            <Icon name="chart" size={18} /> Evolução das últimas partidas
          </h2>
          <ScoreEvolutionChart data={stats.scoreEvolution} />
        </Panel>

        <Panel>
          <h2 className="flex items-center gap-2 font-display text-lg font-bold">
            <Icon name="target" size={18} /> Acertos por tentativa
          </h2>
          <AttemptsBreakdownChart stats={stats} />
        </Panel>

        <Panel>
          <h2 className="flex items-center gap-2 font-display text-lg font-bold">
            <Icon name="chart" size={18} /> Distribuição de pontuações
          </h2>
          <ScoreDistributionChart data={stats.scoreDistribution} />
        </Panel>

        <Panel>
          <h2 className="flex items-center gap-2 font-display text-lg font-bold">
            <Icon name="x" size={18} /> Perguntas com maior índice de erro
          </h2>
          {stats.hardestQuestions.length === 0 ? (
            <p className="py-10 text-center text-ink-soft">Sem dados suficientes ainda.</p>
          ) : (
            <ul className="mt-4 flex flex-col gap-3">
              {stats.hardestQuestions.map((q, index) => (
                <li key={q.prompt} className="panel-sm flex items-center gap-3 rounded-lg bg-paper p-3">
                  <span className="font-display text-lg font-extrabold text-coral-dark">{index + 1}º</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-ink">{q.prompt}</p>
                    <p className="text-xs text-ink-soft">{q.programName}</p>
                  </div>
                  <span className="flex-none font-display font-bold text-coral-dark">{q.missRate}%</span>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </div>
  )
}
