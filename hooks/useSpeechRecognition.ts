"use client"

import { useState, useRef, useCallback, useEffect } from "react"

interface UseSpeechRecognitionReturn {
  transcript: string
  isListening: boolean
  startListening: () => void
  stopListening: () => void
  resetTranscript: () => void
  error: string | null
}

export function useSpeechRecognition(): UseSpeechRecognitionReturn {
  const [transcript, setTranscript] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const recognitionRef = useRef<any | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()

      const recognition = recognitionRef.current
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = "en-US"

      recognition.onresult = (event) => {
        let finalTranscript = ""
        let interimTranscript = ""

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          } else {
            interimTranscript += transcript
          }
        }

        setTranscript((prev) => prev + finalTranscript + interimTranscript)
        console.log("Speech recognition result:", finalTranscript || interimTranscript)
      }

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error)
        setError(`Speech recognition error: ${event.error}`)
        setIsListening(false)
      }

      recognition.onend = () => {
        console.log("Speech recognition ended")
        setIsListening(false)
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const startListening = useCallback(() => {
    if (recognitionRef.current) {
      setError(null)
      setIsListening(true)
      recognitionRef.current.start()
      console.log("Speech recognition started")
    } else {
      setError("Speech recognition not supported in this browser")
    }
  }, [])

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      console.log("Speech recognition stopped")
    }
  }, [])

  const resetTranscript = useCallback(() => {
    setTranscript("")
    setError(null)
  }, [])

  return {
    transcript,
    isListening,
    startListening,
    stopListening,
    resetTranscript,
    error,
  }
}
