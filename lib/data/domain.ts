import type {
  Assessment,
  AssessmentResult,
  LearningGoal,
  Message,
  Question,
  Review,
  Session,
  SkillId,
  SwapRequest,
  TeachingProfile,
  Verification,
} from '@/lib/types'

export const MOCK_TEACHING_PROFILES: TeachingProfile[] = [
  { id: 'tp-arjun-java', userId: 'current-user', skillId: 'java', selfDeclaredLevel: 'Intermediate', verifiedLevels: ['Beginner', 'Intermediate'], isOpenToRequests: true },
  { id: 'tp-arjun-cpp', userId: 'current-user', skillId: 'cpp', selfDeclaredLevel: 'Beginner', verifiedLevels: [], isOpenToRequests: true },
  { id: 'tp-priya-python', userId: 'u-priya', skillId: 'python', selfDeclaredLevel: 'Advanced', verifiedLevels: ['Beginner', 'Intermediate', 'Advanced'], isOpenToRequests: true },
  { id: 'tp-rohan-dsa', userId: 'u-rohan', skillId: 'dsa', selfDeclaredLevel: 'Advanced', verifiedLevels: ['Beginner', 'Intermediate', 'Advanced'], isOpenToRequests: true },
]

export const MOCK_LEARNING_GOALS: LearningGoal[] = [
  { id: 'lg-arjun-python', userId: 'current-user', skillId: 'python', currentLevel: 'Beginner', desiredLevel: 'Intermediate', priority: 'high' },
  { id: 'lg-arjun-ml', userId: 'current-user', skillId: 'ml', currentLevel: 'Beginner', desiredLevel: 'Beginner', priority: 'medium' },
  { id: 'lg-priya-java', userId: 'u-priya', skillId: 'java', currentLevel: 'Beginner', desiredLevel: 'Intermediate', priority: 'high' },
]

export const MOCK_ASSESSMENTS: Assessment[] = [
  { id: 'assessment-java-intermediate', skillId: 'java', title: 'Java Intermediate Knowledge Check', level: 'Intermediate', mode: 'mcq', durationMinutes: 5, passMark: 70, questionIds: ['question-java-1', 'question-java-2'], status: 'published' },
  { id: 'assessment-python-beginner', skillId: 'python', title: 'Python Beginner Practical', level: 'Beginner', mode: 'practical', durationMinutes: 20, passMark: 70, questionIds: ['question-python-1'], status: 'published' },
]

export const MOCK_QUESTIONS: Question[] = [
  { id: 'question-java-1', assessmentId: 'assessment-java-intermediate', topic: 'Collections', prompt: 'Which collection preserves insertion order while providing key-based lookup?', options: ['HashMap', 'LinkedHashMap', 'TreeMap', 'PriorityQueue'], correctAnswer: 1, explanation: 'LinkedHashMap maintains insertion order and supports average constant-time key lookup.', source: 'admin', status: 'approved' },
  { id: 'question-java-2', assessmentId: 'assessment-java-intermediate', topic: 'OOP', prompt: 'Which concept lets a subclass provide a specific parent-method implementation?', options: ['Encapsulation', 'Overloading', 'Overriding', 'Composition'], correctAnswer: 2, explanation: 'Overriding replaces an inherited method implementation in a subclass.', source: 'ai', status: 'approved' },
  { id: 'question-python-1', assessmentId: 'assessment-python-beginner', topic: 'Strings', prompt: 'Return the first unique character in a string.', options: [], correctAnswer: 0, explanation: 'Use a frequency map and a second pass to preserve input order.', source: 'admin', status: 'approved' },
]

export const MOCK_ASSESSMENT_RESULTS: AssessmentResult[] = [
  { id: 'result-java-1', assessmentId: 'assessment-java-intermediate', userId: 'current-user', score: 84, passed: true, answers: { 'question-java-1': 1, 'question-java-2': 2 }, startedAt: '2026-10-28T18:00:00Z', completedAt: '2026-10-28T18:05:00Z' },
]

export const MOCK_VERIFICATIONS: Verification[] = [
  { id: 'verification-java-intermediate', userId: 'current-user', skillId: 'java', level: 'Intermediate', assessmentResultId: 'result-java-1', status: 'verified', verifiedAt: '2026-10-28T18:05:00Z' },
  { id: 'verification-java-beginner', userId: 'current-user', skillId: 'java', level: 'Beginner', assessmentResultId: 'result-java-1', status: 'verified', verifiedAt: '2026-10-28T18:05:00Z' },
]

export const MOCK_SWAP_REQUESTS: SwapRequest[] = [
  { id: 'swap-priya-python', initiatorId: 'current-user', respondentId: 'u-priya', initiatorSkillId: 'java', respondentSkillId: 'python', initiatorLevel: 'Intermediate', respondentLevel: 'Advanced', message: 'I would love to learn Python from you. I can help with Java in return!', status: 'pending', createdAt: '2026-11-02T10:00:00Z' },
  { id: 'swap-rohan-dsa', initiatorId: 'current-user', respondentId: 'u-rohan', initiatorSkillId: 'java', respondentSkillId: 'dsa', initiatorLevel: 'Intermediate', respondentLevel: 'Advanced', message: 'Great! Let us start this week.', status: 'accepted', createdAt: '2026-10-28T10:00:00Z', respondedAt: '2026-10-28T12:00:00Z' },
]

export const MOCK_SESSIONS: Session[] = [
  { id: 'session-ml-ananya', swapRequestId: 'swap-ananya-ml', hostUserId: 'u-ananya', guestUserId: 'current-user', skillId: 'ml', title: 'Machine Learning fundamentals', startsAt: '2026-11-12T19:00:00+05:30', durationMinutes: 60, mode: 'video', status: 'scheduled' },
  { id: 'session-java-karthik', swapRequestId: 'swap-karthik-java', hostUserId: 'current-user', guestUserId: 'u-karthik', skillId: 'java', title: 'Java Collections deep dive', startsAt: '2026-11-14T17:30:00+05:30', durationMinutes: 45, mode: 'study-room', status: 'scheduled' },
]

export const MOCK_MESSAGES: Message[] = [
  { id: 'message-priya-1', conversationId: 'conversation-priya', senderId: 'u-priya', body: 'I can do Thursday evening!', sentAt: '2026-11-04T10:42:00+05:30' },
  { id: 'message-priya-2', conversationId: 'conversation-priya', senderId: 'current-user', body: 'Same here. I have been wanting to get better at Python data workflows.', sentAt: '2026-11-04T10:22:00+05:30' },
]

export const MOCK_REVIEWS: Review[] = [
  { id: 'review-rohan-1', sessionId: 'session-dsa-rohan', reviewerId: 'current-user', revieweeId: 'u-rohan', rating: 5, comment: 'Clear explanations and great problem-solving structure.', createdAt: '2026-10-30T20:00:00Z' },
  { id: 'review-arjun-1', sessionId: 'session-java-arjun', reviewerId: 'u-karthik', revieweeId: 'current-user', rating: 5, comment: 'Patient Java mentor who made design patterns feel practical.', createdAt: '2026-10-22T20:00:00Z' },
]

export const MOCK_ENTITY_COUNTS: Record<string, number> = {
  users: 1284,
  skills: 6,
  teachingProfiles: MOCK_TEACHING_PROFILES.length,
  learningGoals: MOCK_LEARNING_GOALS.length,
  assessments: MOCK_ASSESSMENTS.length,
  questions: MOCK_QUESTIONS.length,
  assessmentResults: MOCK_ASSESSMENT_RESULTS.length,
  verifications: MOCK_VERIFICATIONS.length,
  swapRequests: MOCK_SWAP_REQUESTS.length,
  sessions: MOCK_SESSIONS.length,
  messages: MOCK_MESSAGES.length,
  reviews: MOCK_REVIEWS.length,
}

export type DomainSkillId = SkillId
