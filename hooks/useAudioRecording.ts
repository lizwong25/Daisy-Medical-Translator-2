"use client"

import { useState, useRef, useCallback } from "react"

interface UseAudioRecordingReturn {
  isRecording: boolean
  audioBlob: Blob | null
  startRecording: () => Promise<void>
  stopRecording: () => void
  clearRecording: () => void
  error: string | null
}

export function useAudioRecording(): UseAudioRecordingReturn {
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [error, setError] = useState<string | null>(null)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const chunksRef = useRef<Blob[]>([])

  const startRecording = useCallback(async () => {
    try {
      setError(null)
      console.log("Requesting microphone access...")

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        },
      })

      streamRef.current = stream
      chunksRef.current = []

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      })

      mediaRecorderRef.current = mediaRecorder

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
          console.log("Audio chunk received:", event.data.size, "bytes")
        }
      }

      mediaRecorder.onstop = () => {
        console.log("MediaRecorder stopped, creating blob...")
        const blob = new Blob(chunksRef.current, { type: "audio/webm;codecs=opus" })
        setAudioBlob(blob)
        console.log("Audio blob created:", blob.size, "bytes")

        // Clean up stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => {
            track.stop()
            console.log("Audio track stopped")
          })
          streamRef.current = null
        }
      }

      mediaRecorder.onerror = (event) => {
        console.error("MediaRecorder error:", event)
        setError("Recording failed. Please try again.")
        setIsRecording(false)
      }

      mediaRecorder.start(100) // Collect data every 100ms
      setIsRecording(true)
      console.log("Recording started")
    } catch (err) {
      console.error("Error starting recording:", err)
      setError("Could not access microphone. Please check permissions.")
      setIsRecording(false)
    }
  }, [])

  const stopRecording = useCallback(() => {
    console.log("Stopping recording...")
    setIsRecording(false)

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop()
      console.log("MediaRecorder stop called")
    }

    // Clean up immediately
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop()
        console.log("Audio track stopped immediately")
      })
      streamRef.current = null
    }
  }, [])

  const clearRecording = useCallback(() => {
    console.log("Clearing recording...")
    setAudioBlob(null)
    setError(null)
    chunksRef.current = []

    // Stop any ongoing recording
    if (isRecording) {
      stopRecording()
    }
  }, [isRecording, stopRecording])

  return {
    isRecording,
    audioBlob,
    startRecording,
    stopRecording,
    clearRecording,
    error,
  }
}
