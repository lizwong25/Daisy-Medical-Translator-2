"use client"

interface DaisyButtonProps {
  isRecording: boolean
  onClick: () => void
}

export function DaisyButton({ isRecording, onClick }: DaisyButtonProps) {
  const handleClick = () => {
    console.log("DaisyButton clicked, isRecording:", isRecording)
    onClick()
  }

  return (
    <button
      onClick={handleClick}
      className="relative focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
      aria-label={isRecording ? "Stop recording" : "Start recording"}
      aria-pressed={isRecording}
    >
      <img
        src={isRecording ? "/stop-button-daisy.svg" : "/start-button-daisy.svg"}
        alt={isRecording ? "Stop recording" : "Start recording"}
        className="w-24 h-24 sm:w-32 sm:h-32"
      />

      {/* Recording indicator */}
      {isRecording && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-pulse">
          <div className="absolute inset-1 bg-red-400 rounded-full animate-ping"></div>
        </div>
      )}
    </button>
  )
}
