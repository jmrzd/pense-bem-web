import { getProgramById, programs } from '../data/programs'
import type { Program } from '../types'

export function listPrograms(): Program[] {
  return programs
}

export function getProgram(id: string): Program | undefined {
  return getProgramById(id)
}

export const programService = { listPrograms, getProgram }
