import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RatingProps {
  value: number
  reviewCount?: number
  className?: string
}

export function Rating({ value, reviewCount, className }: RatingProps) {
  return (
    <span className={cn('inline-flex items-center gap-1 text-sm', className)}>
      <Star aria-hidden="true" className="size-4 fill-warning text-warning" />
      <span className="font-medium text-foreground">{value.toFixed(1)}</span>
      {reviewCount !== undefined && <span className="text-muted-foreground">({reviewCount})</span>}
      <span className="sr-only">out of 5 stars</span>
    </span>
  )
}
