import { Icon, type IconName } from './Icon'

interface PageHeadingProps {
  icon: IconName
  title: string
  subtitle?: string
  accent?: string
}

export function PageHeading({ icon, title, subtitle, accent = 'bg-mustard' }: PageHeadingProps) {
  return (
    <div className="text-center">
      <div
        className={`panel-sm mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl ${accent}`}
      >
        <Icon name={icon} size={26} />
      </div>
      <h1 className="font-hero text-4xl sm:text-5xl">{title}</h1>
      {subtitle && <p className="mt-3 text-ink-soft">{subtitle}</p>}
    </div>
  )
}
