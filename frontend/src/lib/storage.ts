const PREFIX = 'pense-bem-web:'

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function write<T>(key: string, value: T): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    // localStorage indisponível (modo privado, quota etc.) — a experiência
    // continua funcionando na sessão atual, apenas sem persistência.
  }
}

export const storage = { read, write }
