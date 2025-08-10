import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { translatedText, targetLanguage } = await request.json()

    if (!translatedText) {
      return NextResponse.json(
        { error: 'Translated text is required' },
        { status: 400 }
      )
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    // Determine the language for the prompt
    let languagePrompt = ''
    let languageName = ''
    
    switch (targetLanguage) {
      case 'es':
        languagePrompt = 'in Spanish'
        languageName = 'Spanish'
        break
      case 'fr':
        languagePrompt = 'in French'
        languageName = 'French'
        break
      default:
        languagePrompt = 'in English'
        languageName = 'English'
    }

    const prompt = `Based on the following patient–doctor conversation, create an **After Visit Summary** with these exact sections and concise format in ${languageName}:

**After Visit Note**

**Instructions** – List only concrete, prescribed actions (tests, imaging, medications with dosage and frequency, follow-up appointments, and when to seek emergency care). Keep each action short and direct.

**Medication List** – List all current medications with name, dosage, and frequency. Include OTC if mentioned. If none, write "No prescriptions."

**Patient Summary** – One short paragraph with reason for visit, key symptoms, onset/duration, associated symptoms, and relevant history/medications.

**Recommendations** – Bullet points for optional/nice-to-do advice from the doctor (lifestyle, self-care, diet, etc.).

**Standing Order** – List any standing orders (e.g., "CT head without contrast"). If none, write "None."

Conversation: ${translatedText}

Format the response as a JSON object with these exact keys:
{
  "afterVisitNote": "After Visit Note",
  "instructions": ["instruction1", "instruction2"],
  "medicationList": ["medication1", "medication2"],
  "patientSummary": "patient summary paragraph",
  "recommendations": ["recommendation1", "recommendation2"],
  "standingOrder": "standing order or None"
}`

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a medical transcription assistant that creates professional after-visit summaries. Always respond with valid JSON format.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 1000,
    })

    const responseText = completion.choices[0]?.message?.content
    if (!responseText) {
      throw new Error('No response from OpenAI')
    }

    // Try to parse the JSON response
    let summaryData
    try {
      summaryData = JSON.parse(responseText)
    } catch (parseError) {
      console.error('Failed to parse OpenAI response as JSON:', responseText)
      throw new Error('Invalid response format from OpenAI')
    }

    return NextResponse.json(summaryData)
  } catch (error) {
    console.error('Error generating summary:', error)
    return NextResponse.json(
      { error: 'Failed to generate summary' },
      { status: 500 }
    )
  }
}
