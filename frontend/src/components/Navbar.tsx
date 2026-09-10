import { NavLink } from 'react-router-dom'
import { clsx } from 'clsx'
import { usePlayer } from '../context/PlayerContext'
import { useTheme } from '../hooks/useTheme'
import { Icon, type IconName } from './Icon'
import { MusicMenu } from './MusicMenu'

const LINKS: { to: string; label: string; icon: IconName }[] = [
  { to: '/programas', label: 'Jogar', icon: 'gamepad' },
  { to: '/ranking', label: 'Ranking', icon: 'trophy' },
]

export function Navbar() {
  const { player, clearPlayer } = usePlayer()
  const { resolved, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-40 border-b-[3px] border-ink bg-cream">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <NavLink to="/" className="flex items-center gap-2 font-hero text-base sm:text-lg">
          <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg border-[3px] border-ink bg-mustard text-chip-dark shadow-[3px_3px_0_0_var(--color-ink)]">
            <Icon name="brain" size={18} strokeWidth={2.4} />
          </span>
          <span>PENSE BEM</span>
        </NavLink>

        <div className="flex items-center gap-2 sm:gap-3">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                clsx(
                  'panel-sm press-sm flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-bold sm:px-4 sm:py-2 sm:text-sm',
                  isActive ? 'bg-mustard text-chip-dark' : 'bg-paper',
                )
              }
            >
              <Icon name={link.icon} size={16} />
              <span className="hidden sm:inline">{link.label}</span>
            </NavLink>
          ))}

          <button
            onClick={toggleTheme}
            title={resolved === 'dark' ? 'Modo claro' : 'Modo escuro'}
            className="panel-sm press-sm flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-paper sm:h-9 sm:w-9"
          >
            <Icon name={resolved === 'dark' ? 'sun' : 'moon'} size={16} />
          </button>

          <MusicMenu />

          {player && (
            <button
              onClick={clearPlayer}
              title="Sair"
              className="panel-sm press-sm flex items-center gap-1.5 rounded-lg bg-paper px-2.5 py-1.5 text-xs font-bold sm:px-3 sm:py-2"
            >
              <span className="hidden sm:inline">{player.nickname}</span>
              <Icon name="wave" size={16} />
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}
