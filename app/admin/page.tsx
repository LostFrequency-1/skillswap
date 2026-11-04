import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/shared/logo'

export const metadata = { title: "Admin console" }

export default function Page() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 text-center">
      <Logo />
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Admin console</h1>
        <p className="text-sm text-muted-foreground">This page will be built in the next stage.</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" render={<Link href="/" />} nativeButton={false}>Home</Button>
        <Button render={<Link href="/dashboard" />} nativeButton={false}>Open demo dashboard</Button>
      </div>
    </main>
  )
}
