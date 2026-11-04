import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { SectionHeading } from '@/components/landing/section-heading'
import { SkillIcon } from '@/components/shared/skill-icon'
import { SKILLS } from '@/lib/data/skills'

export function SkillCategories() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="scroll-mt-16 border-y bg-card py-20 md:py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 md:px-6">
        <SectionHeading
          id="skills-title"
          eyebrow="Featured skills"
          title="Six core skills, every level covered"
          description="We are starting focused. Each skill has Beginner, Intermediate and Advanced assessments."
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((skill) => (
            <li key={skill.id}>
              <Link
                href={`/explore?skill=${skill.id}`}
                className="group block h-full rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <Card className="h-full transition-colors group-hover:ring-primary/40">
                  <CardHeader className="flex-row items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <SkillIcon skillId={skill.id} />
                      <div className="flex flex-col gap-0.5">
                        <CardTitle>{skill.name}</CardTitle>
                        <span className="text-xs text-muted-foreground">{skill.category}</span>
                      </div>
                    </div>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 text-muted-foreground transition-colors group-hover:text-primary"
                    />
                  </CardHeader>
                  <CardContent className="flex flex-col gap-3">
                    <CardDescription>{skill.description}</CardDescription>
                    <div className="flex flex-wrap gap-1.5">
                      {skill.topics.slice(0, 3).map((topic) => (
                        <Badge key={topic} variant="secondary">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="justify-between text-sm text-muted-foreground">
                    <span>
                      <span className="font-medium text-foreground">{skill.teacherCount}</span> teachers
                    </span>
                    <span>
                      <span className="font-medium text-foreground">{skill.learnerCount}</span> learners
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
