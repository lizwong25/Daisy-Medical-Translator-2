"use client"

import { useState, useRef, useCallback } from "react"

interface UseAudioRecordingReturn {
  isRecording: boolean
  audioBlob: Blob | null
  startRecording: () => Promise<void>
  stopRecording: () => void
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
      console.log("Starting audio recording...")
      setError(null)
      setAudioBlob(null)
      chunksRef.current = []

      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        },
      })

      streamRef.current = stream
      console.log("Microphone access granted")

      // Create MediaRecorder
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      })

      mediaRecorderRef.current = mediaRecorder

      // Handle data available
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
          console.log("Audio chunk received:", event.data.size, "bytes")
        }
      }

      // Handle recording stop
      mediaRecorder.onstop = () => {
        console.log("MediaRecorder stopped")
        const blob = new Blob(chunksRef.current, { type: "audio/webm" })
        setAudioBlob(blob)
        console.log("Audio blob created:", blob.size, "bytes")
      }

      // Start recording
      mediaRecorder.start(100) // Collect data every 100ms
      setIsRecording(true)
      console.log("Recording started")
    } catch (err) {
      console.error("Failed to start recording:", err)
      setError("Failed to access microphone. Please check permissions.")
      setIsRecording(false)
    }
  }, [])

  const stopRecording = useCallback(() => {
    console.log("Stopping audio recording...")

    // Immediately set recording to false
    setIsRecording(false)

    // Stop MediaRecorder if it exists and is recording
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop()
      console.log("MediaRecorder stop called")
    }

    // Stop all tracks in the stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop()
        console.log("Audio track stopped")
      })
      streamRef.current = null
    }

    // Clear references
    mediaRecorderRef.current = null
  }, [])

  return {
    isRecording,
    audioBlob,
    startRecording,
    stopRecording,
    error,
  }
}
