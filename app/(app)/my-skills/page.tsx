import type { Metadata } from 'next'
import { MySkillsPage } from '@/components/skills/my-skills-page'

export const metadata: Metadata = { title: 'My Skills' }

export default function Page() { return <MySkillsPage /> }
