'use client'

import { useState } from 'react'
import { BookOpen, Check, Pencil, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { PageHeader } from '@/components/shared/page-header'
import { SkillIcon } from '@/components/shared/skill-icon'
import { LevelBadge, VerifiedBadge } from '@/components/shared/status-badges'
import { CURRENT_USER } from '@/lib/data/users'
import { SKILLS, PROFICIENCY_LEVELS } from '@/lib/data/skills'
import type { LearningSkill, ProficiencyLevel, TeachingSkill } from '@/lib/types'

function SkillPicker({ onAdd }: { onAdd: (skillId: string, level: ProficiencyLevel) => void }) {
  const [skillId, setSkillId] = useState('')
  const [level, setLevel] = useState<ProficiencyLevel>('Beginner')
  return <div className="flex flex-col gap-4"><Select value={skillId} onValueChange={(value) => value && setSkillId(value)}><SelectTrigger><SelectValue placeholder="Choose a skill" /></SelectTrigger><SelectContent>{SKILLS.map((skill) => <SelectItem key={skill.id} value={skill.id}>{skill.name}</SelectItem>)}</SelectContent></Select><Select value={level} onValueChange={(value) => value && setLevel(value as ProficiencyLevel) }><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{PROFICIENCY_LEVELS.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select><Button disabled={!skillId} onClick={() => { onAdd(skillId, level); setSkillId('') }}>Add skill</Button></div>
}

function AddSkillDialog({ mode, onAdd }: { mode: 'teach' | 'learn'; onAdd: (skillId: string, level: ProficiencyLevel) => void }) {
  const [open, setOpen] = useState(false)
  return <Dialog open={open} onOpenChange={setOpen}><DialogTrigger render={<Button variant="outline" size="sm" />}><Plus data-icon="inline-start" /> Add skill</DialogTrigger><DialogContent><DialogHeader><DialogTitle>{mode === 'teach' ? 'Add a skill you can teach' : 'Add a skill you want to learn'}</DialogTitle></DialogHeader><SkillPicker onAdd={(id, level) => { onAdd(id, level); setOpen(false) }} /><DialogFooter><Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button></DialogFooter></DialogContent></Dialog>
}

function TeachCard({ item, onRemove }: { item: TeachingSkill; onRemove: () => void }) {
  const skill = SKILLS.find((entry) => entry.id === item.skillId)!
  const score = item.verifiedLevels.length ? Math.min(100, 55 + item.verifiedLevels.length * 15) : 0
  return <Card><CardContent className="flex flex-col gap-4 p-5"><div className="flex items-start justify-between gap-3"><div className="flex items-center gap-3"><SkillIcon skillId={item.skillId} /><div><h3 className="font-medium">{skill.name}</h3><p className="text-sm text-muted-foreground">Self-declared: {item.selfDeclaredLevel}</p></div></div><div className="flex gap-1"><Button variant="ghost" size="icon" aria-label={`Edit ${skill.name}`} onClick={() => toast.info('Skill editing will open here in the next polish pass')}><Pencil /></Button><Button variant="ghost" size="icon" aria-label={`Remove ${skill.name}`} onClick={onRemove}><Trash2 /></Button></div></div><Separator /><div className="flex flex-col gap-2"><div className="flex items-center justify-between"><span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Verified teaching levels</span><span className="text-xs text-muted-foreground">{item.verifiedLevels.length}/3</span></div><Progress value={score} aria-label={`${skill.name} verification progress`} /><div className="flex flex-wrap gap-2">{PROFICIENCY_LEVELS.map((level) => <VerifiedBadge key={level} level={level} verified={item.verifiedLevels.includes(level)} />)}</div></div><div className="flex items-center justify-between rounded-lg bg-muted/50 p-3"><span className="text-sm text-muted-foreground">Assessment status</span><Badge variant={item.verifiedLevels.length ? 'secondary' : 'outline'}>{item.verifiedLevels.length ? 'Partially verified' : 'Not attempted'}</Badge></div></CardContent></Card>
}

function LearnCard({ item, onRemove }: { item: LearningSkill; onRemove: () => void }) {
  const skill = SKILLS.find((entry) => entry.id === item.skillId)!
  return <Card><CardContent className="flex items-center justify-between gap-3 p-5"><div className="flex items-center gap-3"><SkillIcon skillId={item.skillId} /><div><h3 className="font-medium">{skill.name}</h3><div className="mt-1 flex items-center gap-2"><span className="text-sm text-muted-foreground">Learning level:</span><LevelBadge level={item.desiredLevel} /></div></div></div><div className="flex gap-1"><Button variant="ghost" size="icon" aria-label={`Edit ${skill.name}`} onClick={() => toast.info('Learning goal editing will open here')}><Pencil /></Button><Button variant="ghost" size="icon" aria-label={`Remove ${skill.name}`} onClick={onRemove}><Trash2 /></Button></div></CardContent></Card>
}

export function MySkillsPage() {
  const [teaches, setTeaches] = useState(CURRENT_USER.teaches)
  const [learns, setLearns] = useState(CURRENT_USER.learns)
  const addTeach = (skillId: string, level: ProficiencyLevel) => { if (teaches.some((item) => item.skillId === skillId)) return toast.error('That skill is already in your teaching list'); setTeaches([...teaches, { skillId: skillId as TeachingSkill['skillId'], selfDeclaredLevel: level, verifiedLevels: [] }]); toast.success('Teaching skill added') }
  const addLearn = (skillId: string, level: ProficiencyLevel) => { if (learns.some((item) => item.skillId === skillId)) return toast.error('That skill is already in your learning list'); setLearns([...learns, { skillId: skillId as LearningSkill['skillId'], currentLevel: 'Beginner', desiredLevel: level }]); toast.success('Learning goal added') }
  return <div className="flex flex-col gap-8"><PageHeader title="My skills" description="Keep your teaching strengths and learning goals up to date." /><section className="flex flex-col gap-4"><div className="flex items-center justify-between gap-3"><div><h2 className="text-lg font-semibold">Skills I can teach</h2><p className="text-sm text-muted-foreground">Verification unlocks teaching eligibility level by level.</p></div><AddSkillDialog mode="teach" onAdd={addTeach} /></div><div className="grid gap-4 md:grid-cols-2">{teaches.map((item) => <TeachCard key={item.skillId} item={item} onRemove={() => { setTeaches(teaches.filter((entry) => entry.skillId !== item.skillId)); toast.success('Teaching skill removed') }} />)}</div></section><section className="flex flex-col gap-4"><div className="flex items-center justify-between gap-3"><div><h2 className="text-lg font-semibold">Skills I want to learn</h2><p className="text-sm text-muted-foreground">Tell us where you are headed so we can improve your matches.</p></div><AddSkillDialog mode="learn" onAdd={addLearn} /></div><div className="grid gap-4 md:grid-cols-2">{learns.map((item) => <LearnCard key={item.skillId} item={item} onRemove={() => { setLearns(learns.filter((entry) => entry.skillId !== item.skillId)); toast.success('Learning goal removed') }} />)}</div></section><Card className="border-primary/20 bg-secondary/40"><CardHeader><CardTitle className="flex items-center gap-2 text-base"><BookOpen className="size-5 text-primary" /> Skill profile tip</CardTitle></CardHeader><CardContent className="flex flex-col gap-2 text-sm text-muted-foreground"><p>Profiles with at least one teaching skill and one learning goal receive more relevant matches.</p><p className="flex items-center gap-2 text-success"><Check className="size-4" /> Your profile has both — you are ready to swap.</p></CardContent></Card></div>
}
