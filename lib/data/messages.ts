export interface ChatMessage {
  id: string
  sender: 'me' | 'them'
  text: string
  timestamp: string
  resource?: { label: string; type: string }
}

export interface Conversation {
  id: string
  name: string
  skill: string
  initials: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
  messages: ChatMessage[]
}

export const CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    name: 'Priya Iyer',
    skill: 'Python ↔ Java exchange',
    initials: 'PI',
    lastMessage: 'I can do Thursday evening!',
    time: '10:42 AM',
    unread: 2,
    online: true,
    messages: [
      { id: 'm1', sender: 'them', text: 'Hey Arjun! Excited to learn Java from you.', timestamp: '10:16 AM' },
      { id: 'm2', sender: 'me', text: 'Same here. I have been wanting to get better at Python data workflows.', timestamp: '10:22 AM' },
      { id: 'm3', sender: 'them', text: 'I can do Thursday evening!', timestamp: '10:42 AM' },
    ],
  },
  {
    id: 'c2',
    name: 'Rohan Mehta',
    skill: 'Advanced Data Structures',
    initials: 'RM',
    lastMessage: 'Shared the graph problems sheet.',
    time: 'Yesterday',
    unread: 0,
    online: false,
    messages: [
      { id: 'm4', sender: 'me', text: 'Should we start with graph traversal this week?', timestamp: 'Yesterday' },
      { id: 'm5', sender: 'them', text: 'Shared the graph problems sheet.', timestamp: 'Yesterday', resource: { label: 'Graph problems — Week 1', type: 'PDF · 2.4 MB' } },
    ],
  },
  {
    id: 'c3',
    name: 'Ananya Reddy',
    skill: 'Machine Learning ↔ DBMS',
    initials: 'AR',
    lastMessage: 'The session notes are really helpful.',
    time: 'Mon',
    unread: 0,
    online: true,
    messages: [
      { id: 'm6', sender: 'them', text: 'The session notes are really helpful.', timestamp: 'Mon' },
    ],
  },
  {
    id: 'c4',
    name: 'Karthik Subramanian',
    skill: 'Java teaching partner',
    initials: 'KS',
    lastMessage: 'Thanks for the design patterns explanation.',
    time: 'Sun',
    unread: 0,
    online: false,
    messages: [
      { id: 'm7', sender: 'them', text: 'Thanks for the design patterns explanation.', timestamp: 'Sun' },
    ],
  },
]
