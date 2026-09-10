import type { CSSProperties } from 'react'

export function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-cream">
      <div className="dot-grid absolute inset-0" />

      <div
        className="animate-float-slow absolute -left-6 top-24 h-16 w-16 rotate-[-8deg] rounded-full border-[3px] border-ink bg-mustard sm:h-20 sm:w-20"
        style={{ '--rot': '-8deg' } as CSSProperties}
      />
      <div className="animate-wiggle absolute right-6 top-40 hidden h-14 w-14 border-[3px] border-ink bg-coral sm:block" />
      <div
        className="animate-float-slow absolute bottom-24 left-10 hidden h-10 w-10 rotate-45 border-[3px] border-ink bg-teal md:block"
        style={{ '--rot': '45deg', animationDelay: '1.2s' } as CSSProperties}
      />
      <div className="absolute bottom-10 right-16 hidden h-24 w-24 rotate-[10deg] items-center justify-center border-[3px] border-ink bg-paper text-3xl shadow-[5px_5px_0_0_var(--color-ink)] lg:flex">
        ⭐
      </div>
    </div>
  )
}
