import { api } from '../lib/api'
import { getProgramMeta } from '../data/programMeta'
import type { Option, Program, Question } from '../types'

interface ProgramDto {
  id: number
  code: string
  title: string
  description: string | null
  active: boolean
}

interface OptionDto {
  id: number
  option_code: string
  option_text: string
}

interface QuestionDto {
  id: number
  question_number: number
  prompt: string
  options: OptionDto[]
}

function fromProgramDto(dto: ProgramDto): Program {
  const meta = getProgramMeta(dto.code)
  return {
    id: dto.code,
    apiProgramId: dto.id,
    name: dto.title,
    tagline: meta.tagline,
    description: dto.description ?? '',
    icon: meta.icon,
    accent: meta.accent,
    questions: [],
  }
}

function fromOptionDto(dto: OptionDto): Option {
  return { id: dto.option_code, apiOptionId: dto.id, text: dto.option_text }
}

function fromQuestionDto(dto: QuestionDto): Question {
  return {
    id: dto.id,
    questionNumber: dto.question_number,
    prompt: dto.prompt,
    options: dto.options.map(fromOptionDto),
  }
}

export async function fetchPrograms(): Promise<Program[]> {
  const dtos = await api.get<ProgramDto[]>('/programs')
  return dtos.map(fromProgramDto)
}

export async function fetchProgram(code: string): Promise<Program | undefined> {
  const programs = await fetchPrograms()
  return programs.find((p) => p.id === code)
}

export async function fetchProgramQuestions(apiProgramId: number): Promise<Question[]> {
  const dtos = await api.get<QuestionDto[]>(`/programs/${apiProgramId}/questions`)
  return dtos.map(fromQuestionDto)
}

export async function fetchProgramWithQuestions(code: string): Promise<Program | undefined> {
  const program = await fetchProgram(code)
  if (!program) return undefined
  const questions = await fetchProgramQuestions(program.apiProgramId)
  return { ...program, questions }
}
