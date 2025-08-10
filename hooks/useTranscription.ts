"use client"

import { useState, useCallback } from "react"

interface TranscriptionResult {
  originalText: string
  translatedText: string
  confidence: number
}

interface UseTranscriptionReturn {
  transcriptionResult: TranscriptionResult | null
  isTranscribing: boolean
  error: string | null
  transcribeAudio: (audioBlob: Blob, inputLanguage: string, outputLanguage: string) => Promise<void>
  clearTranscription: () => void
}

export function useTranscription(): UseTranscriptionReturn {
  const [transcriptionResult, setTranscriptionResult] = useState<TranscriptionResult | null>(null)
  const [isTranscribing, setIsTranscribing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const transcribeAudio = useCallback(async (audioBlob: Blob, inputLanguage: string, outputLanguage: string) => {
    setIsTranscribing(true)
    setError(null)

    try {
      console.log("Starting transcription process...")
      console.log("Audio blob size:", audioBlob.size, "bytes")
      console.log("Input language:", inputLanguage, "Output language:", outputLanguage)

      // Simulate transcription process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock transcription result
      const mockResult: TranscriptionResult = {
        originalText: "Hello, how are you feeling today? Can you describe your symptoms?",
        translatedText:
          inputLanguage === "en" && outputLanguage === "es"
            ? "Hola, ¿cómo te sientes hoy? ¿Puedes describir tus síntomas?"
            : "Translated text would appear here based on the selected languages.",
        confidence: 0.95,
      }

      setTranscriptionResult(mockResult)
      console.log("Transcription completed:", mockResult)
    } catch (err) {
      console.error("Transcription error:", err)
      setError("Failed to transcribe audio. Please try again.")
    } finally {
      setIsTranscribing(false)
    }
  }, [])

  const clearTranscription = useCallback(() => {
    setTranscriptionResult(null)
    setError(null)
  }, [])

  return {
    transcriptionResult,
    isTranscribing,
    error,
    transcribeAudio,
    clearTranscription,
  }
}
