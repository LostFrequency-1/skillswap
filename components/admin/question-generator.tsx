'use client'

import { useState } from 'react'
import { Check, Copy, Loader2, Save, Sparkles, WandSparkles } from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { PageHeader } from '@/components/shared/page-header'

type GeneratedQuestion = { prompt: string; options: string[]; correctAnswer: number; explanation: string; topic: string }

const DEMO_QUESTIONS: GeneratedQuestion[] = [
  { topic: 'Collections', prompt: 'Which collection is the best fit for storing unique values while preserving insertion order?', options: ['HashSet', 'LinkedHashSet', 'TreeSet', 'ArrayList'], correctAnswer: 1, explanation: 'LinkedHashSet combines uniqueness with predictable insertion order.', },
  { topic: 'Concurrency', prompt: 'What is the primary purpose of the synchronized keyword in Java?', options: ['Improve memory allocation', 'Prevent concurrent access to a critical section', 'Create immutable objects', 'Serialize a class'], correctAnswer: 1, explanation: 'synchronized provides mutual exclusion around a method or block.', },
]

export function QuestionGenerator() {
  const [skill, setSkill] = useState('Java')
  const [level, setLevel] = useState('Intermediate')
  const [count, setCount] = useState('5')
  const [context, setContext] = useState('Focus on practical scenarios that a peer mentor can explain in a 30-minute session.')
  const [questions, setQuestions] = useState<GeneratedQuestion[]>(DEMO_QUESTIONS)
  const [loading, setLoading] = useState(false)

  async function generateQuestions() {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/generate-questions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ skill, level, count: Number(count), context }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      setQuestions(data.questions)
      toast.success('Questions generated', { description: `${data.questions.length} ${skill} questions are ready for review.` })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Generation failed')
    } finally { setLoading(false) }
  }

  function copyQuestion(question: GeneratedQuestion) { navigator.clipboard?.writeText(`${question.prompt}\n\n${question.options.map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`).join('\n')}\n\nAnswer: ${question.options[question.correctAnswer]}\nExplanation: ${question.explanation}`); toast.success('Question copied') }

  return <div className="flex flex-col gap-6"><PageHeader title="AI question generator" description="Draft assessment questions with AI, then review and approve them before they enter the bank." actions={<Badge variant="secondary"><Sparkles data-icon="inline-start" />AI-assisted authoring</Badge>} /><div className="grid gap-6 lg:grid-cols-[320px_1fr]"><Card className="h-fit"><CardHeader><CardTitle className="text-base">Generation brief</CardTitle><CardDescription>Give the model a focused assessment target.</CardDescription></CardHeader><CardContent className="flex flex-col gap-4"><div className="flex flex-col gap-2"><Label htmlFor="generator-skill">Skill</Label><select id="generator-skill" value={skill} onChange={(event) => setSkill(event.target.value)} className="h-10 rounded-md border bg-background px-3 text-sm"><option>Java</option><option>Python</option><option>Data Structures</option><option>Machine Learning</option><option>DBMS</option><option>C++</option></select></div><div className="flex flex-col gap-2"><Label htmlFor="generator-level">Level</Label><select id="generator-level" value={level} onChange={(event) => setLevel(event.target.value)} className="h-10 rounded-md border bg-background px-3 text-sm"><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></div><div className="flex flex-col gap-2"><Label htmlFor="generator-count">Question count</Label><Input id="generator-count" type="number" min="1" max="10" value={count} onChange={(event) => setCount(event.target.value)} /></div><div className="flex flex-col gap-2"><Label htmlFor="generator-context">Admin guidance</Label><Textarea id="generator-context" value={context} onChange={(event) => setContext(event.target.value)} rows={5} /></div></CardContent><CardFooter><Button className="w-full" onClick={generateQuestions} disabled={loading}>{loading ? <Loader2 className="animate-spin" data-icon="inline-start" /> : <WandSparkles data-icon="inline-start" />} {loading ? 'Generating...' : 'Generate questions'}</Button></CardFooter></Card><div className="flex flex-col gap-4"><div className="flex items-center justify-between"><div><h2 className="font-semibold">Review queue</h2><p className="text-sm text-muted-foreground">Generated drafts are not published automatically.</p></div><Badge variant="outline">{questions.length} drafts</Badge></div>{questions.map((question, index) => <Card key={`${question.topic}-${index}`}><CardHeader className="pb-3"><div className="flex items-start justify-between gap-3"><div><CardTitle className="text-base">{index + 1}. {question.prompt}</CardTitle><CardDescription className="mt-1">Topic: {question.topic}</CardDescription></div><Badge variant="secondary">Draft</Badge></div></CardHeader><CardContent className="flex flex-col gap-4"><div className="grid gap-2 sm:grid-cols-2">{question.options.map((option, optionIndex) => <div key={option} className={`flex items-center gap-2 rounded-md border p-3 text-sm ${optionIndex === question.correctAnswer ? 'border-success/40 bg-success/5' : ''}`}><span className="flex size-5 items-center justify-center rounded-full border text-[11px]">{String.fromCharCode(65 + optionIndex)}</span>{option}{optionIndex === question.correctAnswer && <Check className="ml-auto size-4 text-success" />}</div>)}</div><Separator /><div className="rounded-lg bg-muted/50 p-3 text-sm"><span className="font-medium">Answer explanation: </span><span className="text-muted-foreground">{question.explanation}</span></div></CardContent><CardFooter className="justify-end gap-2"><Button variant="ghost" size="sm" onClick={() => copyQuestion(question)}><Copy data-icon="inline-start" />Copy</Button><Button variant="outline" size="sm" onClick={() => toast.success('Question approved', { description: 'Added to the pending question bank.' })}><Save data-icon="inline-start" />Approve draft</Button></CardFooter></Card>)}</div></div></div>
}
