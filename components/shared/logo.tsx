import Link from 'next/link'
import { ArrowLeftRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LogoProps {
  href?: string
  className?: string
  showWordmark?: boolean
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground',
        className,
      )}
    >
      <ArrowLeftRight className="size-4" strokeWidth={2.5} />
    </span>
  )
}

export function Logo({ href = '/', className, showWordmark = true }: LogoProps) {
  return (
    <Link href={href} className={cn('flex items-center gap-2 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50', className)}>
      <LogoMark />
      {showWordmark ? (
        <span className="text-lg font-semibold tracking-tight text-foreground">
          Skill<span className="text-primary">Swap</span>
        </span>
      ) : (
        <span className="sr-only">SkillSwap</span>
      )}
    </Link>
  )
}
