import { api } from '../lib/api'
import { storage } from '../lib/storage'
import type { Player } from '../types'

const CURRENT_KEY = 'current-player'

interface PlayerDto {
  id: number
  nickname: string
  created_at: string
}

function fromDto(dto: PlayerDto): Player {
  return { id: String(dto.id), nickname: dto.nickname, createdAt: dto.created_at }
}

export function getCurrentPlayer(): Player | null {
  return storage.read<Player | null>(CURRENT_KEY, null)
}

export async function identifyPlayer(nickname: string): Promise<Player> {
  const dto = await api.post<PlayerDto>('/players', { nickname: nickname.trim() })
  const player = fromDto(dto)
  storage.write(CURRENT_KEY, player)
  return player
}

export function signOutPlayer(): void {
  storage.write(CURRENT_KEY, null)
}

export const playerService = { getCurrentPlayer, identifyPlayer, signOutPlayer }
