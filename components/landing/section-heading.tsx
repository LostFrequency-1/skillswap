import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
  id?: string
}

export function SectionHeading({ eyebrow, title, description, align = 'center', id }: SectionHeadingProps) {
  return (
    <div className={cn('flex max-w-2xl flex-col gap-3', align === 'center' && 'mx-auto items-center text-center')}>
      <p className="text-sm font-semibold text-primary">{eyebrow}</p>
      <h2 id={id} className="text-3xl font-semibold tracking-tight text-balance text-foreground md:text-4xl">
        {title}
      </h2>
      {description && <p className="text-pretty text-muted-foreground">{description}</p>}
    </div>
  )
}
