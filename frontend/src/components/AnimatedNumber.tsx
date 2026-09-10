import { useEffect, useRef, useState } from 'react'

interface AnimatedNumberProps {
  value: number
  durationMs?: number
  className?: string
}

export function AnimatedNumber({ value, durationMs = 900, className }: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const fromRef = useRef(0)

  useEffect(() => {
    const from = fromRef.current
    const start = performance.now()
    let frame = 0

    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / durationMs, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(Math.round(from + (value - from) * eased))
      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        fromRef.current = value
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value, durationMs])

  return <span className={className}>{displayValue}</span>
}
