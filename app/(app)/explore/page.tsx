import type { Metadata } from 'next'
import { Compass } from 'lucide-react'
import { ModulePlaceholder } from '@/components/shared/module-placeholder'

export const metadata: Metadata = { title: "Explore Skills" }

export default function Page() {
  return (
    <ModulePlaceholder
      title="Explore Skills"
      description="Search teachers by skill, level, verification and availability."
      icon={Compass}
      plannedFeatures={["Search","Category filters","Level filters","Verified-only","Teacher cards"]}
    />
  )
}
