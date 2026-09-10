import { clsx } from 'clsx'

const ROTATIONS = ['-6deg', '4deg', '-4deg']

export function AttemptsDots({ attemptNumber }: { attemptNumber: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3].map((n) => (
        <span
          key={n}
          style={{ rotate: n === attemptNumber ? ROTATIONS[n - 1] : '0deg' }}
          className={clsx(
            'h-3.5 w-3.5 rounded-sm border-2 border-ink transition-all',
            n < attemptNumber && 'bg-coral',
            n === attemptNumber && 'scale-125 bg-mustard',
            n > attemptNumber && 'bg-paper',
          )}
        />
      ))}
    </div>
  )
}
