"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import DaisyButton from "./DaisyButton"
import LanguageSelector from "./LanguageSelector"
import TranscriptionView from "./components/TranscriptionView"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Menu, MessageSquare, History, Settings, AlertCircle } from "lucide-react"
import { useAudioRecording } from "./hooks/useAudioRecording"

type AppView = "recording" | "transcription"

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>("recording")
  const [inputLanguage, setInputLanguage] = useState("en")
  const [outputLanguage, setOutputLanguage] = useState("es")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const {
    isRecording,
    audioBlob,
    startRecording,
    stopRecording,
    clearRecording,
    error: recordingError,
  } = useAudioRecording()

  const router = useRouter()

  const handleToggleTranslation = async () => {
    if (isRecording) {
      // User is stopping recording
      console.log("User clicked stop button, stopping recording...")
      stopRecording()

      // Switch to transcription view after a short delay to ensure recording is stopped
      setTimeout(() => {
        console.log("Switching to transcription view...")
        setCurrentView("transcription")
      }, 500)
    } else {
      // User is starting recording
      console.log("User clicked start button, starting recording...")
      clearRecording() // Clear any previous recording
      await startRecording()
    }
  }

  const handleStartNew = () => {
    clearRecording()
    setCurrentView("recording")
  }

  const handleGoBack = () => {
    setCurrentView("recording")
  }

  const handleNewConversation = () => {
    clearRecording()
    setCurrentView("recording")
    setInputLanguage("en")
    setOutputLanguage("es")
    setIsMenuOpen(false)
    console.log("Starting new conversation...")
  }

  const handleConversationHistory = () => {
    setIsMenuOpen(false)
    router.push("/conversation-history")
  }

  const handleSettings = () => {
    setIsMenuOpen(false)
    router.push("/settings")
  }

  // Show transcription view
  if (currentView === "transcription") {
    return (
      <TranscriptionView
        audioBlob={audioBlob}
        inputLanguage={inputLanguage}
        outputLanguage={outputLanguage}
        onStartNew={handleStartNew}
        onGoBack={handleGoBack}
      />
    )
  }

  // Show recording view (main app)
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#e2eff4" }}>
      {/* Header */}
      <header className="w-full py-1 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Hamburger Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-600 hover:text-slate-800 hover:bg-white/60 transition-all duration-200 rounded-lg"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 bg-white/95 backdrop-blur-md border-r border-slate-200">
                <SheetHeader className="text-left pb-6">
                  <SheetTitle className="text-xl font-semibold text-slate-800 flex items-center space-x-2">
                    <img src="/logo-daisy.svg" alt="Daisy" className="h-8 w-8" />
                    <span>Navigation</span>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col space-y-2">
                  {/* New Conversation */}
                  <button
                    onClick={handleNewConversation}
                    className="flex items-center space-x-4 p-4 rounded-xl hover:bg-slate-50 transition-all duration-200 text-left group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center group-hover:bg-emerald-200 transition-colors duration-200">
                      <MessageSquare className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800 group-hover:text-slate-900">New Conversation</h3>
                      <p className="text-sm text-slate-500 group-hover:text-slate-600">
                        Start a fresh translation session
                      </p>
                    </div>
                  </button>

                  {/* Conversation History */}
                  <button
                    onClick={handleConversationHistory}
                    className="flex items-center space-x-4 p-4 rounded-xl hover:bg-slate-50 transition-all duration-200 text-left group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                      <History className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800 group-hover:text-slate-900">Conversation History</h3>
                      <p className="text-sm text-slate-500 group-hover:text-slate-600">
                        View past translation sessions
                      </p>
                    </div>
                  </button>

                  {/* Settings */}
                  <button
                    onClick={handleSettings}
                    className="flex items-center space-x-4 p-4 rounded-xl hover:bg-slate-50 transition-all duration-200 text-left group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-200">
                      <Settings className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800 group-hover:text-slate-900">Settings</h3>
                      <p className="text-sm text-slate-500 group-hover:text-slate-600">Preferences and configuration</p>
                    </div>
                  </button>
                </div>

                {/* Footer in drawer */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500">Daisy Medical Translation</p>
                    <p className="text-xs text-slate-400 mt-1">HIPAA Compliant & Secure</p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <div className="flex justify-center flex-1">
              <img src="/logo-daisy.svg" alt="Daisy Logo" className="h-64 sm:h-72 lg:h-80 w-auto" />
            </div>

            {/* Spacer to balance the layout */}
            <div className="w-10"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-start justify-center px-4 sm:px-6 -mt-4">
        <div className="max-w-4xl w-full">
          {/* Error Alert */}
          {recordingError && (
            <div className="mb-6">
              <Alert className="bg-red-50 border-red-200">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">{recordingError}</AlertDescription>
              </Alert>
            </div>
          )}

          {/* Mobile Layout - Vertical Stack */}
          <div className="lg:hidden">
            {/* Language Selectors Row */}
            <div className="flex items-center justify-center space-x-8 sm:space-x-12 mb-4">
              <LanguageSelector label="Speak in" value={inputLanguage} onChange={setInputLanguage} />
              <LanguageSelector label="Translate to" value={outputLanguage} onChange={setOutputLanguage} />
            </div>

            {/* Central Daisy Button */}
            <div className="flex flex-col items-center space-y-4">
              <DaisyButton isActive={isRecording} onToggle={handleToggleTranslation} />

              {/* Status Text */}
              {isRecording && (
                <div className="flex items-center space-x-2 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Recording...</span>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Layout - Horizontal */}
          <div className="hidden lg:flex items-start justify-center space-x-16 xl:space-x-20">
            {/* Input Language */}
            <div className="flex flex-col items-center">
              <LanguageSelector label="Speak in" value={inputLanguage} onChange={setInputLanguage} />
            </div>

            {/* Central Daisy Button */}
            <div className="flex flex-col items-center space-y-4">
              <DaisyButton isActive={isRecording} onToggle={handleToggleTranslation} />

              {/* Status Text */}
              {isRecording && (
                <div className="flex items-center space-x-2 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Recording...</span>
                </div>
              )}
            </div>

            {/* Output Language */}
            <div className="flex flex-col items-center">
              <LanguageSelector label="Translate to" value={outputLanguage} onChange={setOutputLanguage} />
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 sm:mt-12 text-center max-w-sm sm:max-w-md mx-auto px-4">
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {isRecording
                ? "Speak clearly into your microphone. Press stop when finished to get your transcription."
                : "Press the daisy button to start recording your voice for transcription."}
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 sm:py-6 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs sm:text-sm text-slate-500">
            Designed for healthcare professionals • Secure & HIPAA compliant
          </p>
        </div>
      </footer>
    </div>
  )
}
