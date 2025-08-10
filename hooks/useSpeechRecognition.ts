"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import SpeechRecognition from "speech-recognition"

interface UseSpeechRecognitionReturn {
  transcript: string
  isListening: boolean
  startListening: () => void
  stopListening: () => void
  error: string | null
}

export function useSpeechRecognition(): UseSpeechRecognitionReturn {
  const [transcript, setTranscript] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const recognitionRef = useRef<SpeechRecognition | null>(null)

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined" && SpeechRecognition) {
      const recognition = new SpeechRecognition()

      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = "en-US"

      recognition.onstart = () => {
        console.log("Speech recognition started")
        setIsListening(true)
        setError(null)
      }

      recognition.onresult = (event) => {
        let finalTranscript = ""
        let interimTranscript = ""

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i]
          if (result.isFinal) {
            finalTranscript += result[0].transcript
          } else {
            interimTranscript += result[0].transcript
          }
        }

        setTranscript(finalTranscript + interimTranscript)
        console.log("Speech recognition result:", finalTranscript + interimTranscript)
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

      recognitionRef.current = recognition
    } else {
      setError("Speech recognition not supported in this browser")
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      console.log("Starting speech recognition...")
      setTranscript("")
      setError(null)
      recognitionRef.current.start()
    }
  }, [isListening])

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      console.log("Stopping speech recognition...")
      recognitionRef.current.stop()
    }
  }, [isListening])

  return {
    transcript,
    isListening,
    startListening,
    stopListening,
    error,
  }
}
