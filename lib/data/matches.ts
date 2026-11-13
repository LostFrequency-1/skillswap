import type { User } from '@/lib/types'
import { TEACHERS } from './teachers'

export interface Match {
  teacher: User
  matchPercentage: number
  levelCompatibility: {
    offered: string
    desired: string
    match: boolean
  }
  availabilityOverlap: number
  explanation: string
  skill: string
}

export function generateMatches(currentUser: User): Match[] {
  const matches: Match[] = []

  for (const teacher of TEACHERS) {
    if (teacher.id === currentUser.id) continue

    for (const learning of currentUser.learns) {
      const teaches = teacher.teaches.find(t => t.skillId === learning.skillId)
      if (!teaches) continue

      const levelMap = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 }
      const desiredNum = levelMap[learning.desiredLevel]
      const teachesNum = levelMap[teaches.selfDeclaredLevel]
      const levelMatch = teachesNum >= desiredNum

      const availabilityMatch = Object.entries(teacher.availability.byDay).some(([day, teacherTimes]) =>
        teacherTimes?.some((time) => currentUser.availability.byDay[day as keyof typeof currentUser.availability.byDay]?.includes(time)),
      )
      const availabilityScore = availabilityMatch ? 30 : 0

      const ratingScore = (teacher.rating / 5) * 20
      const levelScore = levelMatch ? 30 : 10
      const matchPercentage = Math.round(availabilityScore + ratingScore + levelScore)

      const skillName = { 'java': 'Java', 'python': 'Python', 'dsa': 'Data Structures', 'ml': 'Machine Learning', 'dbms': 'DBMS', 'cpp': 'C++' }[learning.skillId] || learning.skillId

      matches.push({
        teacher,
        matchPercentage,
        levelCompatibility: {
          offered: teaches.selfDeclaredLevel,
          desired: learning.desiredLevel,
          match: levelMatch,
        },
        availabilityOverlap: availabilityMatch ? 100 : 0,
        explanation: levelMatch && availabilityMatch
          ? `Strong match: ${teacher.name} is verified at ${teaches.selfDeclaredLevel} level for ${skillName} with compatible availability.`
          : levelMatch && !availabilityMatch
          ? `Good fit: ${teacher.name} has the right level for ${skillName} but limited availability overlap.`
          : !levelMatch && availabilityMatch
          ? `Potential match: ${teacher.name} offers ${skillName} at ${teaches.selfDeclaredLevel} level with compatible scheduling.`
          : `Partial match: ${teacher.name} teaches ${skillName} but may require coordination.`,
        skill: skillName,
      })
    }
  }

  return matches.sort((a, b) => b.matchPercentage - a.matchPercentage).slice(0, 8)
}
