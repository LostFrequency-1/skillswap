'use client'

import { useEffect, useMemo, useState } from 'react'
import { AlertCircle, ArrowLeft, ArrowRight, BadgeCheck, Check, CheckCircle2, Code2, Clock3, Lightbulb, Play, RotateCcw, Send, ShieldCheck, Sparkles, Terminal, XCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { SkillIcon } from '@/components/shared/skill-icon'
import { LevelBadge } from '@/components/shared/status-badges'
import { PageHeader } from '@/components/shared/page-header'
import { ASSESSMENT_QUESTIONS, PASS_MARK, type AssessmentMode } from '@/lib/data/assessments'
import { SKILLS } from '@/lib/data/skills'
import type { ProficiencyLevel, SkillId } from '@/lib/types'
import { cn } from '@/lib/utils'

type AssessmentStage = 'select' | 'mcq' | 'practical' | 'results'

export function AssessmentWorkspace() {
  const [stage, setStage] = useState<AssessmentStage>('select')
  const [skillId, setSkillId] = useState<SkillId>('java')
  const [level, setLevel] = useState<ProficiencyLevel>('Intermediate')
  const [mode, setMode] = useState<AssessmentMode>('mcq')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [secondsLeft, setSecondsLeft] = useState(300)
  const [code, setCode] = useState('public class Main {\n  public static void main(String[] args) {\n    // Write your solution here\n  }\n}')
  const [codeRun, setCodeRun] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const skill = SKILLS.find((item) => item.id === skillId) ?? SKILLS[0]
  const question = ASSESSMENT_QUESTIONS[questionIndex]
  const answeredCount = Object.keys(answers).length
  const score = useMemo(() => {
    const correct = ASSESSMENT_QUESTIONS.reduce((total, item, index) => total + (answers[index] === item.answer ? 1 : 0), 0)
    return Math.round((correct / ASSESSMENT_QUESTIONS.length) * 100)
  }, [answers])

  useEffect(() => {
    if (stage !== 'mcq' || submitted || secondsLeft <= 0) return
    const timer = window.setInterval(() => setSecondsLeft((current) => current - 1), 1000)
    return () => window.clearInterval(timer)
  }, [stage, submitted, secondsLeft])

  useEffect(() => {
    if (stage === 'mcq' && secondsLeft === 0) setSubmitted(true)
  }, [secondsLeft, stage])

  const startAssessment = () => {
    setAnswers({})
    setQuestionIndex(0)
    setSecondsLeft(300)
    setSubmitted(false)
    setCodeRun(false)
    setStage(mode === 'mcq' ? 'mcq' : 'practical')
  }

  const submitMcq = () => setSubmitted(true)
  const submitPractical = () => {
    setSubmitted(true)
    setStage('results')
  }

  if (stage === 'select') {
    return <AssessmentSelection skillId={skillId} setSkillId={setSkillId} level={level} setLevel={setLevel} mode={mode} setMode={setMode} onStart={startAssessment} />
  }

  if (stage === 'practical') {
    return <PracticalAssessment skill={skill} level={level} code={code} setCode={setCode} codeRun={codeRun} setCodeRun={setCodeRun} onSubmit={submitPractical} onBack={() => setStage('select')} />
  }

  if (stage === 'results') {
    return <AssessmentResults skill={skill} level={level} score={mode === 'practical' ? 78 : score} mode={mode} answers={answers} onRetake={() => setStage('select')} />
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={`${skill.name} assessment`}
        description={`${level} knowledge check · 5 questions · simulated frontend evaluation`}
        actions={<Badge variant="secondary"><ShieldCheck data-icon="inline-start" />Verification assessment</Badge>}
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <Card>
          <CardHeader className="gap-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3"><SkillIcon skillId={skill.id} /><div><CardTitle className="text-base">Question {questionIndex + 1} of {ASSESSMENT_QUESTIONS.length}</CardTitle><CardDescription>{question.topic}</CardDescription></div></div>
              <Badge variant={secondsLeft < 60 ? 'destructive' : 'outline'}><Clock3 data-icon="inline-start" />{Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, '0')}</Badge>
            </div>
            <Progress value={(answeredCount / ASSESSMENT_QUESTIONS.length) * 100} aria-label="Assessment progress" />
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold leading-snug text-foreground">{question.prompt}</h2>
            <div className="grid gap-3">
              {question.options.map((option, index) => {
                const selected = answers[questionIndex] === index
                return <button key={option} type="button" onClick={() => setAnswers((current) => ({ ...current, [questionIndex]: index }))} className={cn('flex items-center gap-3 rounded-lg border p-4 text-left text-sm transition-colors hover:bg-muted', selected && 'border-primary bg-primary/5 ring-2 ring-primary/20')}><span className={cn('flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium', selected && 'border-primary bg-primary text-primary-foreground')}>{String.fromCharCode(65 + index)}</span><span className="text-foreground">{option}</span>{selected && <Check className="ml-auto size-4 text-primary" />}</button>
              })}
            </div>
          </CardContent>
          <CardFooter className="justify-between gap-3">
            <Button variant="ghost" onClick={() => setStage('select')}><ArrowLeft data-icon="inline-start" />Exit assessment</Button>
            <div className="flex gap-2">{questionIndex > 0 && <Button variant="outline" onClick={() => setQuestionIndex((current) => current - 1)}>Previous</Button>}{questionIndex < ASSESSMENT_QUESTIONS.length - 1 ? <Button onClick={() => setQuestionIndex((current) => current + 1)}>Next<ArrowRight data-icon="inline-end" /></Button> : <Button onClick={submitMcq} disabled={answeredCount < ASSESSMENT_QUESTIONS.length}>Submit assessment<Send data-icon="inline-end" /></Button>}</div>
          </CardFooter>
        </Card>
        <Card className="h-fit">
          <CardHeader><CardTitle className="text-base">Assessment rules</CardTitle><CardDescription>Before you submit</CardDescription></CardHeader>
          <CardContent className="flex flex-col gap-4 text-sm text-muted-foreground"><p className="flex gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />Pass mark is {PASS_MARK}%.</p><p className="flex gap-2"><Clock3 className="mt-0.5 size-4 shrink-0 text-primary" />You have 5 minutes to complete this attempt.</p><p className="flex gap-2"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />Passing unlocks teaching eligibility at this level.</p></CardContent>
        </Card>
      </div>
    </div>
  )
}

function AssessmentSelection({ skillId, setSkillId, level, setLevel, mode, setMode, onStart }: { skillId: SkillId; setSkillId: (value: SkillId) => void; level: ProficiencyLevel; setLevel: (value: ProficiencyLevel) => void; mode: AssessmentMode; setMode: (value: AssessmentMode) => void; onStart: () => void }) {
  return <div className="flex flex-col gap-6"><PageHeader title="Assessments" description="Prove what you know and unlock teaching eligibility level by level." actions={<Badge variant="secondary"><BadgeCheck data-icon="inline-start" />Optional verification</Badge>} /><Alert><Lightbulb /><AlertTitle>Verification is not a gate</AlertTitle><AlertDescription>You can offer to teach without verification. Passing an assessment adds a verified knowledge badge that helps learners choose with confidence.</AlertDescription></Alert><div className="grid gap-6 lg:grid-cols-[1fr_320px]"><Card><CardHeader><CardTitle>Start an assessment</CardTitle><CardDescription>Choose any skill and level. You can attempt assessments in any order.</CardDescription></CardHeader><CardContent className="flex flex-col gap-6"><label className="flex flex-col gap-2 text-sm font-medium">Skill<select value={skillId} onChange={(event) => setSkillId(event.target.value as SkillId)} className="h-10 rounded-md border bg-background px-3 font-normal">{SKILLS.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><div className="flex flex-col gap-2"><span className="text-sm font-medium">Difficulty</span><div className="grid grid-cols-3 gap-2">{(['Beginner', 'Intermediate', 'Advanced'] as ProficiencyLevel[]).map((item) => <button key={item} type="button" onClick={() => setLevel(item)} className={cn('rounded-lg border p-3 text-left text-sm transition-colors hover:bg-muted', level === item && 'border-primary bg-primary/5 ring-2 ring-primary/20')}><span className="block font-medium">{item}</span><span className="mt-1 block text-xs text-muted-foreground">{item === 'Beginner' ? 'Core concepts' : item === 'Intermediate' ? 'Practical fluency' : 'Deep expertise'}</span></button>)}</div></div><div className="flex flex-col gap-2"><span className="text-sm font-medium">Assessment format</span><div className="grid gap-2 sm:grid-cols-2">{([{ id: 'mcq', title: 'Knowledge check', detail: '5 timed multiple-choice questions', icon: ClipboardIcon }, { id: 'practical', title: 'Practical challenge', detail: 'Simulated coding workspace', icon: Code2 }] as const).map((item) => <button key={item.id} type="button" onClick={() => setMode(item.id)} className={cn('flex items-start gap-3 rounded-lg border p-3 text-left transition-colors hover:bg-muted', mode === item.id && 'border-primary bg-primary/5 ring-2 ring-primary/20')}><item.icon className="mt-0.5 size-5 text-primary" /><span><span className="block text-sm font-medium text-foreground">{item.title}</span><span className="mt-1 block text-xs text-muted-foreground">{item.detail}</span></span></button>)}</div></div></CardContent><CardFooter><Button onClick={onStart}>Begin {mode === 'mcq' ? 'knowledge check' : 'practical challenge'}<ArrowRight data-icon="inline-end" /></Button></CardFooter></Card><Card><CardHeader><CardTitle className="text-base">How eligibility works</CardTitle></CardHeader><CardContent className="flex flex-col gap-4"><div className="flex gap-3"><span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-primary">1</span><p className="text-sm text-muted-foreground">Choose the teaching level you want to verify.</p></div><div className="flex gap-3"><span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-primary">2</span><p className="text-sm text-muted-foreground">Pass with {PASS_MARK}% or higher.</p></div><div className="flex gap-3"><span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-primary">3</span><p className="text-sm text-muted-foreground">Teach learners at every level you have qualified for.</p></div></CardContent></Card></div></div>
}

function ClipboardIcon(props: React.ComponentProps<'svg'>) { return <Terminal {...props} /> }

function PracticalAssessment({ skill, level, code, setCode, codeRun, setCodeRun, onSubmit, onBack }: { skill: typeof SKILLS[number]; level: ProficiencyLevel; code: string; setCode: (value: string) => void; codeRun: boolean; setCodeRun: (value: boolean) => void; onSubmit: () => void; onBack: () => void }) {
  return <div className="flex flex-col gap-6"><PageHeader title={`${skill.name} practical challenge`} description={`${level} level · simulated execution environment`} actions={<Badge variant="outline"><Code2 data-icon="inline-start" />Frontend simulation</Badge>} /><Alert><AlertCircle /><AlertTitle>Execution is simulated</AlertTitle><AlertDescription>This prototype does not execute code or connect to an evaluator. Run code shows a sample result so you can experience the intended flow.</AlertDescription></Alert><div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]"><Card><CardHeader><CardTitle>Find the first unique character</CardTitle><CardDescription>Given a string, return the first character that appears only once. Return -1 if every character repeats.</CardDescription></CardHeader><CardContent className="flex flex-col gap-4"><div className="flex items-center justify-between rounded-md bg-muted p-3 text-xs"><span>Language</span><select className="rounded border bg-background px-2 py-1"><option>Java</option><option>Python</option><option>C++</option></select></div><textarea aria-label="Code editor" value={code} onChange={(event) => setCode(event.target.value)} spellCheck={false} className="min-h-72 w-full resize-y rounded-lg border bg-slate-950 p-4 font-mono text-sm leading-relaxed text-slate-100 outline-none focus-visible:ring-2 focus-visible:ring-ring" />{codeRun && <div className="rounded-lg border border-success/30 bg-success/10 p-3 font-mono text-xs text-success">Sample output: 2\nAll sample tests passed (simulated).</div>}</CardContent><CardFooter className="justify-between"><Button variant="ghost" onClick={onBack}><ArrowLeft data-icon="inline-start" />Back</Button><div className="flex gap-2"><Button variant="outline" onClick={() => setCodeRun(true)}><Play data-icon="inline-start" />Run code</Button><Button onClick={onSubmit}>Submit challenge<Send data-icon="inline-end" /></Button></div></CardFooter></Card><Card className="h-fit"><CardHeader><CardTitle className="text-base">Problem details</CardTitle></CardHeader><CardContent className="flex flex-col gap-4 text-sm"><div><p className="font-medium">Sample input</p><code className="mt-1 block rounded bg-muted p-2 text-xs">swiss</code></div><div><p className="font-medium">Sample output</p><code className="mt-1 block rounded bg-muted p-2 text-xs">2</code></div><Separator /><p className="text-muted-foreground">Your submission is evaluated against hidden tests in the full product. This prototype uses a simulated score.</p></CardContent></Card></div></div>
}

function AssessmentResults({ skill, level, score, mode, answers, onRetake }: { skill: typeof SKILLS[number]; level: ProficiencyLevel; score: number; mode: AssessmentMode; answers: Record<number, number>; onRetake: () => void }) {
  const passed = score >= PASS_MARK
  return <div className="mx-auto flex w-full max-w-4xl flex-col gap-6"><PageHeader title="Assessment results" description={`${skill.name} · ${level} · ${mode === 'mcq' ? 'Knowledge check' : 'Practical challenge'}`} actions={<Button variant="outline" onClick={onRetake}><RotateCcw data-icon="inline-start" />Retake assessment</Button>} /><Card className={cn('border-2', passed ? 'border-success/30' : 'border-warning/40')}><CardContent className="flex flex-col items-center gap-4 py-10 text-center"><span className={cn('flex size-14 items-center justify-center rounded-full', passed ? 'bg-success/15 text-success' : 'bg-warning/15 text-warning-foreground')}>{passed ? <CheckCircle2 className="size-7" /> : <XCircle className="size-7" />}</span><div><h2 className="text-2xl font-semibold">{passed ? 'Teaching eligibility unlocked' : 'Not quite there yet'}</h2><p className="mt-1 text-muted-foreground">{passed ? `You passed the ${level} ${skill.name} assessment.` : `You need ${PASS_MARK}% to verify this teaching level.`}</p></div><div className="text-5xl font-semibold tracking-tight text-foreground">{score}%</div><Badge variant={passed ? 'default' : 'secondary'}>{passed ? 'Passed' : 'Needs a retake'}</Badge></CardContent></Card><div className="grid gap-6 md:grid-cols-2"><Card><CardHeader><CardTitle className="text-base">Topic-wise performance</CardTitle><CardDescription>Review what to revisit before your next attempt.</CardDescription></CardHeader><CardContent className="flex flex-col gap-4">{ASSESSMENT_QUESTIONS.map((item, index) => { const correct = mode === 'practical' ? index < 4 : answers[index] === item.answer; return <div key={item.id} className="flex items-center justify-between gap-3 text-sm"><span className="flex items-center gap-2"><span className={cn('flex size-5 items-center justify-center rounded-full', correct ? 'bg-success/15 text-success' : 'bg-destructive/10 text-destructive')}>{correct ? <Check className="size-3" /> : <XCircle className="size-3" />}</span>{item.topic}</span><span className="text-xs text-muted-foreground">{correct ? 'Strong' : 'Review'}</span></div> })}</CardContent></Card><Card><CardHeader><CardTitle className="text-base">What happens next?</CardTitle></CardHeader><CardContent className="flex flex-col gap-3 text-sm text-muted-foreground"><p>Verified levels appear on your public profile and teacher cards.</p><p>Your teaching reputation is separate and grows through learner ratings after completed exchanges.</p><Button render={<a href="/verification" />} nativeButton={false}>View verification record<ArrowRight data-icon="inline-end" /></Button></CardContent></Card></div></div>
}
