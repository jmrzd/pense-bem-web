/**
 * Metadados de apresentação dos programas (visual/copy), por `code`.
 *
 * As perguntas de verdade (com a resposta certa) ficam só no backend.
 * Isso aqui é só o "verniz": ícone, cor de destaque, texto de efeito
 * e algumas perguntas de exemplo pro teaser da home.
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
    code: '131',
    tagline: 'Sonic, Tails e muita velocidade',
    icon: '⚡',
    accent: 'mustard',
    previewQuestions: [
      'Sonic é um... superveloz.',
      'Qual é o animal terrestre mais veloz?',
      'O que significa ser supersônico?',
    ],
  },

  {
    code: '132',
    tagline: 'Aventuras, desafios e raciocínio',
    icon: '🌀',
    accent: 'coral',
    previewQuestions: [
      'Quem corre mais rápido?',
      'Qual é a ordem correta da história?',
      'Sonic gosta de correr?',
    ],
  },

  {
    code: '133',
    tagline: 'Movimento, transportes e invenções',
    icon: '🚀',
    accent: 'teal',
    previewQuestions: [
      'Qual veículo é mais veloz?',
      'O que faz um moinho se movimentar?',
      'Quem inventou o avião?',
    ],
  },

  {
    code: '134',
    tagline: 'Vento, som, luz e natureza',
    icon: '💨',
    accent: 'mustard',
    previewQuestions: [
      'O que é o vento?',
      'O que é mais rápido: luz ou som?',
      'O que é um furacão?',
    ],
  },

  {
    code: '135',
    tagline: 'Movimento e corpo em ação',
    icon: '🏁',
    accent: 'coral',
    previewQuestions: [
      'Qual é o meio mais rápido de se movimentar?',
      'Que animal voa mais rápido?',
      'Qual palavra indica movimento?',
    ],
  },
]

const DEFAULT_META: Omit<ProgramMeta, 'code'> = {
  tagline: '',
  icon: '⭐',
  accent: 'mustard',
  previewQuestions: [],
}

export function getProgramMeta(
  code: string,
): Omit<ProgramMeta, 'code'> {
  const meta = PROGRAM_META.find((m) => m.code === code)

  return meta ?? DEFAULT_META
}

export function getPreviewQuestions(): {
  programIcon: string
  text: string
}[] {
  return PROGRAM_META.flatMap((meta) =>
    meta.previewQuestions.map((text) => ({
      programIcon: meta.icon,
      text,
    })),
  )
}