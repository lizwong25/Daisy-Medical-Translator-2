import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Service configuration - can be easily switched to Seamless
const TRANSCRIPTION_SERVICE = process.env.TRANSCRIPTION_SERVICE || 'openai' // 'openai' | 'seamless'
const SUMMARY_SERVICE = process.env.SUMMARY_SERVICE || 'openai' // 'openai' | 'seamless' (for summaries)

interface TranscriptionService {
  transcribe: (audioBuffer: Buffer, audioFile: File, inputLanguage: string) => Promise<string>
  translate: (text: string, inputLanguage: string, outputLanguage: string) => Promise<string>
}

interface SummaryService {
  generateSummary: (translatedText: string, targetLanguage: string) => Promise<any>
}

// OpenAI Whisper implementation
class OpenAIWhisperService implements TranscriptionService {
  async transcribe(audioBuffer: Buffer, audioFile: File, inputLanguage: string): Promise<string> {
    const transcription = await openai.audio.transcriptions.create({
      file: new File([audioBuffer], audioFile.name, { type: audioFile.type }),
      model: 'whisper-1',
      language: inputLanguage === 'zh' ? 'zh' : inputLanguage,
      response_format: 'text',
    })
    return transcription
  }

  async translate(text: string, inputLanguage: string, outputLanguage: string): Promise<string> {
    if (inputLanguage === outputLanguage) {
      return text
    }

    const translationResponse = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a medical translation assistant. Translate the following text from ${inputLanguage} to ${outputLanguage}. Maintain medical terminology accuracy and preserve the meaning exactly.`
        },
        {
          role: 'user',
          content: text
        }
      ],
      temperature: 0.3,
      max_tokens: 1000,
    })

    return translationResponse.choices[0]?.message?.content || text
  }
}

// Seamless implementation (placeholder for future integration)
class SeamlessService implements TranscriptionService {
  async transcribe(audioBuffer: Buffer, audioFile: File, inputLanguage: string): Promise<string> {
    // TODO: Implement Seamless transcription
    // This will be replaced with actual Seamless API calls
    // Example: const model = await loadSeamlessModel()
    // const result = await model.transcribe(audioBuffer, { language: inputLanguage })
    // return result.text
    throw new Error('Seamless transcription not yet implemented')
  }

  async translate(text: string, inputLanguage: string, outputLanguage: string): Promise<string> {
    // TODO: Implement Seamless translation
    // This will be replaced with actual Seamless API calls
    // Example: const model = await loadSeamlessModel()
    // const result = await model.translate(text, { 
    //   sourceLanguage: inputLanguage, 
    //   targetLanguage: outputLanguage 
    // })
    // return result.text
    throw new Error('Seamless translation not yet implemented')
  }
}

// OpenAI Summary Service (for after-visit summaries)
class OpenAISummaryService implements SummaryService {
  async generateSummary(translatedText: string, targetLanguage: string): Promise<any> {
    // This will call the existing /api/generate-summary endpoint
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/generate-summary`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        translatedText,
        targetLanguage,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to generate summary')
    }

    return response.json()
  }
}

// Seamless Summary Service (placeholder for future integration)
class SeamlessSummaryService implements SummaryService {
  async generateSummary(translatedText: string, targetLanguage: string): Promise<any> {
    // TODO: Implement Seamless summary generation
    // This could use Seamless's text generation capabilities
    throw new Error('Seamless summary generation not yet implemented')
  }
}

// Service factory
function getTranscriptionService(): TranscriptionService {
  switch (TRANSCRIPTION_SERVICE) {
    case 'seamless':
      return new SeamlessService()
    case 'openai':
    default:
      return new OpenAIWhisperService()
  }
}

function getSummaryService(): SummaryService {
  switch (SUMMARY_SERVICE) {
    case 'seamless':
      return new SeamlessSummaryService()
    case 'openai':
    default:
      return new OpenAISummaryService()
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const audioFile = formData.get('audio') as File
    const inputLanguage = formData.get('inputLanguage') as string
    const outputLanguage = formData.get('outputLanguage') as string

    if (!audioFile) {
      return NextResponse.json(
        { error: 'Audio file is required' },
        { status: 400 }
      )
    }

    // Get the appropriate services
    const transcriptionService = getTranscriptionService()
    const summaryService = getSummaryService()

    // Convert audio file to buffer
    const audioBuffer = Buffer.from(await audioFile.arrayBuffer())

    // Transcribe audio
    const originalText = await transcriptionService.transcribe(audioBuffer, audioFile, inputLanguage)

    // Translate the transcribed text
    const translatedText = await transcriptionService.translate(originalText, inputLanguage, outputLanguage)

    // Generate summary (this will use OpenAI by default)
    let summary = null
    try {
      summary = await summaryService.generateSummary(translatedText, outputLanguage)
    } catch (error) {
      console.warn('Summary generation failed:', error)
      // Continue without summary if it fails
    }

    return NextResponse.json({
      originalText,
      translatedText,
      confidence: 0.95, // Will be updated when Seamless provides confidence scores
      transcriptionService: TRANSCRIPTION_SERVICE,
      summaryService: SUMMARY_SERVICE,
      summary: summary,
    })
  } catch (error) {
    console.error('Transcription error:', error)
    return NextResponse.json(
      { error: 'Failed to transcribe audio' },
      { status: 500 }
    )
  }
}
