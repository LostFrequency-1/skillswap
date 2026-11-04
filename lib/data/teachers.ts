import type { User } from '@/lib/types'

export const TEACHERS: User[] = [
  {
    id: 'u-priya', name: 'Priya Iyer', email: 'priya@skillswap.in', headline: 'Python developer · Data curious', college: 'Anna University', city: 'Chennai', bio: 'I love making Python and data concepts approachable with small, practical examples.', rating: 4.9, reviewCount: 32, completedSessions: 41, role: 'member',
    teaches: [{ skillId: 'python', selfDeclaredLevel: 'Advanced', verifiedLevels: ['Beginner', 'Intermediate', 'Advanced'] }, { skillId: 'dsa', selfDeclaredLevel: 'Intermediate', verifiedLevels: ['Beginner', 'Intermediate'] }], learns: [{ skillId: 'java', currentLevel: 'Beginner', desiredLevel: 'Intermediate' }], availability: { days: ['Mon', 'Wed', 'Fri'], timesOfDay: ['Evening'] },
  },
  {
    id: 'u-ananya', name: 'Ananya Reddy', email: 'ananya@skillswap.in', headline: 'ML researcher · Python mentor', college: 'IIIT Hyderabad', city: 'Hyderabad', bio: 'M.Tech AI student helping peers turn ML theory into intuition and working notebooks.', rating: 4.8, reviewCount: 24, completedSessions: 36, role: 'member',
    teaches: [{ skillId: 'ml', selfDeclaredLevel: 'Advanced', verifiedLevels: ['Beginner', 'Intermediate'] }, { skillId: 'python', selfDeclaredLevel: 'Advanced', verifiedLevels: ['Beginner', 'Intermediate', 'Advanced'] }], learns: [{ skillId: 'dbms', currentLevel: 'Beginner', desiredLevel: 'Intermediate' }], availability: { days: ['Tue', 'Thu', 'Sat'], timesOfDay: ['Evening'] },
  },
  {
    id: 'u-rohan', name: 'Rohan Mehta', email: 'rohan@skillswap.in', headline: 'SDE intern · DSA problem solver', college: 'COEP Pune', city: 'Pune', bio: 'I learn best by solving together. Let us make DSA less intimidating, one pattern at a time.', rating: 4.7, reviewCount: 18, completedSessions: 29, role: 'member',
    teaches: [{ skillId: 'dsa', selfDeclaredLevel: 'Advanced', verifiedLevels: ['Beginner', 'Intermediate', 'Advanced'] }, { skillId: 'cpp', selfDeclaredLevel: 'Advanced', verifiedLevels: ['Beginner', 'Intermediate'] }], learns: [{ skillId: 'ml', currentLevel: 'Beginner', desiredLevel: 'Intermediate' }], availability: { days: ['Mon', 'Tue', 'Thu'], timesOfDay: ['Evening'] },
  },
  {
    id: 'u-vikram', name: 'Vikram Nair', email: 'vikram@skillswap.in', headline: 'Systems builder · C++ enthusiast', college: 'RVCE Bengaluru', city: 'Bengaluru', bio: 'Pointers, STL and performance trade-offs are my happy place. I also make a decent study plan.', rating: 4.6, reviewCount: 15, completedSessions: 22, role: 'member',
    teaches: [{ skillId: 'cpp', selfDeclaredLevel: 'Advanced', verifiedLevels: ['Beginner', 'Intermediate'] }, { skillId: 'java', selfDeclaredLevel: 'Intermediate', verifiedLevels: ['Beginner'] }], learns: [{ skillId: 'ml', currentLevel: 'Beginner', desiredLevel: 'Beginner' }], availability: { days: ['Wed', 'Sat'], timesOfDay: ['Morning', 'Afternoon'] },
  },
  {
    id: 'u-sneha', name: 'Sneha Kulkarni', email: 'sneha@skillswap.in', headline: 'Data analyst · SQL storyteller', college: 'VJTI Mumbai', city: 'Mumbai', bio: 'I teach SQL by connecting every query to a question a real team would ask.', rating: 4.9, reviewCount: 27, completedSessions: 33, role: 'member',
    teaches: [{ skillId: 'dbms', selfDeclaredLevel: 'Advanced', verifiedLevels: ['Beginner', 'Intermediate', 'Advanced'] }, { skillId: 'python', selfDeclaredLevel: 'Intermediate', verifiedLevels: ['Beginner', 'Intermediate'] }], learns: [{ skillId: 'dsa', currentLevel: 'Beginner', desiredLevel: 'Intermediate' }], availability: { days: ['Mon', 'Wed', 'Fri'], timesOfDay: ['Morning', 'Afternoon'] },
  },
  {
    id: 'u-karthik', name: 'Karthik Subramanian', email: 'karthik@skillswap.in', headline: 'Backend learner · Java mentor', college: 'NIT Trichy', city: 'Trichy', bio: 'From ECE to software engineering. I enjoy breaking down Java backend concepts for beginners.', rating: 4.8, reviewCount: 21, completedSessions: 27, role: 'member',
    teaches: [{ skillId: 'java', selfDeclaredLevel: 'Advanced', verifiedLevels: ['Beginner', 'Intermediate'] }, { skillId: 'dbms', selfDeclaredLevel: 'Intermediate', verifiedLevels: ['Beginner', 'Intermediate'] }], learns: [{ skillId: 'ml', currentLevel: 'Beginner', desiredLevel: 'Intermediate' }], availability: { days: ['Tue', 'Thu', 'Sat'], timesOfDay: ['Evening'] },
  },
]
