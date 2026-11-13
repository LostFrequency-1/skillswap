'use client'

import { useState } from 'react'
import { CalendarDays, Check, Edit3, MapPin, Save, Star, UserRound } from 'lucide-react'
import { toast } from 'sonner'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { PageHeader } from '@/components/shared/page-header'
import { SkillIcon } from '@/components/shared/skill-icon'
import { LevelBadge, VerifiedBadge } from '@/components/shared/status-badges'
import { CURRENT_USER } from '@/lib/data/users'
import { SKILLS } from '@/lib/data/skills'
import type { TimeOfDay, Weekday } from '@/lib/types'

export function ProfilePage() {
  const [editing, setEditing] = useState(false)
  const [bio, setBio] = useState(CURRENT_USER.bio)
  const [headline, setHeadline] = useState(CURRENT_USER.headline)
  const [availabilityByDay, setAvailabilityByDay] = useState(CURRENT_USER.availability.byDay)
  const days: Weekday[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const times: TimeOfDay[] = ['Morning', 'Afternoon', 'Evening']
  const toggleAvailabilityTime = (day: Weekday, time: TimeOfDay) => setAvailabilityByDay((current) => {
    const dayTimes = current[day] ?? []
    return { ...current, [day]: dayTimes.includes(time) ? dayTimes.filter((item) => item !== time) : [...dayTimes, time] }
  })
  const save = () => { setEditing(false); toast.success('Profile updated', { description: 'Your availability preferences are saved for this demo.' }) }
  return <div className="flex flex-col gap-6"><PageHeader title="My profile" description="This is how potential learning partners see you." actions={editing ? <Button onClick={save}><Save data-icon="inline-start" /> Save changes</Button> : <Button variant="outline" onClick={() => setEditing(true)}><Edit3 data-icon="inline-start" /> Edit profile</Button>} /><div className="grid gap-6 lg:grid-cols-[1fr_320px]"><div className="flex flex-col gap-6"><Card><CardContent className="flex flex-col gap-5 p-6 sm:flex-row sm:items-start"><Avatar className="size-24 shrink-0"><AvatarFallback className="bg-secondary text-2xl font-semibold text-primary">AV</AvatarFallback></Avatar><div className="flex flex-1 flex-col gap-3">{editing ? <div className="flex flex-col gap-2"><Label htmlFor="profile-headline">Headline</Label><Input id="profile-headline" value={headline} onChange={(event) => setHeadline(event.target.value)} /></div> : <div><h2 className="text-2xl font-semibold">{CURRENT_USER.name}</h2><p className="text-muted-foreground">{headline}</p></div>}<div className="flex flex-wrap gap-3 text-sm text-muted-foreground"><span className="flex items-center gap-1"><MapPin className="size-4" />{CURRENT_USER.city}</span><span className="flex items-center gap-1"><UserRound className="size-4" />{CURRENT_USER.college}</span><span className="flex items-center gap-1"><CalendarDays className="size-4" />Member since 2026</span></div>{editing ? <div className="flex flex-col gap-2"><Label htmlFor="profile-bio">About you</Label><Textarea id="profile-bio" value={bio} onChange={(event) => setBio(event.target.value)} rows={4} /></div> : <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{bio}</p>}</div></CardContent></Card><Card><CardHeader><CardTitle>Skills offered</CardTitle></CardHeader><CardContent className="grid gap-3 sm:grid-cols-2">{CURRENT_USER.teaches.map((item) => { const skill = SKILLS.find((entry) => entry.id === item.skillId)!; return <div key={item.skillId} className="flex items-center justify-between gap-3 rounded-lg border p-3"><div className="flex items-center gap-3"><SkillIcon skillId={item.skillId} size="sm" /><span className="font-medium">{skill.name}</span></div><div className="flex flex-wrap justify-end gap-1">{item.verifiedLevels.map((level) => <VerifiedBadge key={level} level={level} />)}</div></div> })}</CardContent></Card><Card><CardHeader><CardTitle>Skills wanted</CardTitle></CardHeader><CardContent className="grid gap-3 sm:grid-cols-2">{CURRENT_USER.learns.map((item) => { const skill = SKILLS.find((entry) => entry.id === item.skillId)!; return <div key={item.skillId} className="flex items-center justify-between gap-3 rounded-lg border p-3"><div className="flex items-center gap-3"><SkillIcon skillId={item.skillId} size="sm" /><span className="font-medium">{skill.name}</span></div><Badge variant="secondary">{item.currentLevel} → {item.desiredLevel}</Badge></div> })}</CardContent></Card></div><aside className="flex flex-col gap-6"><Card><CardContent className="flex flex-col gap-4 p-5"><div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Teaching rating</span><span className="flex items-center gap-1 font-semibold"><Star className="size-4 fill-warning text-warning" />{CURRENT_USER.rating}</span></div><Separator /><div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Learner reviews</span><span className="font-semibold">{CURRENT_USER.reviewCount}</span></div><div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Completed exchanges</span><span className="font-semibold">{CURRENT_USER.completedSessions}</span></div></CardContent></Card><Card><CardHeader><CardTitle className="text-base">Availability</CardTitle></CardHeader><CardContent className="flex flex-col gap-4">{editing ? <div className="flex flex-col gap-3"><Label>Choose times for each day</Label>{days.map((day) => <div key={day} className="flex flex-col gap-2 rounded-lg border p-3"><span className="text-sm font-medium">{day}</span><div className="flex flex-wrap gap-2">{times.map((time) => { const selected = availabilityByDay[day]?.includes(time) ?? false; return <Button key={time} type="button" size="sm" variant={selected ? 'secondary' : 'outline'} aria-pressed={selected} onClick={() => toggleAvailabilityTime(day, time)}>{time}</Button> })}</div></div>)}</div> : <><div className="flex flex-col gap-2">{days.filter((day) => (availabilityByDay[day]?.length ?? 0) > 0).map((day) => <div key={day} className="flex items-start justify-between gap-2 text-sm"><span className="font-medium">{day}</span><span className="text-right text-muted-foreground">{availabilityByDay[day]?.join(' · ')}</span></div>)}</div><div className="flex items-center gap-2 text-sm text-success"><Check className="size-4" /> Open to new exchanges</div></>}</CardContent></Card></aside></div></div>
}
