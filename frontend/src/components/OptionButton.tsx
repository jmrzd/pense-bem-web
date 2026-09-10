import { clsx } from 'clsx'
import { Icon } from './Icon'
import type { Option } from '../types'

export type OptionStatus = 'idle' | 'selected' | 'correct' | 'incorrect' | 'reveal-correct' | 'disabled'

const STATUS_CLASSES: Record<OptionStatus, string> = {
  idle: 'bg-paper hover:bg-mustard/25',
  selected: 'bg-cobalt text-paper',
  correct: 'bg-teal text-paper',
  incorrect: 'bg-coral text-paper',
  'reveal-correct': 'bg-teal text-paper',
  disabled: 'bg-paper opacity-50',
}

const TILTS = ['-0.8deg', '0.6deg', '-0.5deg', '0.9deg']
const SETTLED: OptionStatus[] = ['correct', 'incorrect', 'reveal-correct', 'disabled']

interface OptionButtonProps {
  option: Option
  status: OptionStatus
  disabled?: boolean
  onClick: () => void
}

export function OptionButton({ option, status, disabled, onClick }: OptionButtonProps) {
  const isPressable = !disabled
  const tiltIndex = option.id.charCodeAt(0) % TILTS.length
  const rotate = SETTLED.includes(status) ? '0deg' : TILTS[tiltIndex]

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{ rotate, transition: 'rotate 0.2s ease' }}
      className={clsx(
        'panel-sm flex w-full items-center gap-4 rounded-xl border-[2.5px] border-ink px-5 py-4 text-left font-semibold transition-colors disabled:cursor-not-allowed',
        isPressable && 'press-sm',
        STATUS_CLASSES[status],
      )}
    >
      <span
        className={clsx(
          'flex h-9 w-9 flex-none items-center justify-center rounded-lg border-2 border-ink font-display text-sm font-bold',
          status === 'correct' || status === 'reveal-correct'
            ? 'bg-paper text-teal'
            : status === 'incorrect'
              ? 'bg-paper text-coral'
              : status === 'selected'
                ? 'bg-paper text-cobalt'
                : 'bg-cream text-ink',
        )}
      >
        {option.id}
      </span>
      <span>{option.text}</span>
      {status === 'correct' && <Icon name="check" size={20} className="ml-auto flex-none" />}
      {status === 'incorrect' && <Icon name="x" size={20} className="ml-auto flex-none" />}
      {status === 'reveal-correct' && <Icon name="bulb" size={20} className="ml-auto flex-none" />}
    </button>
  )
}
