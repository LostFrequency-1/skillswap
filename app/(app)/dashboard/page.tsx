import type { Metadata } from 'next'
import { LayoutDashboard } from 'lucide-react'
import { ModulePlaceholder } from '@/components/shared/module-placeholder'

export const metadata: Metadata = { title: "Dashboard" }

export default function Page() {
  return (
    <ModulePlaceholder
      title="Dashboard"
      description="Your learning and teaching activity at a glance."
      icon={LayoutDashboard}
      plannedFeatures={["Skill stats","Recommended teachers","Pending requests","Upcoming sessions","Recent activity"]}
    />
  )
}
