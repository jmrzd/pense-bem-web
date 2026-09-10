const ITEMS = ['30 PERGUNTAS', '3 TENTATIVAS', '90 PONTOS', 'RANKING REAL', 'DASHBOARD AO VIVO', 'SEM CADASTRO']

export function Marquee() {
  return (
    <div className="overflow-hidden border-b-[3px] border-ink bg-ink">
      <div className="marquee-track flex py-2">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex flex-none">
            {ITEMS.map((item, i) => (
              <span
                key={`${copy}-${i}`}
                className="mx-5 flex flex-none items-center gap-2 whitespace-nowrap font-display text-xs font-bold uppercase tracking-widest text-cream"
              >
                <span className="text-mustard">★</span>
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
