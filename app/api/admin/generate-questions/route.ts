import { generateText, Output } from 'ai'
import { z } from 'zod'

const questionSchema = z.object({
  questions: z.array(z.object({
    prompt: z.string(),
    options: z.array(z.string()).length(4),
    correctAnswer: z.number().int().min(0).max(3),
    explanation: z.string(),
    topic: z.string(),
  })).min(1).max(10),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const skill = typeof body.skill === 'string' ? body.skill.trim() : ''
    const level = typeof body.level === 'string' ? body.level.trim() : ''
    const count = Number.isInteger(body.count) ? Math.min(Math.max(body.count, 1), 10) : 5
    const context = typeof body.context === 'string' ? body.context.trim().slice(0, 1000) : ''

    if (!skill || !level) {
      return Response.json({ error: 'Skill and level are required.' }, { status: 400 })
    }

    const { output } = await generateText({
      model: 'anthropic/claude-sonnet-4.6',
      output: Output.object({ schema: questionSchema }),
      prompt: `You are an expert assessment designer for a peer learning platform. Generate ${count} original multiple-choice questions for ${skill} at ${level} level. Questions must test practical understanding, have exactly four plausible options, one unambiguous correct answer, a concise explanation, and a short topic label. Avoid trivia, ambiguous wording, and duplicate concepts. ${context ? `Additional admin guidance: ${context}` : ''}`,
    })

    return Response.json(output)
  } catch (error) {
    console.error('[v0] AI question generation failed', error)
    return Response.json({ error: 'Question generation is temporarily unavailable. Try again.' }, { status: 500 })
  }
}
