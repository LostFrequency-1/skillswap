import { BadgeCheck, CircleDashed, Signal, SignalHigh, SignalMedium } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { ProficiencyLevel } from '@/lib/types'
import { cn } from '@/lib/utils'

const LEVEL_ICONS = {
  Beginner: SignalMedium,
  Intermediate: SignalHigh,
  Advanced: Signal,
} satisfies Record<ProficiencyLevel, unknown>

export function LevelBadge({ level, className }: { level: ProficiencyLevel; className?: string }) {
  const Icon = LEVEL_ICONS[level]
  return (
    <Badge variant="outline" className={cn('text-muted-foreground', className)}>
      <Icon data-icon="inline-start" />
      {level}
    </Badge>
  )
}

interface VerifiedBadgeProps {
  level?: ProficiencyLevel
  verified?: boolean
  className?: string
}

export function VerifiedBadge({ level, verified = true, className }: VerifiedBadgeProps) {
  if (!verified) {
    return (
      <Badge variant="outline" className={cn('border-dashed text-muted-foreground', className)}>
        <CircleDashed data-icon="inline-start" />
        {level ? `${level} · Unverified` : 'Unverified'}
      </Badge>
    )
  }

  return (
    <Badge
      variant="outline"
      className={cn('border-success/30 bg-success/10 text-success', className)}
    >
      <BadgeCheck data-icon="inline-start" />
      {level ? `${level} · Verified` : 'Verified'}
    </Badge>
  )
}
