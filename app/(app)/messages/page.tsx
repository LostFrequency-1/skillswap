import type { Metadata } from 'next'
import { MessagesPage } from '@/components/messages/messages-page'

export const metadata: Metadata = { title: 'Messages' }

export default function Page() {
  return <MessagesPage />
}
