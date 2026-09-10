import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useTheme } from '../hooks/useTheme'
import type { DashboardStats } from '../types'

const THEME_HEX = {
  light: { ink: '#17130f', paper: '#fffbf2' },
  dark: { ink: '#f3ede0', paper: '#241f18' },
}

export function ScoreEvolutionChart({ data }: { data: DashboardStats['scoreEvolution'] }) {
  const { resolved } = useTheme()
  const { ink, paper } = THEME_HEX[resolved]

  if (data.length === 0) {
    return <p className="py-10 text-center text-ink-soft">Ainda não há partidas suficientes para exibir a evolução.</p>
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 10, right: 16, bottom: 0, left: -16 }}>
        <defs>
          <linearGradient id="scoreFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff5a3c" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#ff5a3c" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <XAxis dataKey="matchLabel" stroke={ink} fontSize={12} tickLine={false} axisLine={{ stroke: ink, strokeWidth: 2 }} />
        <YAxis stroke={ink} fontSize={12} tickLine={false} axisLine={{ stroke: ink, strokeWidth: 2 }} domain={[0, 90]} />
        <Tooltip
          contentStyle={{
            background: paper,
            border: `2.5px solid ${ink}`,
            borderRadius: 10,
            color: ink,
            fontWeight: 600,
          }}
          labelFormatter={(label, payload) => `${label} · ${payload?.[0]?.payload?.nickname ?? ''}`}
        />
        <Area type="monotone" dataKey="score" stroke={ink} strokeWidth={3} fill="url(#scoreFill)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
