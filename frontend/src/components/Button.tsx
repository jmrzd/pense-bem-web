import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { clsx } from 'clsx'

type NativeButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'>

interface ButtonProps extends NativeButtonProps {
  variant?: 'primary' | 'secondary' | 'coral' | 'teal' | 'danger'
  size?: 'md' | 'lg'
  icon?: ReactNode
}

const VARIANTS: Record<string, string> = {
  primary: 'bg-mustard text-ink',
  secondary: 'bg-paper text-ink',
  coral: 'bg-coral text-paper',
  teal: 'bg-teal text-paper',
  danger: 'bg-coral text-paper',
}

const SIZES: Record<string, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-8 py-4 text-base',
}

export function Button({ variant = 'primary', size = 'md', icon, className, children, disabled, ...rest }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={clsx(
        'panel-sm press-sm inline-flex items-center justify-center gap-2 rounded-xl font-display font-bold tracking-wide disabled:cursor-not-allowed disabled:opacity-40',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...rest}
    >
      {icon}
      {children}
    </button>
  )
}
