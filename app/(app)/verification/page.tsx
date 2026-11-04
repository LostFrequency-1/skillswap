import type { Metadata } from 'next'
import { BadgeCheck } from 'lucide-react'
import { ModulePlaceholder } from '@/components/shared/module-placeholder'

export const metadata: Metadata = { title: "Verification" }

export default function Page() {
  return (
    <ModulePlaceholder
      title="Verification"
      description="Track verified levels, scores and your teaching eligibility."
      icon={BadgeCheck}
      plannedFeatures={["Verification cards","Score history","Teaching eligibility","Retakes"]}
    />
  )
}
