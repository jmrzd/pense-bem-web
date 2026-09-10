import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useTheme } from '../hooks/useTheme'
import type { DashboardStats } from '../types'

const THEME_HEX = {
  light: { ink: '#17130f', paper: '#fffbf2' },
  dark: { ink: '#f3ede0', paper: '#241f18' },
}

export function ScoreDistributionChart({ data }: { data: DashboardStats['scoreDistribution'] }) {
  const { resolved } = useTheme()
  const { ink, paper } = THEME_HEX[resolved]

  const hasData = data.some((d) => d.total > 0)
  if (!hasData) {
    return <p className="py-10 text-center text-ink-soft">Sem partidas suficientes para montar a distribuição.</p>
  }

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 10, right: 16, bottom: 0, left: -16 }}>
        <XAxis dataKey="label" stroke={ink} fontSize={12} tickLine={false} axisLine={{ stroke: ink, strokeWidth: 2 }} />
        <YAxis stroke={ink} fontSize={12} tickLine={false} axisLine={{ stroke: ink, strokeWidth: 2 }} allowDecimals={false} />
        <Tooltip
          contentStyle={{
            background: paper,
            border: `2.5px solid ${ink}`,
            borderRadius: 10,
            color: ink,
            fontWeight: 600,
          }}
        />
        <Bar dataKey="total" radius={[6, 6, 0, 0]} fill="#ffc738" stroke={ink} strokeWidth={2} />
      </BarChart>
    </ResponsiveContainer>
  )
}
