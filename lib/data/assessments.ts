import type { ProficiencyLevel, SkillId } from '@/lib/types'

export type AssessmentMode = 'mcq' | 'practical'

export interface AssessmentQuestion {
  id: string
  topic: string
  prompt: string
  options: string[]
  answer: number
  explanation: string
}

export interface AssessmentRecord {
  id: string
  skillId: SkillId
  level: ProficiencyLevel
  mode: AssessmentMode
  score: number
  passed: boolean
  date: string
}

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'q1', topic: 'Collections', prompt: 'Which Java collection guarantees insertion order while allowing fast key-based lookup?',
    options: ['HashMap', 'LinkedHashMap', 'TreeMap', 'PriorityQueue'], answer: 1,
    explanation: 'LinkedHashMap maintains insertion order while providing average constant-time key lookup.',
  },
  {
    id: 'q2', topic: 'OOP', prompt: 'Which principle allows a subclass to provide a specific implementation of a parent method?',
    options: ['Encapsulation', 'Overloading', 'Overriding', 'Composition'], answer: 2,
    explanation: 'Method overriding lets a subclass provide its own implementation of an inherited method.',
  },
  {
    id: 'q3', topic: 'Streams', prompt: 'What does a terminal operation on a Java Stream do?',
    options: ['Creates a new stream', 'Triggers stream processing', 'Sorts source data', 'Adds elements to the source'], answer: 1,
    explanation: 'Intermediate operations are lazy; a terminal operation triggers evaluation of the pipeline.',
  },
  {
    id: 'q4', topic: 'Exceptions', prompt: 'Which block runs whether an exception is thrown or not?',
    options: ['catch', 'throws', 'finally', 'assert'], answer: 2,
    explanation: 'The finally block is intended for cleanup and normally runs after try/catch processing.',
  },
  {
    id: 'q5', topic: 'JVM', prompt: 'Which component converts Java bytecode into machine instructions at runtime?',
    options: ['JRE', 'JIT compiler', 'Javadoc', 'Garbage collector'], answer: 1,
    explanation: 'The Just-In-Time compiler translates frequently executed bytecode into native machine code.',
  },
]

export const DEFAULT_ASSESSMENT_HISTORY: AssessmentRecord[] = [
  { id: 'a1', skillId: 'java', level: 'Intermediate', mode: 'mcq', score: 84, passed: true, date: '28 Oct 2026' },
  { id: 'a2', skillId: 'python', level: 'Beginner', mode: 'practical', score: 62, passed: false, date: '19 Oct 2026' },
  { id: 'a3', skillId: 'dbms', level: 'Beginner', mode: 'mcq', score: 91, passed: true, date: '04 Oct 2026' },
]

export const PASS_MARK = 70
