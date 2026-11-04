import { ArrowLeftRight, ClipboardCheck, Sparkles, UserRoundPlus } from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SectionHeading } from '@/components/landing/section-heading'

const STEPS = [
  {
    icon: UserRoundPlus,
    title: 'Create your skill profile',
    description: 'List what you can teach, what you want to learn, your current level and when you are free.',
  },
  {
    icon: ClipboardCheck,
    title: 'Verify your level',
    description: 'Optionally take a skill assessment. Passing unlocks a verified badge for that teaching level.',
  },
  {
    icon: Sparkles,
    title: 'Get matched',
    description: 'Our matching engine ranks partners by skill fit, desired level, verification and availability.',
  },
  {
    icon: ArrowLeftRight,
    title: 'Swap and grow',
    description: 'Send a request, schedule sessions, chat and share resources. No money changes hands.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-it-works-title" className="scroll-mt-16 py-20 md:py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 md:px-6">
        <SectionHeading
          id="how-it-works-title"
          eyebrow="How SkillSwap works"
          title="From sign-up to your first session in four steps"
          description="A simple, structured flow so both partners know exactly what they are teaching and learning."
        />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <li key={step.title}>
              <Card className="h-full">
                <CardHeader className="gap-4">
                  <div className="flex items-center justify-between">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
                      <step.icon aria-hidden="true" className="size-5" />
                    </span>
                    <span className="font-mono text-sm text-muted-foreground">0{index + 1}</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <CardTitle>{step.title}</CardTitle>
                    <CardDescription>{step.description}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
