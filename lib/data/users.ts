import type { AppNotification, User } from '@/lib/types'

export const CURRENT_USER: User = {
  id: 'u-arjun',
  name: 'Arjun Verma',
  email: 'arjun.verma@skillswap.in',
  headline: 'Final-year CSE student · Backend enthusiast',
  college: 'BMSCE',
  city: 'Bengaluru',
  bio: 'I enjoy building backend systems in Java and love explaining OOP concepts. Currently levelling up in Machine Learning.',
  rating: 4.7,
  reviewCount: 18,
  completedSessions: 24,
  teaches: [
    { skillId: 'java', selfDeclaredLevel: 'Advanced', verifiedLevels: ['Beginner', 'Intermediate'] },
    { skillId: 'dbms', selfDeclaredLevel: 'Intermediate', verifiedLevels: ['Beginner'] },
  ],
  learns: [
    { skillId: 'ml', currentLevel: 'Beginner', desiredLevel: 'Intermediate' },
    { skillId: 'dsa', currentLevel: 'Intermediate', desiredLevel: 'Advanced' },
  ],
  availability: { days: ['Tue', 'Thu', 'Sat'], timesOfDay: ['Evening'] },
  role: 'member',
}

export const NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1',
    type: 'request',
    title: 'New exchange request',
    description: 'Priya Iyer wants to swap Python for your Java sessions.',
    time: '10 min ago',
    read: false,
    href: '/exchanges',
  },
  {
    id: 'n2',
    type: 'session',
    title: 'Session starting tomorrow',
    description: 'Machine Learning with Ananya Reddy · Thu, 7:00 PM',
    time: '2 hours ago',
    read: false,
    href: '/schedule',
  },
  {
    id: 'n3',
    type: 'assessment',
    title: 'Assessment passed',
    description: 'You are now verified to teach Java at Intermediate level.',
    time: 'Yesterday',
    read: false,
    href: '/verification',
  },
  {
    id: 'n4',
    type: 'message',
    title: 'Rohan Mehta sent a message',
    description: '"Shared the graph problems sheet for Saturday."',
    time: '2 days ago',
    read: true,
    href: '/messages',
  },
]
