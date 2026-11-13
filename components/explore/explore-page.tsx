'use client'

import { useMemo, useState } from 'react'
import { Check, Filter, Search, SlidersHorizontal, X } from 'lucide-react'
import { toast } from 'sonner'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { SkillIcon } from '@/components/shared/skill-icon'
import { LevelBadge, VerifiedBadge } from '@/components/shared/status-badges'
import { Rating } from '@/components/shared/rating'
import { UserAvatar } from '@/components/shared/user-avatar'
import { PageHeader } from '@/components/shared/page-header'
import { SKILLS } from '@/lib/data/skills'
import { TEACHERS } from '@/lib/data/teachers'
import type { ProficiencyLevel, SkillId } from '@/lib/types'

function TeacherCard({ teacher, onRequest }: { teacher: (typeof TEACHERS)[number]; onRequest: () => void }) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-sm">
      <CardContent className="flex flex-col gap-5 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <UserAvatar name={teacher.name} className="size-12" />
            <div className="min-w-0">
              <h3 className="truncate font-semibold text-foreground">{teacher.name}</h3>
              <p className="truncate text-sm text-muted-foreground">{teacher.headline}</p>
              <p className="text-xs text-muted-foreground">{teacher.college} · {teacher.city}</p>
            </div>
          </div>
          <Badge variant="secondary" className="shrink-0">{teacher.completedSessions} swaps</Badge>
        </div>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{teacher.bio}</p>
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Teaches</p>
          <div className="flex flex-wrap gap-2">
            {teacher.teaches.map((teaching) => {
              const skill = SKILLS.find((item) => item.id === teaching.skillId)!
              return (
                <div key={teaching.skillId} className="flex items-center gap-2 rounded-lg border bg-muted/40 px-2 py-1.5">
                  <SkillIcon skillId={teaching.skillId} size="sm" />
                  <span className="text-sm font-medium">{skill.name}</span>
                  <VerifiedBadge level={teaching.verifiedLevels.at(-1)} className="hidden sm:inline-flex" />
                </div>
              )
            })}
          </div>
        </div>
        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex flex-col gap-1">
            <Rating value={teacher.rating} reviewCount={teacher.reviewCount} />
            <span className="truncate text-xs text-success">Available {Object.entries(teacher.availability.byDay).flatMap(([day, dayTimes]) => (dayTimes ?? []).map((time) => `${day} ${time}`)).join(' · ')}</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => toast.info(`${teacher.name}'s profile`, { description: 'Full public profile will open in the next flow.' })}>View profile</Button>
            <Button size="sm" onClick={onRequest}>Send request</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function FilterPanel({ selectedSkill, setSelectedSkill, verifiedOnly, setVerifiedOnly, level, setLevel }: { selectedSkill: string; setSelectedSkill: (value: string) => void; verifiedOnly: boolean; setVerifiedOnly: (value: boolean) => void; level: string; setLevel: (value: string) => void }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="skill-filter">Skill</Label>
        <Select value={selectedSkill} onValueChange={(value) => value && setSelectedSkill(value)}>
          <SelectTrigger id="skill-filter"><SelectValue placeholder="All skills" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All skills</SelectItem>
            {SKILLS.map((skill) => <SelectItem key={skill.id} value={skill.id}>{skill.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="level-filter">Teaching level</Label>
        <Select value={level} onValueChange={(value) => value && setLevel(value)}>
          <SelectTrigger id="level-filter"><SelectValue placeholder="Any level" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any level</SelectItem>
            {(['Beginner', 'Intermediate', 'Advanced'] as ProficiencyLevel[]).map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-3">
        <Checkbox checked={verifiedOnly} onCheckedChange={(checked) => setVerifiedOnly(checked === true)} />
        <span className="flex flex-col gap-0.5"><span className="text-sm font-medium">Verified teachers only</span><span className="text-xs text-muted-foreground">Show proven teaching levels</span></span>
      </label>
    </div>
  )
}

export function ExplorePage() {
  const [query, setQuery] = useState('')
  const [selectedSkill, setSelectedSkill] = useState('all')
  const [level, setLevel] = useState('all')
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [sort, setSort] = useState('relevance')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const teachers = useMemo(() => {
    const filtered = TEACHERS.filter((teacher) => {
      const searchable = `${teacher.name} ${teacher.headline} ${teacher.college} ${teacher.city}`.toLowerCase()
      const matchesQuery = !query || searchable.includes(query.toLowerCase()) || teacher.teaches.some((item) => SKILLS.find((skill) => skill.id === item.skillId)?.name.toLowerCase().includes(query.toLowerCase()))
      const matchesSkill = selectedSkill === 'all' || teacher.teaches.some((item) => item.skillId === selectedSkill)
      const matchesLevel = level === 'all' || teacher.teaches.some((item) => item.verifiedLevels.includes(level as ProficiencyLevel))
      const matchesVerified = !verifiedOnly || teacher.teaches.some((item) => item.verifiedLevels.length > 0)
      return matchesQuery && matchesSkill && matchesLevel && matchesVerified
    })
    return [...filtered].sort((a, b) => sort === 'rating' ? b.rating - a.rating : b.completedSessions - a.completedSessions)
  }, [query, selectedSkill, level, verifiedOnly, sort])

  const clearFilters = () => { setSelectedSkill('all'); setLevel('all'); setVerifiedOnly(false); setQuery('') }
  const hasFilters = selectedSkill !== 'all' || level !== 'all' || verifiedOnly || query.length > 0

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Explore skills" description="Find a learning partner who matches your goals, level and availability." actions={<Button onClick={() => toast.info('Matching preferences saved', { description: 'We will use these filters for your next recommendations.' })}><SlidersHorizontal data-icon="inline-start" /> Save preferences</Button>} />
      <Card><CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1"><Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" /><Label htmlFor="teacher-search" className="sr-only">Search skills or teachers</Label><Input id="teacher-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by skill, teacher, college or city..." className="pl-9" /></div>
        <div className="flex gap-2"><Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}><SheetTrigger render={<Button variant="outline" className="lg:hidden" />}><Filter data-icon="inline-start" /> Filters</SheetTrigger><SheetContent><SheetHeader><SheetTitle>Filter teachers</SheetTitle></SheetHeader><div className="px-4"><FilterPanel selectedSkill={selectedSkill} setSelectedSkill={setSelectedSkill} verifiedOnly={verifiedOnly} setVerifiedOnly={setVerifiedOnly} level={level} setLevel={setLevel} /></div></SheetContent></Sheet><Select value={sort} onValueChange={(value) => value && setSort(value)}><SelectTrigger className="w-36"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="relevance">Relevance</SelectItem><SelectItem value="rating">Top rated</SelectItem></SelectContent></Select></div>
      </CardContent></Card>
      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block"><Card><CardContent className="p-4"><div className="mb-4 flex items-center justify-between"><p className="font-medium">Filters</p>{hasFilters && <Button variant="ghost" size="sm" onClick={clearFilters}>Clear</Button>}</div><FilterPanel selectedSkill={selectedSkill} setSelectedSkill={setSelectedSkill} verifiedOnly={verifiedOnly} setVerifiedOnly={setVerifiedOnly} level={level} setLevel={setLevel} /></CardContent></Card></aside>
        <section aria-live="polite" className="flex flex-col gap-4"><div className="flex items-center justify-between"><p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">{teachers.length}</span> teachers found</p>{hasFilters && <Button variant="ghost" size="sm" onClick={clearFilters}><X data-icon="inline-start" /> Clear filters</Button>}</div>{teachers.length > 0 ? <div className="grid gap-4 xl:grid-cols-2">{teachers.map((teacher) => <TeacherCard key={teacher.id} teacher={teacher} onRequest={() => toast.success('Exchange request started', { description: `We will help you set up a swap with ${teacher.name}.` })} />)}</div> : <Card><CardContent className="flex flex-col items-center gap-3 py-16 text-center"><Search className="size-8 text-muted-foreground" /><p className="font-medium">No teachers match these filters</p><p className="text-sm text-muted-foreground">Try widening your search or clearing a filter.</p><Button variant="outline" onClick={clearFilters}>Clear filters</Button></CardContent></Card>}</section>
      </div>
    </div>
  )
}
