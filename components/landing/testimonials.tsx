import { Quote } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { SectionHeading } from '@/components/landing/section-heading'
import { UserAvatar } from '@/components/shared/user-avatar'
import { getSkill } from '@/lib/data/skills'
import { TESTIMONIALS } from '@/lib/data/testimonials'

export function Testimonials() {
  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="scroll-mt-16 py-20 md:py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 md:px-6">
        <SectionHeading
          id="testimonials-title"
          eyebrow="Testimonials"
          title="Loved by learners across India"
          description="Stories from students and professionals who swapped their way to new skills."
        />
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <li key={testimonial.id}>
              <Card className="h-full">
                <CardContent className="flex flex-1 flex-col gap-4">
                  <Quote aria-hidden="true" className="size-5 text-primary/40" />
                  <blockquote className="text-sm leading-relaxed text-pretty text-foreground">
                    {`"${testimonial.quote}"`}
                  </blockquote>
                </CardContent>
                <CardFooter className="justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <UserAvatar name={testimonial.name} className="size-9" />
                    <div className="flex min-w-0 flex-col">
                      <span className="truncate text-sm font-medium text-foreground">{testimonial.name}</span>
                      <span className="truncate text-xs text-muted-foreground">{testimonial.role}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="shrink-0">
                    {getSkill(testimonial.skillId).name}
                  </Badge>
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
