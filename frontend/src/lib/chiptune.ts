interface Track {
  id: string
  name: string
  bpm: number
  waveform: OscillatorType
  bassWaveform: OscillatorType
  melody: number[]
  bass: number[]
  melodyGain: number
  bassGain: number
}

// 0 = pausa. Dez trilhas curtas e propositalmente simples/repetitivas em loop
// suave — geradas por osciladores (Web Audio API), sem nenhum arquivo de áudio.
export const TRACKS: Track[] = [
  {
    id: 'arcade',
    name: 'Arcade',
    bpm: 128,
    waveform: 'square',
    bassWaveform: 'triangle',
    melody: [523.25, 0, 659.25, 783.99, 880, 783.99, 659.25, 0, 523.25, 0, 587.33, 659.25, 783.99, 659.25, 587.33, 0],
    bass: [130.81, 130.81, 164.81, 164.81, 196.0, 196.0, 164.81, 164.81],
    melodyGain: 0.05,
    bassGain: 0.055,
  },
  {
    id: 'lofi',
    name: 'Lo-fi Quiz',
    bpm: 88,
    waveform: 'triangle',
    bassWaveform: 'sine',
    melody: [392, 0, 440, 0, 493.88, 440, 0, 392, 0, 349.23, 392, 0, 440, 392, 0, 0],
    bass: [98, 0, 98, 0, 110, 0, 87.31, 0],
    melodyGain: 0.045,
    bassGain: 0.05,
  },
  {
    id: 'boss',
    name: 'Retro Boss',
    bpm: 140,
    waveform: 'sawtooth',
    bassWaveform: 'square',
    melody: [293.66, 293.66, 349.23, 0, 349.23, 293.66, 261.63, 0, 293.66, 293.66, 392, 0, 349.23, 293.66, 261.63, 0],
    bass: [73.42, 73.42, 87.31, 87.31, 65.41, 65.41, 61.74, 61.74],
    melodyGain: 0.04,
    bassGain: 0.05,
  },
  {
    id: 'chillhop',
    name: 'Chillhop',
    bpm: 95,
    waveform: 'triangle',
    bassWaveform: 'sine',
    melody: [220, 0, 261.63, 0, 293.66, 261.63, 0, 220, 0, 329.63, 293.66, 0, 261.63, 0, 220, 0],
    bass: [110, 0, 110, 0, 130.81, 0, 98, 0],
    melodyGain: 0.04,
    bassGain: 0.045,
  },
  {
    id: 'trivia-pop',
    name: 'Trivia Pop',
    bpm: 132,
    waveform: 'square',
    bassWaveform: 'triangle',
    melody: [523.25, 587.33, 659.25, 587.33, 523.25, 0, 659.25, 783.99, 880, 783.99, 659.25, 0, 523.25, 587.33, 523.25, 0],
    bass: [196.0, 196.0, 220.0, 220.0, 261.63, 261.63, 220.0, 220.0],
    melodyGain: 0.05,
    bassGain: 0.05,
  },
  {
    id: 'space-quiz',
    name: 'Space Quiz',
    bpm: 80,
    waveform: 'sine',
    bassWaveform: 'sine',
    melody: [440, 0, 0, 523.25, 0, 0, 587.33, 0, 0, 523.25, 0, 0, 392, 0, 0, 0],
    bass: [110, 0, 130.81, 0, 146.83, 0, 130.81, 0],
    melodyGain: 0.045,
    bassGain: 0.05,
  },
  {
    id: 'adventure',
    name: '8-bit Adventure',
    bpm: 150,
    waveform: 'square',
    bassWaveform: 'triangle',
    melody: [261.63, 293.66, 329.63, 349.23, 392, 440, 493.88, 523.25, 493.88, 440, 392, 349.23, 329.63, 293.66, 261.63, 0],
    bass: [130.81, 130.81, 146.83, 146.83, 164.81, 164.81, 196.0, 196.0],
    melodyGain: 0.045,
    bassGain: 0.05,
  },
  {
    id: 'night-mode',
    name: 'Night Mode',
    bpm: 70,
    waveform: 'sine',
    bassWaveform: 'sine',
    melody: [329.63, 0, 0, 0, 392, 0, 0, 0, 349.23, 0, 0, 0, 293.66, 0, 0, 0],
    bass: [82.41, 0, 0, 0, 98.0, 0, 0, 0],
    melodyGain: 0.035,
    bassGain: 0.04,
  },
  {
    id: 'puzzle-time',
    name: 'Puzzle Time',
    bpm: 118,
    waveform: 'sawtooth',
    bassWaveform: 'square',
    melody: [392, 440, 0, 392, 349.23, 0, 392, 440, 493.88, 440, 0, 392, 349.23, 0, 329.63, 0],
    bass: [196.0, 0, 174.61, 0, 196.0, 0, 220.0, 0],
    melodyGain: 0.035,
    bassGain: 0.045,
  },
  {
    id: 'victory-loop',
    name: 'Victory Loop',
    bpm: 145,
    waveform: 'square',
    bassWaveform: 'triangle',
    melody: [523.25, 523.25, 523.25, 659.25, 0, 587.33, 587.33, 523.25, 0, 659.25, 783.99, 880, 783.99, 659.25, 523.25, 0],
    bass: [130.81, 130.81, 164.81, 164.81, 196.0, 196.0, 164.81, 164.81],
    melodyGain: 0.05,
    bassGain: 0.055,
  },
]

const STORAGE_KEY = 'pense-bem-web:track'

let audioCtx: AudioContext | null = null
let masterGain: GainNode | null = null
let intervalId: number | null = null
let stepIndex = 0
let playing = false
let currentTrack: Track = TRACKS[0]

function readStoredTrackId(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? TRACKS[0].id
  } catch {
    return TRACKS[0].id
  }
}

currentTrack = TRACKS.find((t) => t.id === readStoredTrackId()) ?? TRACKS[0]

function ensureContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext()
    masterGain = audioCtx.createGain()
    masterGain.gain.value = 0.9
    masterGain.connect(audioCtx.destination)
  }
  return audioCtx
}

function playNote(freq: number, time: number, duration: number, type: OscillatorType, peakGain: number) {
  if (!audioCtx || !masterGain || freq <= 0) return
  const osc = audioCtx.createOscillator()
  const gain = audioCtx.createGain()
  osc.type = type
  osc.frequency.value = freq
  gain.gain.setValueAtTime(0.0001, time)
  gain.gain.exponentialRampToValueAtTime(peakGain, time + 0.012)
  gain.gain.exponentialRampToValueAtTime(0.0001, time + duration)
  osc.connect(gain)
  gain.connect(masterGain)
  osc.start(time)
  osc.stop(time + duration + 0.02)
}

function tick() {
  if (!audioCtx) return
  const stepSeconds = 60 / currentTrack.bpm / 2
  const t = audioCtx.currentTime + 0.04
  const noteFreq = currentTrack.melody[stepIndex % currentTrack.melody.length]
  if (noteFreq > 0) playNote(noteFreq, t, stepSeconds * 0.85, currentTrack.waveform, currentTrack.melodyGain)
  if (stepIndex % 2 === 0) {
    const bassFreq = currentTrack.bass[(stepIndex / 2) % currentTrack.bass.length]
    playNote(bassFreq, t, stepSeconds * 1.7, currentTrack.bassWaveform, currentTrack.bassGain)
  }
  stepIndex++
}

function restartLoop() {
  if (intervalId !== null) {
    clearInterval(intervalId)
    intervalId = null
  }
  if (!playing || !audioCtx) return
  stepIndex = 0
  tick()
  intervalId = window.setInterval(tick, (60 / currentTrack.bpm / 2) * 1000)
}

export function listTracks(): { id: string; name: string }[] {
  return TRACKS.map((t) => ({ id: t.id, name: t.name }))
}

export function getCurrentTrackId(): string {
  return currentTrack.id
}

export function selectTrack(id: string): void {
  const track = TRACKS.find((t) => t.id === id)
  if (!track) return
  currentTrack = track
  try {
    localStorage.setItem(STORAGE_KEY, id)
  } catch {
    // localStorage indisponível — a escolha vale só para esta navegação.
  }
  restartLoop()
}

export function startMusic(): void {
  const ctx = ensureContext()
  if (ctx.state === 'suspended') void ctx.resume()
  if (playing) return
  playing = true
  restartLoop()
}

export function stopMusic(): void {
  playing = false
  if (intervalId !== null) {
    clearInterval(intervalId)
    intervalId = null
  }
}

export function toggleMusic(): boolean {
  if (playing) {
    stopMusic()
    return false
  }
  startMusic()
  return true
}

export function isMusicPlaying(): boolean {
  return playing
}

// audioCtx/intervalId vivem fora do ciclo de vida do React (estado de módulo).
// Sem isto, cada hot-reload deste arquivo em desenvolvimento deixava o loop
// antigo "fantasma" tocando sem que o botão de mute conseguisse pará-lo,
// porque o módulo novo só controla a SUA própria instância do timer.
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    stopMusic()
    audioCtx?.close().catch(() => {})
    audioCtx = null
  })
}
