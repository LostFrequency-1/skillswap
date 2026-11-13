'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowRight, BadgeCheck, Search, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SkillIcon } from '@/components/shared/skill-icon'
import { UserAvatar } from '@/components/shared/user-avatar'
import { SKILLS } from '@/lib/data/skills'

export function Hero() {
  const router = useRouter()

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const query = new FormData(event.currentTarget).get('q')?.toString().trim()
    router.push(query ? `/explore?q=${encodeURIComponent(query)}` : '/explore')
  }

  return (
    <section className="border-b bg-card">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <Badge variant="secondary" className="w-fit">
            <Sparkles data-icon="inline-start" />
            Free, peer-to-peer skill exchange
          </Badge>
          <h1 className="text-4xl font-semibold tracking-tight text-balance text-foreground md:text-5xl lg:text-6xl">
            Share What You Know. <span className="text-primary">Learn What You Love.</span>
          </h1>
          <p className="max-w-xl text-lg text-pretty text-muted-foreground">
            Teach a skill you are good at, learn one you have always wanted. SkillSwap verifies teaching levels
            through assessments and matches you with partners who fit your goals and schedule.
          </p>

          <form role="search" onSubmit={handleSearch} className="flex max-w-xl flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <label htmlFor="hero-search" className="sr-only">
                Search for a skill
              </label>
              <Input
                id="hero-search"
                name="q"
                type="search"
                placeholder="Try React, Rust or Data Analysis"
                className="h-11 bg-background pl-9"
              />
            </div>
            <Button type="submit" size="lg" className="h-11">
              Explore skills
              <ArrowRight data-icon="inline-end" />
            </Button>
          </form>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">Popular:</span>
            {SKILLS.slice(0, 4).map((skill) => (
              <Button
                key={skill.id}
                variant="outline"
                size="sm"
                onClick={() => router.push(`/explore?skill=${skill.id}`)}
              >
                {skill.name}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <div className="flex -space-x-2">
              {['Priya Iyer', 'Rohan Mehta', 'Ananya Reddy', 'Vikram Nair'].map((name) => (
                <UserAvatar key={name} name={name} className="size-8 ring-2 ring-card" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">2,400+ learners</span> from 180 colleges already swapping
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl border bg-muted">
            <Image
              src="/images/hero-learners.png"
              alt="Two students sharing a laptop while working through code together"
              width={1200}
              height={900}
              priority
              className="aspect-[4/3] w-full object-cover"
            />
          </div>

          <div className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-xl border bg-card p-3 shadow-sm sm:left-6">
            <SkillIcon skillId="java" />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">Java · Intermediate</span>
              <span className="flex items-center gap-1 text-xs text-success">
                <BadgeCheck aria-hidden="true" className="size-3.5" />
                Verified teaching level
              </span>
            </div>
          </div>

          <div className="absolute -top-4 right-4 hidden flex-col gap-1 rounded-xl border bg-card p-3 shadow-sm sm:flex">
            <span className="text-xs text-muted-foreground">Match score</span>
            <span className="text-xl font-semibold text-primary">94%</span>
          </div>
        </div>
      </div>
    </section>
  )
}
