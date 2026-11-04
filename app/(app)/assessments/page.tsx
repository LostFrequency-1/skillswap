import type { Metadata } from 'next'
import { ClipboardCheck } from 'lucide-react'
import { ModulePlaceholder } from '@/components/shared/module-placeholder'

export const metadata: Metadata = { title: "Assessments" }

export default function Page() {
  return (
    <ModulePlaceholder
      title="Assessments"
      description="Take MCQ and practical assessments to unlock teaching levels."
      icon={ClipboardCheck}
      plannedFeatures={["Skill and difficulty selection","Timed MCQ","Practical coding","Results"]}
    />
  )
}
