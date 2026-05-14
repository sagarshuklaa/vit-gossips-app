import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { title, body } = await req.json()

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 100,
      messages: [
        {
          role: 'user',
          content: `You are a content tagger for a college gossip app called VIT Gossips.
Given a post title and body, return ONLY one tag from this list: gossip, placement, food, meme, exam, hostel, general.
Pick the most relevant one.

Title: ${title}
Body: ${body || ''}

Reply with just the single tag word, nothing else.`,
        },
      ],
    }),
  })

  const data = await response.json()
  const tag = data.content?.[0]?.text?.trim().toLowerCase() || 'general'

  return NextResponse.json({ tag })
}