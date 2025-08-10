"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Download, ArrowLeft, Mic } from "lucide-react"
import { useTranscription } from "../hooks/useTranscription"

interface TranscriptionViewProps {
  transcript: string
  inputLanguage: string
  outputLanguage: string
  onBack: () => void
  onNewRecording: () => void
}

export function TranscriptionView({
  transcript,
  inputLanguage,
  outputLanguage,
  onBack,
  onNewRecording,
}: TranscriptionViewProps) {
  const { isTranscribing, result, error, transcribeText } = useTranscription()

  // Start transcription when component mounts
  useEffect(() => {
    if (transcript && !result && !isTranscribing) {
      transcribeText(transcript, inputLanguage, outputLanguage)
    }
  }, [transcript, inputLanguage, outputLanguage, result, isTranscribing, transcribeText])

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // Could add a toast notification here
      console.log("Text copied to clipboard")
    } catch (err) {
      console.error("Failed to copy text:", err)
    }
  }

  const handleDownload = () => {
    if (!result) return

    const content = `Original Text (${result.inputLanguage}):\n${result.originalText}\n\nTranslated Text (${result.outputLanguage}):\n${result.translatedText}`
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "transcription.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <img src="/logo-daisy.svg" alt="Daisy Logo" className="h-8 w-auto" />
        <div className="text-sm text-gray-600">Voice Transcription</div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6">
        {/* Processing State */}
        {isTranscribing && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Processing your recording...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* No Speech Detected */}
        {!transcript && !isTranscribing && (
          <div className="text-center py-8">
            <p className="text-lg text-gray-600 mb-4">No speech detected</p>
            <Button onClick={onNewRecording} className="flex items-center gap-2">
              <Mic className="w-4 h-4" />
              Try Again
            </Button>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Original Text */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Original Text</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-800 mb-4">{result.originalText}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(result.originalText)}
                  className="flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </Button>
              </CardContent>
            </Card>

            {/* Translated Text */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Translated Text</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-800 mb-4">{result.translatedText}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(result.translatedText)}
                  className="flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </Button>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button onClick={handleDownload} className="flex items-center gap-2 flex-1">
                <Download className="w-4 h-4" />
                Download Transcription
              </Button>
              <Button
                variant="outline"
                onClick={onNewRecording}
                className="flex items-center gap-2 flex-1 bg-transparent"
              >
                <Mic className="w-4 h-4" />
                New Recording
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="p-4 border-t">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </div>
    </div>
  )
}
