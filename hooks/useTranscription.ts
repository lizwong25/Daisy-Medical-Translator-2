"use client"

import { useState, useCallback } from "react"
import { useSummary } from "./useSummary"

interface TranscriptionResult {
  originalText: string
  translatedText: string
  confidence: number
  transcriptionService: string
  summaryService: string
  summary?: any
}

interface UseTranscriptionReturn {
  transcriptionResult: TranscriptionResult | null
  isTranscribing: boolean
  error: string | null
  transcribeAudio: (audioBlob: Blob, inputLanguage: string, outputLanguage: string) => Promise<void>
  clearTranscription: () => void
  generateSummary: (translatedText: string, targetLanguage: string) => Promise<void>
}

export function useTranscription(): UseTranscriptionReturn {
  const [transcriptionResult, setTranscriptionResult] = useState<TranscriptionResult | null>(null)
  const [isTranscribing, setIsTranscribing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { generateSummary: generateSummaryFromHook } = useSummary()

  const transcribeAudio = useCallback(async (audioBlob: Blob, inputLanguage: string, outputLanguage: string) => {
    setIsTranscribing(true)
    setError(null)

    try {
      console.log("Starting transcription process...")
      console.log("Audio blob size:", audioBlob.size, "bytes")
      console.log("Input language:", inputLanguage, "Output language:", outputLanguage)

      // Create form data for the API request
      const formData = new FormData()
      formData.append('audio', audioBlob, 'recording.webm')
      formData.append('inputLanguage', inputLanguage)
      formData.append('outputLanguage', outputLanguage)

      // Call the transcription API
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to transcribe audio')
      }

      const transcriptionData = await response.json()
      setTranscriptionResult(transcriptionData)
      console.log("Transcription completed:", transcriptionData)
    } catch (err) {
      console.error("Transcription error:", err)
      setError(err instanceof Error ? err.message : "Failed to transcribe audio. Please try again.")
    } finally {
      setIsTranscribing(false)
    }
  }, [])

  const clearTranscription = useCallback(() => {
    setTranscriptionResult(null)
    setError(null)
  }, [])

  const generateSummary = useCallback(async (translatedText: string, targetLanguage: string) => {
    await generateSummaryFromHook(translatedText, targetLanguage)
  }, [generateSummaryFromHook])

  return {
    transcriptionResult,
    isTranscribing,
    error,
    transcribeAudio,
    clearTranscription,
    generateSummary,
  }
}
