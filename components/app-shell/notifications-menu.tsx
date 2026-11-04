'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeftRight, BadgeCheck, Bell, CalendarDays, MessageSquare, type LucideIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { NOTIFICATIONS } from '@/lib/data/users'
import type { AppNotification, NotificationType } from '@/lib/types'
import { cn } from '@/lib/utils'

const TYPE_ICONS: Record<NotificationType, LucideIcon> = {
  request: ArrowLeftRight,
  session: CalendarDays,
  assessment: BadgeCheck,
  message: MessageSquare,
}

export function NotificationsMenu() {
  const router = useRouter()
  const [notifications, setNotifications] = useState<AppNotification[]>(NOTIFICATIONS)
  const unreadCount = notifications.filter((n) => !n.read).length

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    toast.success('All notifications marked as read')
  }

  const openNotification = (notification: AppNotification) => {
    setNotifications((prev) => prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n)))
    router.push(notification.href)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label={unreadCount > 0 ? `Notifications, ${unreadCount} unread` : 'Notifications'}
          />
        }
      >
        <Bell />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
            {unreadCount}
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">Notifications</span>
            {unreadCount > 0 && (
              <span className="text-xs font-normal text-muted-foreground">{unreadCount} unread</span>
            )}
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {notifications.map((notification) => {
            const Icon = TYPE_ICONS[notification.type]
            return (
              <DropdownMenuItem
                key={notification.id}
                onClick={() => openNotification(notification)}
                className="items-start gap-3 py-2"
              >
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-secondary text-primary">
                  <Icon />
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className={cn('text-sm text-foreground', !notification.read && 'font-medium')}>
                    {notification.title}
                  </span>
                  <span className="line-clamp-2 text-xs text-muted-foreground">{notification.description}</span>
                  <span className="text-xs text-muted-foreground">{notification.time}</span>
                </span>
                {!notification.read && (
                  <span aria-label="Unread" className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
                )}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem disabled={unreadCount === 0} onClick={markAllRead} className="justify-center text-primary">
            Mark all as read
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
