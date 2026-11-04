import type { Metadata } from 'next'
import { BookOpen } from 'lucide-react'
import { ModulePlaceholder } from '@/components/shared/module-placeholder'

export const metadata: Metadata = { title: "My Skills" }

export default function Page() {
  return (
    <ModulePlaceholder
      title="My Skills"
      description="Manage the skills you teach and the skills you want to learn."
      icon={BookOpen}
      plannedFeatures={["Skills I can teach","Skills I want to learn","Add, edit and remove"]}
    />
  )
}
