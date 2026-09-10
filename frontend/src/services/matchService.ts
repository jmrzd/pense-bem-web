import { storage } from '../lib/storage'
import type { Match } from '../types'

const KEY = 'matches'
const LAST_MATCH_KEY = 'last-match-id'

export function listMatches(): Match[] {
  return storage.read<Match[]>(KEY, [])
}

export function saveMatch(match: Match): void {
  const matches = listMatches()
  matches.push(match)
  storage.write(KEY, matches)
  storage.write(LAST_MATCH_KEY, match.id)
}

export function getLastMatch(): Match | null {
  const id = storage.read<string | null>(LAST_MATCH_KEY, null)
  if (!id) return null
  return listMatches().find((m) => m.id === id) ?? null
}

export function listMatchesByPlayer(playerId: string): Match[] {
  return listMatches()
    .filter((m) => m.playerId === playerId)
    .sort((a, b) => new Date(a.finishedAt).getTime() - new Date(b.finishedAt).getTime())
}

export const matchService = { listMatches, saveMatch, getLastMatch, listMatchesByPlayer }
