import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Logo } from '@/components/shared/logo'
import { SKILLS } from '@/lib/data/skills'

const FOOTER_LINKS = [
  {
    title: 'Platform',
    links: [
      { label: 'Explore skills', href: '/explore' },
      { label: 'Assessments', href: '/assessments' },
      { label: 'Verification', href: '/verification' },
      { label: 'Skill matching', href: '/matches' },
    ],
  },
  {
    title: 'Skills',
    links: SKILLS.map((skill) => ({ label: skill.name, href: `/explore?skill=${skill.id}` })),
  },
  {
    title: 'Account',
    links: [
      { label: 'Log in', href: '/login' },
      { label: 'Create account', href: '/register' },
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Admin console', href: '/admin' },
    ],
  },
]

export function CallToAction() {
  return (
    <section aria-labelledby="cta-title" className="px-4 pb-20 md:px-6 md:pb-24">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 rounded-2xl bg-primary px-6 py-12 text-primary-foreground md:flex-row md:items-center md:justify-between md:px-12">
        <div className="flex max-w-xl flex-col gap-2">
          <h2 id="cta-title" className="text-2xl font-semibold tracking-tight text-balance md:text-3xl">
            Ready to make your first swap?
          </h2>
          <p className="text-pretty text-primary-foreground/80">
            Set up your skill profile in under five minutes and get your first match recommendations instantly.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="lg" variant="secondary" render={<Link href="/register" />} nativeButton={false}>
            Create free account
            <ArrowRight data-icon="inline-end" />
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            render={<Link href="/explore" />}
            nativeButton={false}
          >
            Browse teachers
          </Button>
        </div>
      </div>
    </section>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div className="flex max-w-xs flex-col gap-3">
            <Logo />
            <p className="text-sm text-pretty text-muted-foreground">
              An AI-assisted, peer-to-peer platform for exchanging skills without monetary transactions.
            </p>
          </div>
          {FOOTER_LINKS.map((column) => (
            <nav key={column.title} aria-label={column.title} className="flex flex-col gap-3">
              <h3 className="text-sm font-medium text-foreground">{column.title}</h3>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <Separator />
        <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>{`© ${new Date().getFullYear()} SkillSwap. Built for learners, by learners.`}</p>
          <p>Frontend prototype · Mock data only</p>
        </div>
      </div>
    </footer>
  )
}
