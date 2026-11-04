export type SessionStatus = 'upcoming' | 'completed' | 'cancelled'

export interface Session {
  id: string
  title: string
  partner: string
  skill: string
  date: string
  time: string
  duration: string
  status: SessionStatus
  mode: 'Video call' | 'Study room'
}

export const SESSIONS: Session[] = [
  { id: 's1', title: 'Machine Learning fundamentals', partner: 'Ananya Reddy', skill: 'Machine Learning', date: '2026-11-12', time: '7:00 PM', duration: '60 min', status: 'upcoming', mode: 'Video call' },
  { id: 's2', title: 'Java Collections deep dive', partner: 'Karthik Subramanian', skill: 'Java', date: '2026-11-14', time: '5:30 PM', duration: '45 min', status: 'upcoming', mode: 'Study room' },
  { id: 's3', title: 'Graph algorithms practice', partner: 'Rohan Mehta', skill: 'Data Structures', date: '2026-11-07', time: '6:00 PM', duration: '60 min', status: 'upcoming', mode: 'Video call' },
  { id: 's4', title: 'SQL joins and indexing', partner: 'Sneha Kulkarni', skill: 'DBMS', date: '2026-10-29', time: '7:30 PM', duration: '45 min', status: 'completed', mode: 'Study room' },
  { id: 's5', title: 'OOP design patterns', partner: 'Karthik Subramanian', skill: 'Java', date: '2026-10-22', time: '6:30 PM', duration: '60 min', status: 'completed', mode: 'Video call' },
]
