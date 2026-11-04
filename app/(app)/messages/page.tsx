import type { Metadata } from 'next'
import { MessageSquare } from 'lucide-react'
import { ModulePlaceholder } from '@/components/shared/module-placeholder'

export const metadata: Metadata = { title: "Messages" }

export default function Page() {
  return (
    <ModulePlaceholder
      title="Messages"
      description="Chat with your learning partners and share resources."
      icon={MessageSquare}
      plannedFeatures={["Conversations","Chat history","Shared resources"]}
    />
  )
}
