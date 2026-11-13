'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Clock3, Plus, X } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { SkillIcon } from '@/components/shared/skill-icon'
import { Logo } from '@/components/shared/logo'
import { SKILLS, PROFICIENCY_LEVELS } from '@/lib/data/skills'
import type { Availability, ProficiencyLevel, SkillId, TimeOfDay, Weekday } from '@/lib/types'

const STEPS = ['About you', 'Teach', 'Learn', 'Your level', 'Goal level', 'Availability']
const DAYS: Weekday[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const TIMES: TimeOfDay[] = ['Morning', 'Afternoon', 'Evening']

export function OnboardingWizard() {
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [teach, setTeach] = useState<SkillId[]>(['java'])
  const [learn, setLearn] = useState<SkillId[]>(['ml'])
  const [levels, setLevels] = useState<Record<string, ProficiencyLevel>>({ java: 'Advanced', ml: 'Beginner' })
  const [desiredLevel, setDesiredLevel] = useState<ProficiencyLevel>('Intermediate')
  const [availabilityByDay, setAvailabilityByDay] = useState<Availability['byDay']>({ Tue: ['Evening'], Thu: ['Evening'], Sat: ['Evening'] })
  const visibleSteps = learn.length === 0 ? STEPS.filter((_, index) => index !== 3 && index !== 4) : STEPS
  const visibleStep = learn.length === 0 && step === 5 ? 3 : step

  const toggleSkill = (id: SkillId, list: 'teach' | 'learn') => {
    const setter = list === 'teach' ? setTeach : setLearn
    setter((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }
  const toggleAvailabilityTime = (day: Weekday, time: TimeOfDay) => setAvailabilityByDay((current) => {
    const dayTimes = current[day] ?? []
    return { ...current, [day]: dayTimes.includes(time) ? dayTimes.filter((item) => item !== time) : [...dayTimes, time] }
  })
  const next = () => {
    if (step === 0 && name.trim().length < 2) return toast.error('Add your name to continue')
    if (step === 1 && teach.length === 0) return toast.error('Choose at least one skill to teach')
    if (step === 2 && learn.length === 0) return setStep(5)
    if (step < STEPS.length - 1) return setStep((current) => current + 1)
    localStorage.setItem('skillswap-onboarding', JSON.stringify({ name, city, teach, learn, levels, desiredLevel, availability: { byDay: availabilityByDay } }))
    toast.success('Your profile is ready', { description: 'We found a few potential learning partners for you.' })
    window.location.href = '/dashboard'
  }

  return (
    <main className="min-h-svh bg-muted/30">
      <header className="border-b bg-card"><div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 md:px-6"><Logo href="/" /><span className="text-sm text-muted-foreground">Step {visibleStep + 1} of {visibleSteps.length}</span></div></header>
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-8 md:px-6 md:py-12 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="hidden lg:block"><ol className="sticky top-8 flex flex-col gap-1">{visibleSteps.map((label, index) => <li key={label} className="flex items-center gap-3 rounded-lg px-3 py-2"><span className={`flex size-7 items-center justify-center rounded-full text-xs font-medium ${index < visibleStep ? 'bg-success text-success-foreground' : index === visibleStep ? 'bg-primary text-primary-foreground' : 'border bg-card text-muted-foreground'}`}>{index < visibleStep ? <Check className="size-3.5" /> : index + 1}</span><span className={index === visibleStep ? 'text-sm font-medium text-foreground' : 'text-sm text-muted-foreground'}>{label}</span></li>)}</ol></aside>
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-2"><Progress value={((visibleStep + 1) / visibleSteps.length) * 100} className="lg:hidden" /><p className="text-sm font-medium text-primary">Set up your profile</p><h1 className="text-3xl font-semibold tracking-tight">{STEPS[step]}</h1><p className="text-muted-foreground">{step === 0 ? 'Help your future learning partners know who they are meeting.' : step === 1 ? 'Choose at least one skill you can confidently explain to someone else.' : step === 2 ? 'Optional: choose skills you would be excited to learn from a peer, or continue without adding any.' : step === 3 ? 'Tell us where you are starting for the skills you want to learn.' : step === 4 ? 'What level would make your learning goal feel complete?' : 'When are you usually available for a skill exchange?'}</p></div>
          <Card><CardContent className="p-5 md:p-8">
            {step === 0 && <div className="grid gap-5 sm:grid-cols-2"><div className="flex flex-col gap-2 sm:col-span-2"><Label htmlFor="onboarding-name">Full name</Label><Input id="onboarding-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Arjun Verma" /></div><div className="flex flex-col gap-2"><Label htmlFor="onboarding-city">City</Label><Input id="onboarding-city" value={city} onChange={(event) => setCity(event.target.value)} placeholder="Vellore" /></div><div className="flex flex-col gap-2"><Label htmlFor="onboarding-college">College or workplace</Label><Input id="onboarding-college" placeholder="VIT Vellore" /></div></div>}
            {(step === 1 || step === 2) && <div className="grid gap-3 sm:grid-cols-2">{SKILLS.map((skill) => { const selected = (step === 1 ? teach : learn).includes(skill.id); return <button key={skill.id} type="button" onClick={() => toggleSkill(skill.id, step === 1 ? 'teach' : 'learn')} className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-colors ${selected ? 'border-primary bg-secondary/60 ring-1 ring-primary/30' : 'bg-card hover:bg-muted'}`}><SkillIcon skillId={skill.id} /><span className="flex min-w-0 flex-1 flex-col gap-0.5"><span className="font-medium text-foreground">{skill.name}</span><span className="text-xs text-muted-foreground">{skill.category}</span></span><span className={`flex size-5 items-center justify-center rounded-full border ${selected ? 'border-primary bg-primary text-primary-foreground' : 'text-transparent'}`}><Check className="size-3" /></span></button> })}</div>}
            {step === 3 && <div className="flex flex-col gap-6"><p className="text-sm text-muted-foreground">Select your current level for each skill you want to learn.</p>{learn.map((id) => <div key={id} className="flex flex-col gap-3"><div className="flex items-center gap-3"><SkillIcon skillId={id} size="sm" /><span className="font-medium">{SKILLS.find((skill) => skill.id === id)?.name}</span></div><div className="grid gap-2 sm:grid-cols-3">{PROFICIENCY_LEVELS.map((level) => <button key={level} type="button" onClick={() => setLevels((current) => ({ ...current, [id]: level }))} className={`rounded-lg border px-3 py-2 text-sm ${levels[id] === level ? 'border-primary bg-secondary font-medium text-primary' : 'hover:bg-muted'}`}>{level}</button>)}</div></div>)}</div>}
            {step === 4 && <div className="flex flex-col gap-4"><p className="text-sm text-muted-foreground">Choose the target level for your learning goals.</p><div className="grid gap-3 sm:grid-cols-3">{PROFICIENCY_LEVELS.map((level) => <button key={level} type="button" onClick={() => setDesiredLevel(level)} className={`flex flex-col gap-1 rounded-xl border p-4 text-left ${desiredLevel === level ? 'border-primary bg-secondary ring-1 ring-primary/30' : 'hover:bg-muted'}`}><span className="font-medium">{level}</span><span className="text-xs text-muted-foreground">{level === 'Beginner' ? 'Build a strong foundation' : level === 'Intermediate' ? 'Build real projects' : 'Teach and lead others'}</span></button>)}</div></div>}
            {step === 5 && <div className="flex flex-col gap-3">{DAYS.map((day) => <div key={day} className="flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between"><span className="w-12 text-sm font-medium">{day}</span><div className="flex flex-wrap gap-2">{TIMES.map((time) => { const selected = availabilityByDay[day]?.includes(time) ?? false; return <Button key={time} type="button" size="sm" variant={selected ? 'secondary' : 'outline'} aria-pressed={selected} onClick={() => toggleAvailabilityTime(day, time)}>{time}</Button> })}</div></div>)}</div>}
          </CardContent></Card>
          <div className="flex items-center justify-between"><Button variant="ghost" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0}><ArrowLeft data-icon="inline-start" />Back</Button><Button onClick={next}>{step === STEPS.length - 1 ? 'Finish profile' : 'Continue'}<ArrowRight data-icon="inline-end" /></Button></div>
        </section>
      </div>
    </main>
  )
}
