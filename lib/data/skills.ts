import type { ProficiencyLevel, Skill, SkillId } from '@/lib/types'

export const PROFICIENCY_LEVELS: ProficiencyLevel[] = ['Beginner', 'Intermediate', 'Advanced']

export const SKILLS: Skill[] = [
  {
    id: 'java',
    name: 'Java',
    category: 'Programming Languages',
    description: 'Object-oriented programming, collections, exception handling and multithreading.',
    topics: ['OOP', 'Collections', 'Streams', 'Multithreading', 'JVM'],
    teacherCount: 142,
    learnerCount: 389,
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Programming Languages',
    description: 'Clean syntax, data structures, file handling, libraries and scripting.',
    topics: ['Syntax', 'Functions', 'OOP', 'File I/O', 'Libraries'],
    teacherCount: 218,
    learnerCount: 512,
  },
  {
    id: 'cpp',
    name: 'C++',
    category: 'Programming Languages',
    description: 'Pointers, memory management, STL and competitive programming techniques.',
    topics: ['Pointers', 'STL', 'Templates', 'Memory', 'OOP'],
    teacherCount: 126,
    learnerCount: 301,
  },
  {
    id: 'dsa',
    name: 'Data Structures',
    category: 'CS Fundamentals',
    description: 'Arrays, linked lists, trees, graphs, hashing and algorithmic problem solving.',
    topics: ['Arrays', 'Linked Lists', 'Trees', 'Graphs', 'Dynamic Programming'],
    teacherCount: 174,
    learnerCount: 640,
  },
  {
    id: 'dbms',
    name: 'DBMS',
    category: 'CS Fundamentals',
    description: 'Relational modelling, SQL, normalization, transactions and indexing.',
    topics: ['ER Models', 'SQL', 'Normalization', 'Transactions', 'Indexing'],
    teacherCount: 98,
    learnerCount: 276,
  },
  {
    id: 'ml',
    name: 'Machine Learning',
    category: 'Data & AI',
    description: 'Regression, classification, model evaluation and practical scikit-learn workflows.',
    topics: ['Regression', 'Classification', 'Clustering', 'Evaluation', 'Feature Engineering'],
    teacherCount: 87,
    learnerCount: 458,
  },
]

export function getSkill(id: SkillId): Skill {
  const skill = SKILLS.find((s) => s.id === id)
  if (!skill) throw new Error(`Unknown skill: ${id}`)
  return skill
}
