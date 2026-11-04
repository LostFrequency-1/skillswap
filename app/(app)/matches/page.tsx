import type { Metadata } from 'next'
import { MatchingPage } from '@/components/matching/matching-page'
import { CURRENT_USER } from '@/lib/data/users'

export const metadata: Metadata = { title: 'Matches' }

export default function Page() {
  return <MatchingPage currentUser={CURRENT_USER} />
}
