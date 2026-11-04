import { Braces, BrainCircuit, Coffee, Database, Network, Terminal, type LucideIcon } from 'lucide-react'
import type { SkillId } from '@/lib/types'

export const SKILL_ICONS: Record<SkillId, LucideIcon> = {
  java: Coffee,
  python: Terminal,
  cpp: Braces,
  dsa: Network,
  dbms: Database,
  ml: BrainCircuit,
}
