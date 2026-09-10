import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { usePlayer } from '../context/PlayerContext'

export function RequirePlayer({ children }: { children: ReactNode }) {
  const { player } = usePlayer()
  if (!player) return <Navigate to="/" replace />
  return <>{children}</>
}
