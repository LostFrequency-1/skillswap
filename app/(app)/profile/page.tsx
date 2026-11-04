import type { Metadata } from 'next'
import { UserRound } from 'lucide-react'
import { ModulePlaceholder } from '@/components/shared/module-placeholder'

export const metadata: Metadata = { title: "My Profile" }

export default function Page() {
  return (
    <ModulePlaceholder
      title="My Profile"
      description="Your public profile, reviews and verified teaching levels."
      icon={UserRound}
      plannedFeatures={["Bio","Skills","Verified levels","Reviews","Edit profile"]}
    />
  )
}
