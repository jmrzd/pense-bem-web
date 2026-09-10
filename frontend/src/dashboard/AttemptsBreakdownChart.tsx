import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import type { DashboardStats } from '../types'

const COLORS = ['#1c8c74', '#3a5dae', '#ffc738', '#ff5a3c']

export function AttemptsBreakdownChart({ stats }: { stats: DashboardStats }) {
  const data = [
    { name: '1ª tentativa', value: stats.firstAttemptHits },
    { name: '2ª tentativa', value: stats.secondAttemptHits },
    { name: '3ª tentativa', value: stats.thirdAttemptHits },
    { name: 'Erradas', value: stats.missedCount },
  ]

  const total = data.reduce((acc, d) => acc + d.value, 0)
  if (total === 0) {
    return <p className="py-10 text-center text-ink-soft">Nenhuma resposta registrada ainda.</p>
  }

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <ResponsiveContainer width="100%" height={220} className="max-w-[220px]">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3} stroke="#17130f" strokeWidth={2}>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: '#fffbf2',
              border: '2.5px solid #17130f',
              borderRadius: 10,
              color: '#17130f',
              fontWeight: 600,
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <ul className="flex flex-col gap-2 text-sm">
        {data.map((d, index) => (
          <li key={d.name} className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full border-2 border-ink" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
            <span className="font-semibold text-ink-soft">{d.name}</span>
            <span className="font-display font-bold text-ink">{d.value}</span>
            <span className="text-xs text-ink-soft">({Math.round((d.value / total) * 100)}%)</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
