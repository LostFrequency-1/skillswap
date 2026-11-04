import type { Metadata } from 'next'
import { ExplorePage } from '@/components/explore/explore-page'

export const metadata: Metadata = { title: 'Explore Skills' }

export default function Page() { return <ExplorePage /> }
