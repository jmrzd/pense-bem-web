import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Icon } from './Icon'

const SESSION_KEY = 'pense-bem-web:splash-shown'
const FIRST_VISIT_MS = 3000
const RETURN_VISIT_MS = 700

function alreadyShown(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    return false
  }
}

export function SplashScreen() {
  const [visible, setVisible] = useState(true)
  const [durationMs] = useState(() => (alreadyShown() ? RETURN_VISIT_MS : FIRST_VISIT_MS))
  const isQuick = durationMs <= RETURN_VISIT_MS

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        sessionStorage.setItem(SESSION_KEY, '1')
      } catch {
        // sessionStorage indisponível — a splash sempre roda com a duração completa, sem impacto funcional.
      }
      setVisible(false)
    }, durationMs)
    return () => clearTimeout(timer)
  }, [durationMs])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6 bg-chip-dark text-chip-light"
        >
          <motion.div
            initial={{ scale: 0.6, rotate: -8, opacity: 0 }}
            animate={{ scale: 1, rotate: -4, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 140, damping: 12, delay: isQuick ? 0 : 0.1 }}
            className="flex h-20 w-20 items-center justify-center rounded-2xl border-[3px] border-chip-light bg-mustard text-chip-dark shadow-[6px_6px_0_0_var(--color-chip-light)]"
          >
            <Icon name="brain" size={36} strokeWidth={2.2} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isQuick ? 0 : 0.25 }}
            className="font-hero text-3xl tracking-wide sm:text-4xl"
          >
            PENSE BEM
          </motion.h1>

          <div className="h-4 w-56 overflow-hidden rounded-lg border-[2.5px] border-chip-light sm:w-72">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: durationMs / 1000, ease: 'linear' }}
              className="h-full bg-mustard"
            />
          </div>

          {!isQuick && (
            <motion.p
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
              className="font-display text-xs font-bold uppercase tracking-widest text-chip-light/70"
            >
              Carregando...
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
