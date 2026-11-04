export type SkillId = 'java' | 'python' | 'dsa' | 'ml' | 'dbms' | 'cpp'

export type SkillCategory = 'Programming Languages' | 'CS Fundamentals' | 'Data & AI'

export type ProficiencyLevel = 'Beginner' | 'Intermediate' | 'Advanced'

export type Weekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'

export type TimeOfDay = 'Morning' | 'Afternoon' | 'Evening'

export interface Skill {
  id: SkillId
  name: string
  category: SkillCategory
  description: string
  topics: string[]
  teacherCount: number
  learnerCount: number
}

export interface TeachingSkill {
  skillId: SkillId
  selfDeclaredLevel: ProficiencyLevel
  verifiedLevels: ProficiencyLevel[]
}

export interface LearningSkill {
  skillId: SkillId
  currentLevel: ProficiencyLevel
  desiredLevel: ProficiencyLevel
}

export interface Availability {
  days: Weekday[]
  timesOfDay: TimeOfDay[]
}

export interface User {
  id: string
  name: string
  email: string
  headline: string
  college: string
  city: string
  bio: string
  rating: number
  reviewCount: number
  completedSessions: number
  teaches: TeachingSkill[]
  learns: LearningSkill[]
  availability: Availability
  role: 'member' | 'admin'
}

export interface Testimonial {
  id: string
  name: string
  role: string
  quote: string
  skillId: SkillId
}

export type NotificationType = 'request' | 'session' | 'assessment' | 'message'

export interface AppNotification {
  id: string
  type: NotificationType
  title: string
  description: string
  time: string
  read: boolean
  href: string
}
