"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Copy, Download, RotateCcw, AlertCircle, Loader2 } from "lucide-react"
import { useTranscription } from "../hooks/useTranscription"

interface TranscriptionViewProps {
  audioBlob: Blob | null
  inputLanguage: string
  outputLanguage: string
  onStartNew: () => void
  onGoBack: () => void
}

export default function TranscriptionView({
  audioBlob,
  inputLanguage,
  outputLanguage,
  onStartNew,
  onGoBack,
}: TranscriptionViewProps) {
  const { transcriptionResult, isTranscribing, error, transcribeAudio } = useTranscription()

  useEffect(() => {
    if (audioBlob) {
      console.log("Starting transcription with audio blob:", audioBlob.size, "bytes")
      transcribeAudio(audioBlob, inputLanguage, outputLanguage)
    }
  }, [audioBlob, inputLanguage, outputLanguage, transcribeAudio])

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text)
    console.log("Text copied to clipboard")
  }

  const handleDownload = () => {
    if (transcriptionResult) {
      const content = `Original Text (${inputLanguage}):\n${transcriptionResult.originalText}\n\nTranslated Text (${outputLanguage}):\n${transcriptionResult.translatedText}`
      const blob = new Blob([content], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "transcription.txt"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      console.log("Transcription downloaded")
    }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#e2eff4" }}>
      {/* Header */}
      <header className="w-full py-4 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <Button
              onClick={onGoBack}
              variant="ghost"
              size="sm"
              className="text-slate-600 hover:text-slate-800 hover:bg-white/60"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            <div className="flex justify-center flex-1">
              <img src="/logo-daisy.svg" alt="Daisy Logo" className="h-16 w-auto" />
            </div>

            <div className="w-16"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">Voice Transcription</h1>
            <p className="text-slate-600">Your audio has been processed and transcribed</p>
          </div>

          {/* Error State */}
          {error && (
            <Alert className="mb-6 bg-red-50 border-red-200">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          {/* Loading State */}
          {isTranscribing && (
            <Card className="mb-6 bg-white/80 backdrop-blur-sm border-slate-200">
              <CardContent className="p-8">
                <div className="flex items-center justify-center space-x-3">
                  <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                  <span className="text-lg font-medium text-slate-700">Processing your audio...</span>
                </div>
                <p className="text-center text-slate-500 mt-2">This may take a few moments</p>
              </CardContent>
            </Card>
          )}

          {/* Transcription Results */}
          {transcriptionResult && !isTranscribing && (
            <div className="space-y-6">
              {/* Original Text */}
              <Card className="bg-white/80 backdrop-blur-sm border-slate-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold text-slate-800 flex items-center justify-between">
                    Original Text
                    <Button
                      onClick={() => handleCopyText(transcriptionResult.originalText)}
                      variant="ghost"
                      size="sm"
                      className="text-slate-500 hover:text-slate-700"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 leading-relaxed">{transcriptionResult.originalText}</p>
                  <div className="mt-3 text-sm text-slate-500">
                    Confidence: {Math.round(transcriptionResult.confidence * 100)}%
                  </div>
                </CardContent>
              </Card>

              {/* Translated Text */}
              <Card className="bg-white/80 backdrop-blur-sm border-slate-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold text-slate-800 flex items-center justify-between">
                    Translated Text
                    <Button
                      onClick={() => handleCopyText(transcriptionResult.translatedText)}
                      variant="ghost"
                      size="sm"
                      className="text-slate-500 hover:text-slate-700"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 leading-relaxed">{transcriptionResult.translatedText}</p>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="bg-white/80 backdrop-blur-sm border-slate-300 hover:bg-white/90"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Transcription
                </Button>

                <Button onClick={onStartNew} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Start New Recording
                </Button>
              </div>
            </div>
          )}

          {/* No Audio State */}
          {!audioBlob && !isTranscribing && (
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200">
              <CardContent className="p-8 text-center">
                <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-800 mb-2">No Audio Detected</h3>
                <p className="text-slate-600 mb-6">No audio recording was found to transcribe.</p>
                <Button onClick={onGoBack} variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go Back to Recording
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs sm:text-sm text-slate-500">
            Designed for healthcare professionals • Secure & HIPAA compliant
          </p>
        </div>
      </footer>
    </div>
  )
}
