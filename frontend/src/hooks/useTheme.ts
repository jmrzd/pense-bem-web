import { useCallback, useEffect, useState } from 'react'

export type ThemePreference = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'

const STORAGE_KEY = 'pense-bem-web:theme'

function readStoredPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    // localStorage indisponível — cai para a preferência do sistema.
  }
  return 'system'
}

function getSystemPrefersDark(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function applyThemeAttribute(preference: ThemePreference) {
  const root = document.documentElement
  if (preference === 'system') {
    root.removeAttribute('data-theme')
  } else {
    root.setAttribute('data-theme', preference)
  }
}

export function useTheme() {
  const [preference, setPreference] = useState<ThemePreference>(readStoredPreference)
  const [systemPrefersDark, setSystemPrefersDark] = useState(getSystemPrefersDark)

  const resolved: ResolvedTheme = preference === 'system' ? (systemPrefersDark ? 'dark' : 'light') : preference

  useEffect(() => {
    applyThemeAttribute(preference)

    try {
      if (preference === 'system') localStorage.removeItem(STORAGE_KEY)
      else localStorage.setItem(STORAGE_KEY, preference)
    } catch {
      // localStorage indisponível — a preferência vale só para esta navegação.
    }
  }, [preference])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => setSystemPrefersDark(media.matches)
    media.addEventListener('change', handler)
    return () => media.removeEventListener('change', handler)
  }, [])

  const toggleTheme = useCallback(() => {
    setPreference((prev) => {
      const current = prev === 'system' ? (getSystemPrefersDark() ? 'dark' : 'light') : prev
      return current === 'dark' ? 'light' : 'dark'
    })
  }, [])

  return { resolved, toggleTheme }
}
