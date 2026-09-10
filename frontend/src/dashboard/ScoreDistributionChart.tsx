import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { DashboardStats } from '../types'

export function ScoreDistributionChart({ data }: { data: DashboardStats['scoreDistribution'] }) {
  const hasData = data.some((d) => d.total > 0)
  if (!hasData) {
    return <p className="py-10 text-center text-ink-soft">Sem partidas suficientes para montar a distribuição.</p>
  }

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 10, right: 16, bottom: 0, left: -16 }}>
        <XAxis dataKey="label" stroke="#17130f" fontSize={12} tickLine={false} axisLine={{ stroke: '#17130f', strokeWidth: 2 }} />
        <YAxis
          stroke="#17130f"
          fontSize={12}
          tickLine={false}
          axisLine={{ stroke: '#17130f', strokeWidth: 2 }}  
          allowDecimals={false}
        />
        <Tooltip
          contentStyle={{
            background: '#fffbf2',
            border: '2.5px solid #17130f',
            borderRadius: 10,
            color: '#17130f',
            fontWeight: 600,
          }}
        />
        <Bar dataKey="total" radius={[6, 6, 0, 0]} fill="#ffc738" stroke="#17130f" strokeWidth={2} />
      </BarChart>
    </ResponsiveContainer>
  )
}
