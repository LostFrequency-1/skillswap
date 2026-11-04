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

export interface TeachingProfile {
  id: string
  userId: string
  skillId: SkillId
  selfDeclaredLevel: ProficiencyLevel
  verifiedLevels: ProficiencyLevel[]
  isOpenToRequests: boolean
}

export interface LearningGoal {
  id: string
  userId: string
  skillId: SkillId
  currentLevel: ProficiencyLevel
  desiredLevel: ProficiencyLevel
  priority: 'low' | 'medium' | 'high'
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
  teachingProfiles?: TeachingProfile[]
  learningGoals?: LearningGoal[]
  availability: Availability
  role: 'member' | 'admin'
}

export interface Assessment {
  id: string
  skillId: SkillId
  title: string
  level: ProficiencyLevel
  mode: 'mcq' | 'practical'
  durationMinutes: number
  passMark: number
  questionIds: string[]
  status: 'draft' | 'published' | 'archived'
}

export interface Question {
  id: string
  assessmentId: string
  topic: string
  prompt: string
  options: string[]
  correctAnswer: number
  explanation: string
  source: 'admin' | 'ai'
  status: 'draft' | 'approved' | 'archived'
}

export interface AssessmentResult {
  id: string
  assessmentId: string
  userId: string
  score: number
  passed: boolean
  answers: Record<string, number>
  startedAt: string
  completedAt?: string
}

export interface Verification {
  id: string
  userId: string
  skillId: SkillId
  level: ProficiencyLevel
  assessmentResultId: string
  status: 'pending' | 'verified' | 'expired'
  verifiedAt?: string
}

export interface SwapRequest {
  id: string
  initiatorId: string
  respondentId: string
  initiatorSkillId: SkillId
  respondentSkillId: SkillId
  initiatorLevel: ProficiencyLevel
  respondentLevel: ProficiencyLevel
  message: string
  status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled'
  createdAt: string
  respondedAt?: string
}

export interface Session {
  id: string
  swapRequestId: string
  hostUserId: string
  guestUserId: string
  skillId: SkillId
  title: string
  startsAt: string
  durationMinutes: number
  mode: 'video' | 'study-room'
  status: 'scheduled' | 'completed' | 'cancelled'
}

export interface Message {
  id: string
  conversationId: string
  senderId: string
  body: string
  sentAt: string
  resourceUrl?: string
}

export interface Review {
  id: string
  sessionId: string
  reviewerId: string
  revieweeId: string
  rating: number
  comment: string
  createdAt: string
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
