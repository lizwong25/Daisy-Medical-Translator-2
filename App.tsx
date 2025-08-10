"use client"

import { useState } from "react"
import { DaisyButton } from "./DaisyButton"
import { LanguageSelector } from "./LanguageSelector"
import { TranscriptionView } from "./components/TranscriptionView"
import { useAudioRecording } from "./hooks/useAudioRecording"
import { useSpeechRecognition } from "./hooks/useSpeechRecognition"

type View = "recording" | "transcription"

export default function App() {
  const [currentView, setCurrentView] = useState<View>("recording")
  const [inputLanguage, setInputLanguage] = useState("en")
  const [outputLanguage, setOutputLanguage] = useState("es")
  const [finalTranscript, setFinalTranscript] = useState("")
  const [error, setError] = useState<string | null>(null)

  const { isRecording, audioBlob, startRecording, stopRecording, error: recordingError } = useAudioRecording()

  const { transcript, isListening, startListening, stopListening, error: speechError } = useSpeechRecognition()

  const handleToggleTranslation = async () => {
    console.log("Toggle translation clicked, isRecording:", isRecording)

    if (isRecording) {
      // Stop recording
      console.log("Stopping recording...")
      stopRecording()
      stopListening()

      // Set final transcript and navigate to transcription view
      if (transcript) {
        setFinalTranscript(transcript)
        setCurrentView("transcription")
      }
    } else {
      // Start recording
      console.log("Starting recording...")
      setError(null)
      setFinalTranscript("")

      try {
        await startRecording()
        startListening()
      } catch (err) {
        console.error("Failed to start recording:", err)
        setError("Failed to start recording. Please check microphone permissions.")
      }
    }
  }

  const handleBackToRecording = () => {
    setCurrentView("recording")
    setFinalTranscript("")
    setError(null)
  }

  // Display any errors
  const currentError = error || recordingError || speechError

  if (currentView === "transcription") {
    return (
      <TranscriptionView
        transcript={finalTranscript}
        inputLanguage={inputLanguage}
        outputLanguage={outputLanguage}
        onBack={handleBackToRecording}
        onNewRecording={handleBackToRecording}
      />
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <img src="/logo-daisy.svg" alt="Daisy Logo" className="h-8 w-auto" />
        <div className="text-sm text-gray-600">Medical Translation</div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-8">
        {/* Language Selectors */}
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
          <LanguageSelector label="Speak in" value={inputLanguage} onChange={setInputLanguage} />
          <LanguageSelector label="Translate to" value={outputLanguage} onChange={setOutputLanguage} />
        </div>

        {/* Recording Button */}
        <div className="flex flex-col items-center space-y-4">
          <DaisyButton isRecording={isRecording} onClick={handleToggleTranslation} />

          {/* Status Text */}
          <div className="text-center">
            {isRecording ? (
              <div className="space-y-2">
                <p className="text-lg font-medium text-green-600">Recording... Speak now</p>
                {transcript && <p className="text-sm text-gray-600 max-w-md">"{transcript}"</p>}
              </div>
            ) : (
              <p className="text-lg text-gray-600">Tap to start recording</p>
            )}
          </div>
        </div>

        {/* Error Display */}
        {currentError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md w-full">
            <p className="text-red-700 text-sm">{currentError}</p>
          </div>
        )}
      </div>
    </div>
  )
}
