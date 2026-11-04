import type { Metadata } from 'next'
import { Sparkles } from 'lucide-react'
import { ModulePlaceholder } from '@/components/shared/module-placeholder'

export const metadata: Metadata = { title: "Matches" }

export default function Page() {
  return (
    <ModulePlaceholder
      title="Matches"
      description="Recommended learning partners based on your goals and schedule."
      icon={Sparkles}
      plannedFeatures={["Match percentage","Level compatibility","Availability overlap","Match explanations"]}
    />
  )
}
