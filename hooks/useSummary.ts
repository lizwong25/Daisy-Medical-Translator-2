"use client"

import { useState, useCallback } from "react"

interface SummaryResult {
  afterVisitNote: string
  instructions: string[]
  medicationList: string[]
  patientSummary: string
  recommendations: string[]
  standingOrder: string
}

interface UseSummaryReturn {
  summaryResult: SummaryResult | null
  isGeneratingSummary: boolean
  error: string | null
  generateSummary: (translatedText: string, targetLanguage: string) => Promise<void>
  clearSummary: () => void
}

export function useSummary(): UseSummaryReturn {
  const [summaryResult, setSummaryResult] = useState<SummaryResult | null>(null)
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateSummary = useCallback(async (translatedText: string, targetLanguage: string) => {
    setIsGeneratingSummary(true)
    setError(null)

    try {
      console.log("Generating after-visit summary...")
      console.log("Translated text:", translatedText)
      console.log("Target language:", targetLanguage)

      // Call the API to generate summary
      const response = await fetch('/api/generate-summary', {
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
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate summary')
      }

      const summaryData = await response.json()
      setSummaryResult(summaryData)
      console.log("Summary generated:", summaryData)
    } catch (err) {
      console.error("Summary generation error:", err)
      setError(err instanceof Error ? err.message : "Failed to generate summary. Please try again.")
    } finally {
      setIsGeneratingSummary(false)
    }
  }, [])

  const clearSummary = useCallback(() => {
    setSummaryResult(null)
    setError(null)
  }, [])

  return {
    summaryResult,
    isGeneratingSummary,
    error,
    generateSummary,
    clearSummary,
  }
}
