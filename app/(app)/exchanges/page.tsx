import type { Metadata } from 'next'
import { ExchangesPage } from '@/components/exchanges/exchanges-page'

export const metadata: Metadata = { title: 'My Exchanges' }

export default function Page() {
  return <ExchangesPage />
}
