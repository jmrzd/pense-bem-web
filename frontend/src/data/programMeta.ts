/**
 * Metadados de apresentação dos programas (visual/copy), por `code`.
 *
 * As perguntas de verdade (com a resposta certa) ficam só no backend —
 * ver backend/scripts/seed_programs.py. Isso aqui é só o "verniz": ícone,
 * cor de destaque, texto de efeito e algumas perguntas de exemplo pro
 * teaser da home (puramente decorativo, sem gabarito nenhum).
 */

export interface ProgramMeta {
  code: string
  tagline: string
  icon: string
  accent: 'mustard' | 'coral' | 'teal'
  previewQuestions: string[]
}

export const PROGRAM_META: ProgramMeta[] = [
  {
    code: 'conhecimentos-gerais',
    tagline: 'Cultura, geografia e história num só programa',
    icon: '🌍',
    accent: 'mustard',
    previewQuestions: [
      'Qual é o menor país do mundo?',
      'Qual é a capital da França?',
      'Quem escreveu "Dom Casmurro"?',
    ],
  },
  {
    code: 'ciencia-natureza',
    tagline: 'Do átomo às estrelas',
    icon: '🧬',
    accent: 'teal',
    previewQuestions: [
      'Qual é o maior planeta do sistema solar?',
      'Quantos corações tem um polvo?',
      'Qual é o processo pelo qual as plantas produzem energia?',
    ],
  },
  {
    code: 'games-cultura-pop',
    tagline: 'Para quem vive conectado',
    icon: '🎮',
    accent: 'coral',
    previewQuestions: [
      'Qual é o nome do reino onde se passa "The Legend of Zelda"?',
      'Qual empresa é a criadora do PlayStation?',
      'Qual é o nome do vilão principal em "Super Mario Bros"?',
    ],
  },
]

const DEFAULT_META: Omit<ProgramMeta, 'code'> = {
  tagline: '',
  icon: '⭐',
  accent: 'mustard',
  previewQuestions: [],
}

export function getProgramMeta(code: string): Omit<ProgramMeta, 'code'> {
  const meta = PROGRAM_META.find((m) => m.code === code)
  return meta ?? DEFAULT_META
}

export function getPreviewQuestions(): { programIcon: string; text: string }[] {
  return PROGRAM_META.flatMap((meta) => meta.previewQuestions.map((text) => ({ programIcon: meta.icon, text })))
}
