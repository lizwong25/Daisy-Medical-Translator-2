"use client"

import { useState, useCallback } from "react"

interface TranscriptionResult {
  originalText: string
  translatedText: string
  inputLanguage: string
  outputLanguage: string
}

interface UseTranscriptionReturn {
  isTranscribing: boolean
  result: TranscriptionResult | null
  error: string | null
  transcribe: (audioBlob: Blob, inputLang: string, outputLang: string) => Promise<void>
  transcribeText: (text: string, inputLang: string, outputLang: string) => Promise<void>
}

export function useTranscription(): UseTranscriptionReturn {
  const [isTranscribing, setIsTranscribing] = useState(false)
  const [result, setResult] = useState<TranscriptionResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const transcribe = useCallback(async (audioBlob: Blob, inputLang: string, outputLang: string) => {
    setIsTranscribing(true)
    setError(null)

    try {
      console.log("Starting transcription...", { inputLang, outputLang, blobSize: audioBlob.size })

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock transcription result
      const mockResult: TranscriptionResult = {
        originalText: "Hello, I need help with my medical condition.",
        translatedText: "Hola, necesito ayuda con mi condición médica.",
        inputLanguage: inputLang,
        outputLanguage: outputLang,
      }

      setResult(mockResult)
      console.log("Transcription completed:", mockResult)
    } catch (err) {
      console.error("Transcription failed:", err)
      setError("Failed to transcribe audio. Please try again.")
    } finally {
      setIsTranscribing(false)
    }
  }, [])

  const transcribeText = useCallback(async (text: string, inputLang: string, outputLang: string) => {
    setIsTranscribing(true)
    setError(null)

    try {
      console.log("Starting text transcription...", { text, inputLang, outputLang })

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock translation result
      const mockResult: TranscriptionResult = {
        originalText: text,
        translatedText: `[Translated to ${outputLang}] ${text}`,
        inputLanguage: inputLang,
        outputLanguage: outputLang,
      }

      setResult(mockResult)
      console.log("Text transcription completed:", mockResult)
    } catch (err) {
      console.error("Text transcription failed:", err)
      setError("Failed to translate text. Please try again.")
    } finally {
      setIsTranscribing(false)
    }
  }, [])

  return {
    isTranscribing,
    result,
    error,
    transcribe,
    transcribeText,
  }
}
