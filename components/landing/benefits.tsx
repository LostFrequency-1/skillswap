import { CalendarClock, GraduationCap, HandCoins, MessagesSquare, ShieldCheck, Users } from 'lucide-react'
import { SectionHeading } from '@/components/landing/section-heading'

const BENEFITS = [
  {
    icon: HandCoins,
    title: 'Zero cost learning',
    description: 'Your knowledge is the currency. Teach an hour, learn an hour — no subscriptions or fees.',
  },
  {
    icon: GraduationCap,
    title: 'Learn by teaching',
    description: 'Explaining a concept to someone else is the fastest way to master it yourself.',
  },
  {
    icon: ShieldCheck,
    title: 'Trust you can see',
    description: 'Verified levels and peer ratings help you choose the right partner with confidence.',
  },
  {
    icon: CalendarClock,
    title: 'Flexible scheduling',
    description: 'Match with partners who share your free slots, then book sessions in a couple of clicks.',
  },
  {
    icon: MessagesSquare,
    title: 'Built-in collaboration',
    description: 'Chat, share notes and problem sets, and keep every exchange organised in one place.',
  },
  {
    icon: Users,
    title: 'A peer community',
    description: 'Learn alongside students and early-career developers who are on the same journey.',
  },
]

export function Benefits() {
  return (
    <section aria-labelledby="benefits-title" className="border-y bg-card py-20 md:py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 md:px-6">
        <SectionHeading
          id="benefits-title"
          eyebrow="Why peer-to-peer"
          title="Learning that works both ways"
          description="SkillSwap is designed around reciprocity, so every member is both a learner and a teacher."
        />
        <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((benefit) => (
            <li key={benefit.title} className="flex gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-background text-primary">
                <benefit.icon aria-hidden="true" className="size-5" />
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="font-medium text-foreground">{benefit.title}</h3>
                <p className="text-sm text-pretty text-muted-foreground">{benefit.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
