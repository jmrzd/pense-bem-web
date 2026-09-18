import { useState, type FormEvent, type ReactNode } from 'react'

import { Button } from './Button'
import { Icon } from './Icon'
import { Panel } from './Panel'

const STORAGE_KEY = 'pense-bem-web:is-admin'

const API_URL =
  import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

function isUnlocked(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

export function AdminGate({
  children,
}: {
  children: ReactNode
}) {
  const [unlocked, setUnlocked] = useState(isUnlocked)
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (!code.trim()) {
      setError('Digite o código de acesso.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(
        `${API_URL}/admin/verify`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code,
          }),
        },
      )

      if (!response.ok) {
        setError('Código incorreto.')
        return
      }

      const data = await response.json()

      if (!data.authorized) {
        setError('Código incorreto.')
        return
      }

      try {
        localStorage.setItem(STORAGE_KEY, '1')
      } catch {
        // Se localStorage estiver indisponível,
        // o acesso vale somente nesta navegação.
      }

      setUnlocked(true)
      setCode('')
      setError('')
    } catch {
      setError(
        'Não foi possível conectar ao servidor. Tente novamente.',
      )
    } finally {
      setLoading(false)
    }
  }

  if (unlocked) {
    return <>{children}</>
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-20">
      <Panel className="ticket text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl border-2 border-ink bg-mustard text-chip-dark">
          <Icon name="alert" size={26} />
        </div>

        <h1 className="font-hero text-2xl">
          ÁREA RESTRITA
        </h1>

        <p className="mt-2 text-sm text-ink-soft">
          Esta página é de uso interno da equipe.
          Digite o código de acesso.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-5 text-left"
        >
          <input
            type="password"
            autoFocus
            value={code}
            disabled={loading}
            onChange={(event) => {
              setCode(event.target.value)
              setError('')
            }}
            placeholder="Código de acesso"
            className="w-full rounded-xl border-[2.5px] border-ink bg-cream px-4 py-3 text-center text-lg font-bold text-ink placeholder:text-ink-soft/50 focus:outline-none focus:ring-4 focus:ring-mustard disabled:cursor-not-allowed disabled:opacity-60"
          />

          {error && (
            <p className="mt-2 text-center text-sm font-bold text-coral-dark">
              {error}
            </p>
          )}

          <Button
            type="submit"
            size="lg"
            className="mt-4 w-full"
            disabled={loading}
          >
            {loading ? 'Verificando...' : 'Entrar'}
          </Button>
        </form>
      </Panel>
    </div>
  )
}