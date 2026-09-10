import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { identifyPlayer, getCurrentPlayer, signOutPlayer } from '../services/playerService'
import type { Player } from '../types'

interface PlayerContextValue {
  player: Player | null
  setNickname: (nickname: string) => Player
  clearPlayer: () => void
}

const PlayerContext = createContext<PlayerContextValue | null>(null)

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [player, setPlayer] = useState<Player | null>(() => getCurrentPlayer())

  const setNickname = useCallback((nickname: string) => {
    const identified = identifyPlayer(nickname)
    setPlayer(identified)
    return identified
  }, [])

  const clearPlayer = useCallback(() => {
    signOutPlayer()
    setPlayer(null)
  }, [])

  const value = useMemo(() => ({ player, setNickname, clearPlayer }), [player, setNickname, clearPlayer])

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
}

export function usePlayer(): PlayerContextValue {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer deve ser usado dentro de PlayerProvider')
  return ctx
}
