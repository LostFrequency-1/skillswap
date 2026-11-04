import type { Metadata } from 'next'
import { ArrowLeftRight } from 'lucide-react'
import { ModulePlaceholder } from '@/components/shared/module-placeholder'

export const metadata: Metadata = { title: "My Exchanges" }

export default function Page() {
  return (
    <ModulePlaceholder
      title="My Exchanges"
      description="Review received, sent, accepted and completed swap requests."
      icon={ArrowLeftRight}
      plannedFeatures={["Received","Sent","Accepted","Rejected","Completed"]}
    />
  )
}
