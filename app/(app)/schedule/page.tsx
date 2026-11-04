import type { Metadata } from 'next'
import { CalendarDays } from 'lucide-react'
import { ModulePlaceholder } from '@/components/shared/module-placeholder'

export const metadata: Metadata = { title: "Schedule" }

export default function Page() {
  return (
    <ModulePlaceholder
      title="Schedule"
      description="Book, reschedule and review your exchange sessions."
      icon={CalendarDays}
      plannedFeatures={["Calendar","Upcoming sessions","Book session","Reschedule and cancel"]}
    />
  )
}
