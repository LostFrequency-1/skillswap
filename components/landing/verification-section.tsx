import { Check, Star } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { SectionHeading } from '@/components/landing/section-heading'
import { SkillIcon } from '@/components/shared/skill-icon'
import { LevelBadge, VerifiedBadge } from '@/components/shared/status-badges'

const RULES = [
  'Anyone can offer to teach — verification is optional, not a gate.',
  'Attempt an MCQ or practical assessment at any level you choose.',
  'Passing unlocks a verified badge for that specific teaching level.',
  'Retake failed assessments after a short cooldown to improve.',
]

const LEVELS = [
  { level: 'Beginner', score: 92, verified: true },
  { level: 'Intermediate', score: 81, verified: true },
  { level: 'Advanced', score: 58, verified: false },
] as const

export function VerificationSection() {
  return (
    <section id="verification" aria-labelledby="verification-title" className="scroll-mt-16 py-20 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-6 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
          <SectionHeading
            id="verification-title"
            align="left"
            eyebrow="How verification works"
            title="Proof of knowledge, earned level by level"
            description="Learners can see exactly which levels a teacher has proven through assessments, separately from the reputation they have built through ratings."
          />
          <ul className="flex flex-col gap-3">
            {RULES.map((rule) => (
              <li key={rule} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
                  <Check aria-hidden="true" className="size-3" strokeWidth={3} />
                </span>
                <span className="text-sm text-foreground">{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        <Card>
          <CardHeader className="flex-row items-center gap-3">
            <SkillIcon skillId="python" size="lg" />
            <div className="flex flex-col gap-1">
              <CardTitle>Python</CardTitle>
              <CardDescription>Example verification record · Priya Iyer</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Knowledge verification</p>
              <p className="text-xs text-muted-foreground">Pass mark: 70%</p>
            </div>
            <ul className="flex flex-col gap-4">
              {LEVELS.map((item) => (
                <li key={item.level} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <LevelBadge level={item.level} />
                    <VerifiedBadge verified={item.verified} />
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={item.score} className="flex-1" aria-label={`${item.level} score`} />
                    <span className="w-10 text-right text-sm font-medium tabular-nums text-foreground">
                      {item.score}%
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <Separator />
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Teaching reputation</p>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-sm">
                  <Star aria-hidden="true" className="size-4 fill-warning text-warning" />
                  <span className="font-medium text-foreground">4.9</span>
                  <span className="text-muted-foreground">from 32 learner reviews</span>
                </span>
                <span className="text-sm text-muted-foreground">41 sessions</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
