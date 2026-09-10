import { motion } from 'framer-motion'
import { Panel } from '../components/Panel'
import { AnimatedNumber } from '../components/AnimatedNumber'
import { Icon, type IconName } from '../components/Icon'

interface StatTileProps {
  icon: IconName
  label: string
  value: number
  suffix?: string
  accent?: string
  delay?: number
}

export function StatTile({ icon, label, value, suffix, accent = 'bg-mustard', delay = 0 }: StatTileProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.4 }}>
      <Panel className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className={`flex h-8 w-8 items-center justify-center rounded-lg border-2 border-ink ${accent}`}>
            <Icon name={icon} size={16} />
          </span>
        </div>
        <p className="font-display text-3xl font-extrabold">
          <AnimatedNumber value={value} />
          {suffix}
        </p>
        <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">{label}</p>
      </Panel>
    </motion.div>
  )
}
