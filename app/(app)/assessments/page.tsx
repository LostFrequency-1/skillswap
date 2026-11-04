import type { Metadata } from 'next'
import { AssessmentWorkspace } from '@/components/assessments/assessment-workspace'

export const metadata: Metadata = { title: 'Assessments' }

export default function Page() {
  return <AssessmentWorkspace />
}
