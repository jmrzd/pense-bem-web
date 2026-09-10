import { motion } from 'framer-motion'

export function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="h-4 w-full overflow-hidden rounded-lg border-[3px] border-ink bg-paper">
      <motion.div
        className="h-full bg-mustard"
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={{ type: 'spring', stiffness: 90, damping: 18 }}
      />
    </div>
  )
}
