import { clsx } from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { getCurrentTrackId, isMusicPlaying, listTracks, selectTrack, toggleMusic } from '../lib/chiptune'
import { Icon } from './Icon'

export function MusicMenu() {
  const [musicOn, setMusicOn] = useState(isMusicPlaying)
  const [open, setOpen] = useState(false)
  const [trackId, setTrackId] = useState(getCurrentTrackId)
  const containerRef = useRef<HTMLDivElement>(null)
  const tracks = listTracks()

  useEffect(() => {
    if (!open) return
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  function handleToggleMusic() {
    setMusicOn(toggleMusic())
  }

  function handleSelectTrack(id: string) {
    selectTrack(id)
    setTrackId(id)
    setOpen(false)
    if (!musicOn) setMusicOn(toggleMusic())
  }

  return (
    <div ref={containerRef} className="relative flex items-center gap-1.5">
      <button
        onClick={handleToggleMusic}
        title={musicOn ? 'Desligar música' : 'Ligar música'}
        className={clsx(
          'panel-sm press-sm flex h-8 w-8 flex-none items-center justify-center rounded-lg sm:h-9 sm:w-9',
          musicOn ? 'bg-mustard text-chip-dark' : 'bg-paper',
        )}
      >
        <Icon name={musicOn ? 'volumeOn' : 'volumeOff'} size={16} />
      </button>

      <button
        onClick={() => setOpen((o) => !o)}
        title="Escolher música"
        className="panel-sm press-sm flex h-8 flex-none items-center gap-1 rounded-lg bg-paper px-1.5 sm:h-9"
      >
        <Icon name="musicNote" size={14} />
        <Icon name="chevronDown" size={12} className={clsx('transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="panel-sm scrollbar-thin absolute right-0 top-full z-50 mt-2 max-h-72 w-48 overflow-y-auto rounded-lg bg-paper p-1">
          {tracks.map((track) => (
            <button
              key={track.id}
              onClick={() => handleSelectTrack(track.id)}
              className={clsx(
                'flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-bold transition-colors',
                trackId === track.id ? 'bg-mustard text-chip-dark' : 'hover:bg-mustard/20',
              )}
            >
              <Icon name="musicNote" size={13} className="flex-none" />
              {track.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
