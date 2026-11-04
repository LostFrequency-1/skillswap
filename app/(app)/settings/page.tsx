import type { Metadata } from 'next'
import { Settings } from 'lucide-react'
import { ModulePlaceholder } from '@/components/shared/module-placeholder'

export const metadata: Metadata = { title: "Settings" }

export default function Page() {
  return (
    <ModulePlaceholder
      title="Settings"
      description="Account, notification and privacy preferences."
      icon={Settings}
      plannedFeatures={["Account","Notifications","Privacy"]}
    />
  )
}
