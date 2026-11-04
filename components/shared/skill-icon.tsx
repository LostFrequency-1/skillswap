import { SKILL_ICONS } from '@/lib/skill-icons'
import type { SkillId } from '@/lib/types'
import { cn } from '@/lib/utils'

const SIZES = {
  sm: 'size-7 rounded-md [&_svg]:size-3.5',
  md: 'size-10 rounded-lg [&_svg]:size-5',
  lg: 'size-12 rounded-xl [&_svg]:size-6',
}

interface SkillIconProps {
  skillId: SkillId
  size?: keyof typeof SIZES
  className?: string
}

export function SkillIcon({ skillId, size = 'md', className }: SkillIconProps) {
  const Icon = SKILL_ICONS[skillId]
  return (
    <span
      aria-hidden="true"
      className={cn('flex shrink-0 items-center justify-center bg-secondary text-primary', SIZES[size], className)}
    >
      <Icon />
    </span>
  )
}
