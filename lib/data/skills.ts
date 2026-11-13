import type { ProficiencyLevel, Skill, SkillId } from '@/lib/types'

export const PROFICIENCY_LEVELS: ProficiencyLevel[] = ['Beginner', 'Intermediate', 'Advanced']

export const SKILLS: Skill[] = [
  { id: 'java', name: 'Java', category: 'Programming Languages', description: 'Object-oriented programming, collections, exception handling and multithreading.', topics: ['OOP', 'Collections', 'Streams', 'Multithreading', 'JVM'], teacherCount: 142, learnerCount: 389 },
  { id: 'python', name: 'Python', category: 'Programming Languages', description: 'Clean syntax, data structures, file handling, libraries and scripting.', topics: ['Syntax', 'Functions', 'OOP', 'File I/O', 'Libraries'], teacherCount: 218, learnerCount: 512 },
  { id: 'cpp', name: 'C++', category: 'Programming Languages', description: 'Pointers, memory management, STL and competitive programming techniques.', topics: ['Pointers', 'STL', 'Templates', 'Memory', 'OOP'], teacherCount: 126, learnerCount: 301 },
  { id: 'go', name: 'Go', category: 'Programming Languages', description: 'Go syntax, concurrency, services and idiomatic application design.', topics: ['Goroutines', 'Channels', 'Interfaces', 'Packages', 'HTTP'], teacherCount: 70, learnerCount: 128 },
  { id: 'rust', name: 'Rust', category: 'Programming Languages', description: 'Ownership, borrowing, types and reliable systems programming.', topics: ['Ownership', 'Borrowing', 'Lifetimes', 'Traits', 'Cargo'], teacherCount: 58, learnerCount: 115 },
  { id: 'dsa', name: 'Data Structures', category: 'CS Fundamentals', description: 'Arrays, linked lists, trees, graphs, hashing and algorithmic problem solving.', topics: ['Arrays', 'Linked Lists', 'Trees', 'Graphs', 'Dynamic Programming'], teacherCount: 174, learnerCount: 640 },
  { id: 'dbms', name: 'DBMS', category: 'CS Fundamentals', description: 'Relational modelling, SQL, normalization, transactions and indexing.', topics: ['ER Models', 'SQL', 'Normalization', 'Transactions', 'Indexing'], teacherCount: 98, learnerCount: 276 },
  { id: 'operating-systems', name: 'Operating Systems', category: 'CS Fundamentals', description: 'Processes, memory, scheduling, concurrency and file systems.', topics: ['Processes', 'Memory', 'Scheduling', 'Concurrency', 'File Systems'], teacherCount: 89, learnerCount: 186 },
  { id: 'compiler-design', name: 'Compiler Design', category: 'CS Fundamentals', description: 'Language processing from lexical analysis through code generation.', topics: ['Lexing', 'Parsing', 'Syntax Trees', 'Optimization', 'Code Generation'], teacherCount: 54, learnerCount: 90 },
  { id: 'ml', name: 'Machine Learning', category: 'Data & AI', description: 'Regression, classification, model evaluation and practical scikit-learn workflows.', topics: ['Regression', 'Classification', 'Clustering', 'Evaluation', 'Feature Engineering'], teacherCount: 87, learnerCount: 458 },
  { id: 'data-analysis', name: 'Data Analysis', category: 'Data & AI', description: 'Explore, clean and explain data with practical analytical methods.', topics: ['Data Cleaning', 'Statistics', 'SQL', 'Visualization', 'Pandas'], teacherCount: 171, learnerCount: 402 },
  { id: 'deep-learning', name: 'Deep Learning', category: 'Data & AI', description: 'Neural networks, training workflows and modern deep learning foundations.', topics: ['Neural Networks', 'Backpropagation', 'CNNs', 'Transformers', 'PyTorch'], teacherCount: 87, learnerCount: 215 },
  { id: 'react', name: 'React', category: 'Web Development', description: 'Build interactive interfaces with components, state and modern React patterns.', topics: ['Components', 'Hooks', 'State', 'Routing', 'Server Components'], teacherCount: 142, learnerCount: 389 },
  { id: 'express', name: 'Express', category: 'Web Development', description: 'Create web APIs and server applications with Express and Node.js.', topics: ['Routing', 'Middleware', 'REST APIs', 'Validation', 'Error Handling'], teacherCount: 95, learnerCount: 213 },
  { id: 'html-css', name: 'HTML/CSS', category: 'Web Development', description: 'Structure accessible pages and style responsive web experiences.', topics: ['Semantic HTML', 'Flexbox', 'Grid', 'Responsive Design', 'Accessibility'], teacherCount: 110, learnerCount: 198 },
  { id: 'cloud-computing', name: 'Cloud Computing', category: 'Cloud & DevOps', description: 'Understand cloud infrastructure, deployment and scalable services.', topics: ['Compute', 'Storage', 'Networking', 'Containers', 'Serverless'], teacherCount: 120, learnerCount: 250 },
  { id: 'devops', name: 'DevOps', category: 'Cloud & DevOps', description: 'Automate delivery and operate reliable software systems.', topics: ['CI/CD', 'Containers', 'Infrastructure as Code', 'Monitoring', 'GitOps'], teacherCount: 76, learnerCount: 182 },
  { id: 'cybersecurity', name: 'Cybersecurity', category: 'Systems & Security', description: 'Learn defensive security, threat modeling and secure engineering basics.', topics: ['Threat Modeling', 'Network Security', 'Cryptography', 'Web Security', 'Incident Response'], teacherCount: 101, learnerCount: 230 },
  { id: 'embedded-systems', name: 'Embedded Systems', category: 'Systems & Security', description: 'Connect software and hardware with resource-aware embedded programming.', topics: ['Microcontrollers', 'C/C++', 'RTOS', 'Sensors', 'Device Drivers'], teacherCount: 64, learnerCount: 122 },
  { id: 'ar-vr', name: 'AR/VR', category: 'Emerging Tech', description: 'Design immersive augmented and virtual reality experiences.', topics: ['Spatial Design', '3D Interaction', 'Unity', 'Tracking', 'Prototyping'], teacherCount: 41, learnerCount: 96 },
  { id: 'iot', name: 'IoT', category: 'Emerging Tech', description: 'Build connected devices and understand sensors, networks and edge systems.', topics: ['Sensors', 'Protocols', 'Edge Computing', 'Device Security', 'Telemetry'], teacherCount: 62, learnerCount: 140 },
]

export function getSkill(id: SkillId): Skill {
  const skill = SKILLS.find((skill) => skill.id === id)
  if (!skill) throw new Error(`Unknown skill: ${id}`)
  return skill
}
