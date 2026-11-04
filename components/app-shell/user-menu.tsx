'use client'

import { useRouter } from 'next/navigation'
import { ChevronsUpDown, LogOut, Settings, UserRound } from 'lucide-react'
import { toast } from 'sonner'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { SidebarMenuButton } from '@/components/ui/sidebar'
import { UserAvatar } from '@/components/shared/user-avatar'
import { CURRENT_USER } from '@/lib/data/users'

function UserMenuItems() {
  const router = useRouter()

  const handleSignOut = () => {
    toast.success('Signed out', { description: 'See you soon, keep swapping skills!' })
    router.push('/')
  }

  return (
    <>
      <DropdownMenuGroup>
        <DropdownMenuLabel className="flex items-center gap-2 py-2">
          <UserAvatar name={CURRENT_USER.name} className="size-8" />
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-medium text-foreground">{CURRENT_USER.name}</span>
            <span className="truncate text-xs font-normal text-muted-foreground">{CURRENT_USER.email}</span>
          </span>
        </DropdownMenuLabel>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem onClick={() => router.push('/profile')}>
          <UserRound />
          My Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/settings')}>
          <Settings />
          Settings
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem variant="destructive" onClick={handleSignOut}>
          <LogOut />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </>
  )
}

export function SidebarUserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<SidebarMenuButton size="lg" tooltip={CURRENT_USER.name} />}>
        <UserAvatar name={CURRENT_USER.name} className="size-8" />
        <span className="flex min-w-0 flex-1 flex-col text-left leading-tight">
          <span className="truncate text-sm font-medium">{CURRENT_USER.name}</span>
          <span className="truncate text-xs text-muted-foreground">{CURRENT_USER.college}</span>
        </span>
        <ChevronsUpDown className="ml-auto" />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="start" className="w-60">
        <UserMenuItems />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function HeaderUserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon" className="rounded-full" aria-label="Open profile menu" />}
      >
        <UserAvatar name={CURRENT_USER.name} className="size-8" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <UserMenuItems />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
