export function Loading({ label = 'Carregando...' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-ink-soft">
      <div className="h-14 w-14 animate-spin rounded-full border-[5px] border-ink border-t-mustard" />
      <p className="font-display text-sm font-bold uppercase tracking-widest">{label}</p>
    </div>
  )
}
