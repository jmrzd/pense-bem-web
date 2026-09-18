interface BaseTrack {
  id: string
  name: string
}

interface SynthTrack extends BaseTrack {
  type: 'synth'
  bpm: number
  waveform: OscillatorType
  bassWaveform: OscillatorType
  melody: number[]
  bass: number[]
  melodyGain: number
  bassGain: number
}

interface AudioTrack extends BaseTrack {
  type: 'audio'
  src: string
  volume: number
}

type Track = SynthTrack | AudioTrack

// Trilhas do Pense Bem.
// As trilhas "synth" são geradas pelo Web Audio API.
// As trilhas "audio" usam arquivos da pasta public/audio.
export const TRACKS: Track[] = [
  {
    id: 'green-hill-zone',
    name: 'Green Hill Zone',
    type: 'audio',
    src: '/audio/green-hill-zone.mp3',
    volume: 0.35,
  },

  {
    id: 'arcade',
    name: 'Arcade',
    type: 'synth',
    bpm: 128,
    waveform: 'square',
    bassWaveform: 'triangle',
    melody: [
      523.25, 0, 659.25, 783.99,
      880, 783.99, 659.25, 0,
      523.25, 0, 587.33, 659.25,
      783.99, 659.25, 587.33, 0,
    ],
    bass: [
      130.81, 130.81,
      164.81, 164.81,
      196, 196,
      164.81, 164.81,
    ],
    melodyGain: 0.05,
    bassGain: 0.055,
  },

  {
    id: 'lofi',
    name: 'Lo-fi Quiz',
    type: 'synth',
    bpm: 88,
    waveform: 'triangle',
    bassWaveform: 'sine',
    melody: [
      392, 0, 440, 0,
      493.88, 440, 0, 392,
      0, 349.23, 392, 0,
      440, 392, 0, 0,
    ],
    bass: [
      98, 0,
      98, 0,
      110, 0,
      87.31, 0,
    ],
    melodyGain: 0.045,
    bassGain: 0.05,
  },

  {
    id: 'boss',
    name: 'Retro Boss',
    type: 'synth',
    bpm: 140,
    waveform: 'sawtooth',
    bassWaveform: 'square',
    melody: [
      293.66, 293.66, 349.23, 0,
      349.23, 293.66, 261.63, 0,
      293.66, 293.66, 392, 0,
      349.23, 293.66, 261.63, 0,
    ],
    bass: [
      73.42, 73.42,
      87.31, 87.31,
      65.41, 65.41,
      61.74, 61.74,
    ],
    melodyGain: 0.04,
    bassGain: 0.05,
  },

  {
    id: 'chillhop',
    name: 'Chillhop',
    type: 'synth',
    bpm: 95,
    waveform: 'triangle',
    bassWaveform: 'sine',
    melody: [
      220, 0, 261.63, 0,
      293.66, 261.63, 0, 220,
      0, 329.63, 293.66, 0,
      261.63, 0, 220, 0,
    ],
    bass: [
      110, 0,
      110, 0,
      130.81, 0,
      98, 0,
    ],
    melodyGain: 0.04,
    bassGain: 0.045,
  },

  {
    id: 'trivia-pop',
    name: 'Trivia Pop',
    type: 'synth',
    bpm: 132,
    waveform: 'square',
    bassWaveform: 'triangle',
    melody: [
      523.25, 587.33, 659.25, 587.33,
      523.25, 0, 659.25, 783.99,
      880, 783.99, 659.25, 0,
      523.25, 587.33, 523.25, 0,
    ],
    bass: [
      196, 196,
      220, 220,
      261.63, 261.63,
      220, 220,
    ],
    melodyGain: 0.05,
    bassGain: 0.05,
  },

  {
    id: 'space-quiz',
    name: 'Space Quiz',
    type: 'synth',
    bpm: 80,
    waveform: 'sine',
    bassWaveform: 'sine',
    melody: [
      440, 0, 0, 523.25,
      0, 0, 587.33, 0,
      0, 523.25, 0, 0,
      392, 0, 0, 0,
    ],
    bass: [
      110, 0,
      130.81, 0,
      146.83, 0,
      130.81, 0,
    ],
    melodyGain: 0.045,
    bassGain: 0.05,
  },

  {
    id: 'adventure',
    name: '8-bit Adventure',
    type: 'synth',
    bpm: 150,
    waveform: 'square',
    bassWaveform: 'triangle',
    melody: [
      261.63, 293.66, 329.63, 349.23,
      392, 440, 493.88, 523.25,
      493.88, 440, 392, 349.23,
      329.63, 293.66, 261.63, 0,
    ],
    bass: [
      130.81, 130.81,
      146.83, 146.83,
      164.81, 164.81,
      196, 196,
    ],
    melodyGain: 0.045,
    bassGain: 0.05,
  },

  {
    id: 'night-mode',
    name: 'Night Mode',
    type: 'synth',
    bpm: 70,
    waveform: 'sine',
    bassWaveform: 'sine',
    melody: [
      329.63, 0, 0, 0,
      392, 0, 0, 0,
      349.23, 0, 0, 0,
      293.66, 0, 0, 0,
    ],
    bass: [
      82.41, 0, 0, 0,
      98, 0, 0, 0,
    ],
    melodyGain: 0.035,
    bassGain: 0.04,
  },

  {
    id: 'puzzle-time',
    name: 'Puzzle Time',
    type: 'synth',
    bpm: 118,
    waveform: 'sawtooth',
    bassWaveform: 'square',
    melody: [
      392, 440, 0, 392,
      349.23, 0, 392, 440,
      493.88, 440, 0, 392,
      349.23, 0, 329.63, 0,
    ],
    bass: [
      196, 0,
      174.61, 0,
      196, 0,
      220, 0,
    ],
    melodyGain: 0.035,
    bassGain: 0.045,
  },

  {
    id: 'victory-loop',
    name: 'Victory Loop',
    type: 'synth',
    bpm: 145,
    waveform: 'square',
    bassWaveform: 'triangle',
    melody: [
      523.25, 523.25, 523.25, 659.25,
      0, 587.33, 587.33, 523.25,
      0, 659.25, 783.99, 880,
      783.99, 659.25, 523.25, 0,
    ],
    bass: [
      130.81, 130.81,
      164.81, 164.81,
      196, 196,
      164.81, 164.81,
    ],
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

let externalAudio: HTMLAudioElement | null = null
let externalAudioSrc: string | null = null

let currentTrack: Track = TRACKS[0]

function readStoredTrackId(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? TRACKS[0].id
  } catch {
    return TRACKS[0].id
  }
}

currentTrack =
  TRACKS.find((track) => track.id === readStoredTrackId()) ??
  TRACKS[0]

function ensureContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext()

    masterGain = audioCtx.createGain()
    masterGain.gain.value = 0.9
    masterGain.connect(audioCtx.destination)
  }

  return audioCtx
}

function playNote(
  freq: number,
  time: number,
  duration: number,
  type: OscillatorType,
  peakGain: number,
) {
  if (!audioCtx || !masterGain || freq <= 0) return

  const osc = audioCtx.createOscillator()
  const gain = audioCtx.createGain()

  osc.type = type
  osc.frequency.value = freq

  gain.gain.setValueAtTime(0.0001, time)
  gain.gain.exponentialRampToValueAtTime(
    peakGain,
    time + 0.012,
  )
  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    time + duration,
  )

  osc.connect(gain)
  gain.connect(masterGain)

  osc.start(time)
  osc.stop(time + duration + 0.02)
}

function stopSynthLoop(): void {
  if (intervalId !== null) {
    clearInterval(intervalId)
    intervalId = null
  }
}

function stopExternalAudio(reset = true): void {
  if (!externalAudio) return

  externalAudio.pause()

  if (reset) {
    try {
      externalAudio.currentTime = 0
    } catch {
      // Ignora se o navegador ainda não carregou metadata suficiente.
    }
  }
}

function tick(): void {
  if (!audioCtx) return
  if (currentTrack.type !== 'synth') return

  const track = currentTrack

  const stepSeconds = 60 / track.bpm / 2
  const time = audioCtx.currentTime + 0.04

  const noteFreq =
    track.melody[stepIndex % track.melody.length]

  if (noteFreq > 0) {
    playNote(
      noteFreq,
      time,
      stepSeconds * 0.85,
      track.waveform,
      track.melodyGain,
    )
  }

  if (stepIndex % 2 === 0) {
    const bassFreq =
      track.bass[
        (stepIndex / 2) % track.bass.length
      ]

    if (bassFreq > 0) {
      playNote(
        bassFreq,
        time,
        stepSeconds * 1.7,
        track.bassWaveform,
        track.bassGain,
      )
    }
  }

  stepIndex++
}

function restartSynthLoop(): void {
  stopSynthLoop()

  if (!playing) return
  if (!audioCtx) return
  if (currentTrack.type !== 'synth') return

  stepIndex = 0

  tick()

  intervalId = window.setInterval(
    tick,
    (60 / currentTrack.bpm / 2) * 1000,
  )
}

function startExternalTrack(track: AudioTrack): void {
  stopSynthLoop()

  if (
    !externalAudio ||
    externalAudioSrc !== track.src
  ) {
    if (externalAudio) {
      externalAudio.pause()
    }

    externalAudio = new Audio(track.src)
    externalAudioSrc = track.src
  }

  externalAudio.loop = true
  externalAudio.volume = track.volume

  try {
    externalAudio.currentTime = 0
  } catch {
    // Pode acontecer antes de metadata carregar.
  }

  void externalAudio.play().catch((error) => {
    console.warn(
      'O navegador bloqueou a reprodução da música:',
      error,
    )
  })
}

function startSynthTrack(): void {
  stopExternalAudio()

  const ctx = ensureContext()

  if (ctx.state === 'suspended') {
    void ctx.resume()
  }

  restartSynthLoop()
}

function startCurrentTrack(): void {
  if (currentTrack.type === 'audio') {
    startExternalTrack(currentTrack)
    return
  }

  startSynthTrack()
}

export function listTracks(): {
  id: string
  name: string
}[] {
  return TRACKS.map((track) => ({
    id: track.id,
    name: track.name,
  }))
}

export function getCurrentTrackId(): string {
  return currentTrack.id
}

export function selectTrack(id: string): void {
  const track = TRACKS.find(
    (candidate) => candidate.id === id,
  )

  if (!track) return

  const wasPlaying = playing

  stopSynthLoop()
  stopExternalAudio()

  currentTrack = track

  try {
    localStorage.setItem(STORAGE_KEY, id)
  } catch {
    // A escolha vale apenas durante esta navegação.
  }

  if (wasPlaying) {
    startCurrentTrack()
  }
}

export function startMusic(): void {
  if (playing) return

  playing = true

  startCurrentTrack()
}

export function stopMusic(): void {
  playing = false

  stopSynthLoop()
  stopExternalAudio()
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

// Evita loops "fantasmas" durante hot reload do Vite.
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    stopMusic()

    if (externalAudio) {
      externalAudio.pause()
      externalAudio.src = ''
      externalAudio = null
      externalAudioSrc = null
    }

    audioCtx?.close().catch(() => {})

    audioCtx = null
    masterGain = null
  })
}