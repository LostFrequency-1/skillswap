import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getInitials } from '@/lib/format'
import { cn } from '@/lib/utils'

interface UserAvatarProps {
  name: string
  src?: string
  className?: string
}

export function UserAvatar({ name, src, className }: UserAvatarProps) {
  return (
    <Avatar className={className}>
      {src && <AvatarImage src={src} alt={name} />}
      <AvatarFallback className={cn('bg-secondary font-medium text-secondary-foreground')}>
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  )
}
