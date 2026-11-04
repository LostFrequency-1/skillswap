import type { Metadata } from 'next'
import { QuestionGenerator } from '@/components/admin/question-generator'

export const metadata: Metadata = { title: 'AI Question Generator' }

export default function Page() {
  return <QuestionGenerator />
}
