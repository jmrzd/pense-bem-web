import { createId } from '../lib/id'
import { storage } from '../lib/storage'
import type { Player } from '../types'

const KEY = 'players'
const CURRENT_KEY = 'current-player-id'

function listPlayers(): Player[] {
  return storage.read<Player[]>(KEY, [])
}

function saveAll(players: Player[]): void {
  storage.write(KEY, players)
}

export function getCurrentPlayer(): Player | null {
  const id = storage.read<string | null>(CURRENT_KEY, null)
  if (!id) return null
  return listPlayers().find((p) => p.id === id) ?? null
}

export function identifyPlayer(nickname: string): Player {
  const trimmed = nickname.trim()
  const players = listPlayers()
  const existing = players.find((p) => p.nickname.toLowerCase() === trimmed.toLowerCase())

  const player: Player = existing ?? {
    id: createId('player'),
    nickname: trimmed,
    createdAt: new Date().toISOString(),
  }

  if (!existing) {
    players.push(player)
    saveAll(players)
  }

  storage.write(CURRENT_KEY, player.id)
  return player
}

export function signOutPlayer(): void {
  storage.write(CURRENT_KEY, null)
}

export const playerService = { getCurrentPlayer, identifyPlayer, signOutPlayer, listPlayers }
