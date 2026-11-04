'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { NotificationsMenu } from '@/components/app-shell/notifications-menu'
import { HeaderUserMenu } from '@/components/app-shell/user-menu'
import { findNavItem } from '@/lib/navigation'

export function AppHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const current = findNavItem(pathname)

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const query = new FormData(event.currentTarget).get('q')?.toString().trim()
    router.push(query ? `/explore?q=${encodeURIComponent(query)}` : '/explore')
  }

  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background/90 px-4 backdrop-blur supports-backdrop-filter:bg-background/75 md:px-6">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4 data-vertical:self-center" />
      <p className="truncate text-sm font-medium text-foreground">{current?.title ?? 'SkillSwap'}</p>

      <div className="ml-auto flex items-center gap-1 md:gap-2">
        <form role="search" onSubmit={handleSearch} className="relative hidden md:block">
          <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <label htmlFor="global-search" className="sr-only">
            Search skills or people
          </label>
          <Input
            id="global-search"
            name="q"
            type="search"
            placeholder="Search skills or people..."
            className="w-64 bg-card pl-8 lg:w-80"
          />
        </form>
        <NotificationsMenu />
        <HeaderUserMenu />
      </div>
    </header>
  )
}
