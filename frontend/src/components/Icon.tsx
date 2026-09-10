import type { ReactElement, SVGProps } from 'react'

export type IconName =
  | 'gamepad'
  | 'trophy'
  | 'chart'
  | 'target'
  | 'rocket'
  | 'brain'
  | 'check'
  | 'x'
  | 'bulb'
  | 'crown'
  | 'flame'
  | 'sprout'
  | 'book'
  | 'arrowRight'
  | 'users'
  | 'wave'
  | 'star'
  | 'globe'
  | 'dna'
  | 'alert'

const PATHS: Record<IconName, ReactElement> = {
  gamepad: (
    <>
      <path d="M8 12h.01M6 10v4M4.5 8.5h3M17 11.5h.01M14.5 13.5h.01" />
      <path d="M7.5 6.5h9a4.5 4.5 0 0 1 4.4 5.4l-.6 3a3 3 0 0 1-5.2 1.6L14 15.5H10l-1.1 1a3 3 0 0 1-5.2-1.6l-.6-3a4.5 4.5 0 0 1 4.4-5.4Z" />
    </>
  ),
  trophy: (
    <>
      <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" />
      <path d="M8 5H5a2 2 0 0 0 0 4h1M16 5h3a2 2 0 0 1 0 4h-1" />
      <path d="M10 15v2M14 15v2M8 21h8M9.5 17h5l.5 4h-6l.5-4Z" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V10M10 20V4M16 20v-7M4 20h16" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 3c2.5 1.4 4 4 4 7.5 0 2-1 4-2 5.5l-2 2-2-2c-1-1.5-2-3.5-2-5.5 0-3.5 1.5-6.1 4-7.5Z" />
      <path d="M9.5 15 7 16.5 6 21l4-2.5M14.5 15l2.5 1.5L18 21l-4-2.5" />
      <circle cx="12" cy="10" r="1.4" fill="currentColor" />
    </>
  ),
  brain: (
    <>
      <path d="M9 4.5A2.5 2.5 0 0 0 6.5 7v.3A2.7 2.7 0 0 0 5 9.7v1.1a2.7 2.7 0 0 0 1 2.1v1.1A2.7 2.7 0 0 0 8.7 16.7 2.5 2.5 0 0 0 12 19V4.5a2.5 2.5 0 0 0-3-.9Z" />
      <path d="M15 4.5A2.5 2.5 0 0 1 17.5 7v.3A2.7 2.7 0 0 1 19 9.7v1.1a2.7 2.7 0 0 1-1 2.1v1.1a2.7 2.7 0 0 1-2.7 2.7A2.5 2.5 0 0 1 12 19" />
    </>
  ),
  check: <path d="M4.5 12.5 9 17l10.5-10.5" />,
  x: <path d="M6 6l12 12M18 6 6 18" />,
  bulb: (
    <>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.4.3.6.8.6 1.3V16h5.8v-.8c0-.5.2-1 .6-1.3A6 6 0 0 0 12 3Z" />
    </>
  ),
  crown: (
    <>
      <path d="M4 8l3.5 3L12 5l4.5 6L20 8l-1.5 9h-13L4 8Z" />
      <path d="M6.5 20h11" />
    </>
  ),
  flame: (
    <path d="M12 3c1 2-2 3.2-2 6a3 3 0 0 0 6 0c0-1-.4-1.8-1-2.5.6 3-1.5 4.5-1.5 7A4.5 4.5 0 0 1 9 18c-2.5-1-4-3.5-4-6C5 8 8 5.5 12 3Z" />
  ),
  sprout: (
    <>
      <path d="M12 21v-8" />
      <path d="M12 13c0-3.5-2.5-6-6-6 0 3.5 2.5 6 6 6ZM12 13c0-4 3-7 7-7 0 4-3 7-7 7Z" />
    </>
  ),
  book: (
    <>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H12v18H6.5A2.5 2.5 0 0 1 4 18.5v-13Z" />
      <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H12v18h5.5a2.5 2.5 0 0 0 2.5-2.5v-13Z" />
    </>
  ),
  arrowRight: <path d="M4.5 12h15M13.5 6l6 6-6 6" />,
  users: (
    <>
      <circle cx="8.5" cy="8" r="3" />
      <path d="M2.5 19c0-3 2.7-5 6-5s6 2 6 5" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M15.8 14.2c2.4.3 4.2 2 4.2 4.3" />
    </>
  ),
  wave: <path d="M4 15c1.5-3 3.5-3 5-1.5s3.5 1.5 5 0 3.5-1.5 5 1.5M4 9c1.5-3 3.5-3 5-1.5s3.5 1.5 5 0 3.5-1.5 5 1.5" />,
  star: <path d="M12 3.5l2.4 5.3 5.8.6-4.4 4 1.3 5.7L12 16l-5.1 3.1 1.3-5.7-4.4-4 5.8-.6L12 3.5Z" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.2 2.2 3.4 5.2 3.4 8.5s-1.2 6.3-3.4 8.5c-2.2-2.2-3.4-5.2-3.4-8.5S9.8 5.7 12 3.5Z" />
    </>
  ),
  dna: (
    <>
      <path d="M7 3c0 4 10 4 10 8s-10 4-10 8M17 3c0 4-10 4-10 8s10 4 10 8" />
      <path d="M8 7h8M8 17h8" />
    </>
  ),
  alert: (
    <>
      <path d="M12 3.5 21 19.5H3L12 3.5Z" />
      <path d="M12 10v4M12 17h.01" />
    </>
  ),
}

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName
  size?: number
}

export function Icon({ name, size = 20, strokeWidth = 2.2, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      {PATHS[name]}
    </svg>
  )
}
