import { Atom, Braces, BrainCircuit, ChartColumn, Cloud, Code2, Coffee, Cog, Cpu, Database, GitBranch, Glasses, Monitor, Network, Radio, Server, ShieldCheck, Terminal, Workflow, type LucideIcon } from 'lucide-react'
import type { SkillId } from '@/lib/types'

export const SKILL_ICONS: Record<SkillId, LucideIcon> = {
  java: Coffee,
  python: Terminal,
  cpp: Braces,
  dsa: Network,
  dbms: Database,
  ml: BrainCircuit,
  react: Atom,
  express: Server,
  'cloud-computing': Cloud,
  cybersecurity: ShieldCheck,
  'operating-systems': Monitor,
  'embedded-systems': Cpu,
  'html-css': Code2,
  'compiler-design': GitBranch,
  'data-analysis': ChartColumn,
  'deep-learning': BrainCircuit,
  devops: Workflow,
  'ar-vr': Glasses,
  iot: Radio,
  go: Terminal,
  rust: Cog,
}
