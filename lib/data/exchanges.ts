export type ExchangeStatus = 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled'

export interface SkillExchange {
  id: string
  initiatorId: string
  initiatorName: string
  initiatorAvatar: string
  respondentId: string
  respondentName: string
  respondentAvatar: string
  skill: string
  skillId: string
  initiatorOffers: string
  initiatorOfferLevel: string
  respondentOffers: string
  respondentOfferLevel: string
  status: ExchangeStatus
  createdAt: string
  respondedAt?: string
  completedAt?: string
  message?: string
}

export const EXCHANGES: SkillExchange[] = [
  {
    id: 'ex-1',
    initiatorId: 'current-user',
    initiatorName: 'You',
    initiatorAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Arjun',
    respondentId: 'u-priya',
    respondentName: 'Priya Iyer',
    respondentAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Priya',
    skill: 'Python',
    skillId: 'python',
    initiatorOffers: 'Java',
    initiatorOfferLevel: 'Intermediate',
    respondentOffers: 'Python',
    respondentOfferLevel: 'Advanced',
    status: 'pending',
    createdAt: '2024-11-02',
    message: 'I would love to learn Python from you. I can help with Java in return!',
  },
  {
    id: 'ex-2',
    initiatorId: 'u-ananya',
    initiatorName: 'Ananya Reddy',
    initiatorAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Ananya',
    respondentId: 'current-user',
    respondentName: 'You',
    respondentAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Arjun',
    skill: 'DBMS',
    skillId: 'dbms',
    initiatorOffers: 'Machine Learning',
    initiatorOfferLevel: 'Advanced',
    respondentOffers: 'DBMS',
    respondentOfferLevel: 'Intermediate',
    status: 'pending',
    createdAt: '2024-11-01',
    message: 'I am interested in learning DBMS. Can we do an exchange with Machine Learning?',
  },
  {
    id: 'ex-3',
    initiatorId: 'current-user',
    initiatorName: 'You',
    initiatorAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Arjun',
    respondentId: 'u-rohan',
    respondentName: 'Rohan Mehta',
    respondentAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Rohan',
    skill: 'Data Structures',
    skillId: 'dsa',
    initiatorOffers: 'Java',
    initiatorOfferLevel: 'Intermediate',
    respondentOffers: 'Data Structures',
    respondentOfferLevel: 'Advanced',
    status: 'accepted',
    createdAt: '2024-10-28',
    respondedAt: '2024-10-28',
    message: 'Great! I accept your request. Let us start this week.',
  },
  {
    id: 'ex-4',
    initiatorId: 'u-sneha',
    initiatorName: 'Sneha Kulkarni',
    initiatorAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Sneha',
    respondentId: 'current-user',
    respondentName: 'You',
    respondentAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Arjun',
    skill: 'DBMS',
    skillId: 'dbms',
    initiatorOffers: 'DBMS',
    initiatorOfferLevel: 'Advanced',
    respondentOffers: 'C++',
    respondentOfferLevel: 'Intermediate',
    status: 'rejected',
    createdAt: '2024-10-25',
    respondedAt: '2024-10-26',
    message: 'Not a good fit at the moment. Let us connect later.',
  },
  {
    id: 'ex-5',
    initiatorId: 'current-user',
    initiatorName: 'You',
    initiatorAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Arjun',
    respondentId: 'u-karthik',
    respondentName: 'Karthik Subramanian',
    respondentAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Karthik',
    skill: 'Java',
    skillId: 'java',
    initiatorOffers: 'DBMS',
    initiatorOfferLevel: 'Beginner',
    respondentOffers: 'Java',
    respondentOfferLevel: 'Advanced',
    status: 'completed',
    createdAt: '2024-10-10',
    respondedAt: '2024-10-10',
    completedAt: '2024-10-22',
    message: 'Completed 5 sessions. Learned OOP and design patterns!',
  },
]
