import { Button } from './Button'
import { Icon } from './Icon'
import { Panel } from './Panel'

interface ErrorMessageProps {
  title?: string
  message: string
  onRetry?: () => void
}

export function ErrorMessage({ title = 'Algo não saiu como esperado', message, onRetry }: ErrorMessageProps) {
  return (
    <Panel className="mx-auto max-w-md bg-coral text-center text-chip-light">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl border-2 border-ink bg-paper text-ink">
        <Icon name="alert" size={24} />
      </div>
      <h3 className="font-display text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm text-chip-light/90">{message}</p>
      {onRetry && (
        <Button variant="secondary" size="md" className="mt-5" onClick={onRetry}>
          Tentar novamente
        </Button>
      )}    
    </Panel>
  )
}
