import { clsx } from 'clsx'
import type { HTMLAttributes } from 'react'

export function Panel({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx('panel rounded-2xl p-6', className)} {...rest}>
      {children}
    </div>
  )
}
