import {
  ArrowLeftRight,
  BadgeCheck,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  Compass,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Sparkles,
  UserRound,
  type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  title: string
  href: string
  icon: LucideIcon
  description: string
  badge?: string
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

export const APP_NAV: NavGroup[] = [
  {
    label: 'Learn',
    items: [
      {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
        description: 'Your learning and teaching activity at a glance.',
      },
      {
        title: 'Explore Skills',
        href: '/explore',
        icon: Compass,
        description: 'Search teachers by skill, level, verification and availability.',
      },
      {
        title: 'Matches',
        href: '/matches',
        icon: Sparkles,
        description: 'Recommended learning partners based on your goals and schedule.',
      },
      {
        title: 'My Skills',
        href: '/my-skills',
        icon: BookOpen,
        description: 'Manage the skills you teach and the skills you want to learn.',
      },
    ],
  },
  {
    label: 'Verify',
    items: [
      {
        title: 'Assessments',
        href: '/assessments',
        icon: ClipboardCheck,
        description: 'Take MCQ and practical assessments to unlock teaching levels.',
      },
      {
        title: 'Verification',
        href: '/verification',
        icon: BadgeCheck,
        description: 'Track verified levels, scores and your teaching eligibility.',
      },
    ],
  },
  {
    label: 'Connect',
    items: [
      {
        title: 'My Exchanges',
        href: '/exchanges',
        icon: ArrowLeftRight,
        description: 'Review received, sent, accepted and completed swap requests.',
        badge: '3',
      },
      {
        title: 'Messages',
        href: '/messages',
        icon: MessageSquare,
        description: 'Chat with your learning partners and share resources.',
        badge: '2',
      },
      {
        title: 'Schedule',
        href: '/schedule',
        icon: CalendarDays,
        description: 'Book, reschedule and review your exchange sessions.',
      },
    ],
  },
  {
    label: 'Account',
    items: [
      {
        title: 'My Profile',
        href: '/profile',
        icon: UserRound,
        description: 'Your public profile, reviews and verified teaching levels.',
      },
      {
        title: 'Settings',
        href: '/settings',
        icon: Settings,
        description: 'Account, notification and privacy preferences.',
      },
    ],
  },
]

export const ALL_NAV_ITEMS: NavItem[] = APP_NAV.flatMap((group) => group.items)

export function findNavItem(pathname: string): NavItem | undefined {
  return ALL_NAV_ITEMS.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))
}

export const LANDING_NAV = [
  { title: 'How it works', href: '#how-it-works' },
  { title: 'Skills', href: '#skills' },
  { title: 'Verification', href: '#verification' },
  { title: 'Testimonials', href: '#testimonials' },
]
