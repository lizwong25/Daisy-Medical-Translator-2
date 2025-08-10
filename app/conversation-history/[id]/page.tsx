"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Menu,
  MessageSquare,
  History,
  Settings,
  Calendar,
  Clock,
  User,
  Stethoscope,
  Download,
  Share2,
} from "lucide-react"
import { useRouter, useParams } from "next/navigation"

// Sample detailed conversation data
const getConversationDetails = (id: string) => {
  const conversations: { [key: string]: any } = {
    "conv-001": {
      id: "conv-001",
      date: "2024-01-15",
      time: "14:30",
      patientName: "Maria Rodriguez",
      languages: { from: "Spanish", to: "English" },
      duration: "12 min",
      summary: "Abdominal pain consultation - gastritis evaluation",
      status: "completed",
      provider: "Dr. Sarah Smith",
      afterVisitNote: {
        instructions: [
          "Schedule and complete CT abdomen with contrast within 1 week.",
          "Omeprazole 20 mg – 1 tablet by mouth daily before breakfast.",
          "Acetaminophen 500 mg – 1–2 tablets by mouth every 6 hours as needed for pain (max 3,000 mg/day).",
          "Follow up in 2 weeks after CT results.",
          "Go to ER if severe abdominal pain, vomiting blood, or high fever develops.",
        ],
        medications: [
          "Omeprazole 20 mg – 1 tablet by mouth daily before breakfast.",
          "Acetaminophen 500 mg – 1–2 tablets by mouth every 6 hours as needed (max 3,000 mg/day).",
          "Lisinopril 10 mg – 1 tablet by mouth daily (continue current medication).",
        ],
        patientSummary:
          "45-year-old patient presented with abdominal pain that began yesterday evening. Pain is described as dull and constant, located in the upper abdomen, with associated nausea but no vomiting. Patient reports similar episodes 2-3 times over the past month. No fever, changes in bowel movements, or urinary symptoms. Currently taking Lisinopril for hypertension. No known allergies to medications.",
        recommendations: [
          "Eat smaller, more frequent meals.",
          "Avoid spicy, fatty, or acidic foods.",
          "Stay hydrated with clear fluids.",
          "Keep a food diary to identify triggers.",
          "Elevate head of bed when sleeping.",
          "Consider stress reduction techniques.",
        ],
        standingOrder: "Abdominal pain, rule out gastritis | Dr. Sarah Smith | January 15, 2024",
      },
    },
    // Add more conversation details as needed
  }

  return conversations[id] || null
}

export default function ConversationDetailPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const router = useRouter()
  const params = useParams()
  const conversationId = params.id as string

  const conversation = getConversationDetails(conversationId)

  const handleNewConversation = () => {
    setIsMenuOpen(false)
    router.push("/")
  }

  const handleConversationHistory = () => {
    setIsMenuOpen(false)
    router.push("/conversation-history")
  }

  const handleSettings = () => {
    setIsMenuOpen(false)
    router.push("/settings")
  }

  const handleExport = async () => {
    setIsExporting(true)
    // Simulate export process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsExporting(false)
  }

  const handleShare = () => {
    console.log("Sharing conversation...")
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getLanguageFlag = (language: string) => {
    const flags: { [key: string]: string } = {
      English: "🇺🇸",
      Spanish: "🇪🇸",
      Mandarin: "🇨🇳",
      Arabic: "🇸🇦",
    }
    return flags[language] || "🌐"
  }

  if (!conversation) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#e2eff4" }}>
        <Card className="bg-white/90 backdrop-blur-sm border-slate-200 max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold text-slate-800 mb-2">Conversation Not Found</h2>
            <p className="text-slate-600 mb-4">The requested conversation could not be found.</p>
            <Link href="/conversation-history">
              <Button variant="outline">Back to History</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#e2eff4" }}>
      {/* Header */}
      <header className="w-full py-4 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
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
                        <h3 className="font-semibold text-slate-800 group-hover:text-slate-900">
                          Conversation History
                        </h3>
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
                        <p className="text-sm text-slate-500 group-hover:text-slate-600">
                          Preferences and configuration
                        </p>
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

              {/* Back Button */}
            </div>

            <img src="/logo-daisy.svg" alt="Daisy Logo" className="h-16 w-auto" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Conversation Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">{conversation.patientName}</h1>
                <p className="text-slate-600 mb-4">{conversation.summary}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(conversation.date)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>
                      {conversation.time} • {conversation.duration}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{conversation.provider}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Button
                  onClick={handleShare}
                  variant="outline"
                  size="sm"
                  className="bg-white/80 backdrop-blur-sm border-slate-300 hover:bg-white/90"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button
                  onClick={handleExport}
                  variant="outline"
                  size="sm"
                  disabled={isExporting}
                  className="bg-white/80 backdrop-blur-sm border-slate-300 hover:bg-white/90"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {isExporting ? "Exporting..." : "Export"}
                </Button>
              </div>
            </div>

            {/* Translation Info */}
            <Card className="bg-white/90 backdrop-blur-sm border-slate-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-slate-500">Translation:</span>
                      <div className="flex items-center space-x-1">
                        <span>{getLanguageFlag(conversation.languages.from)}</span>
                        <span className="text-slate-700 font-medium">{conversation.languages.from}</span>
                        <span className="text-slate-400">→</span>
                        <span>{getLanguageFlag(conversation.languages.to)}</span>
                        <span className="text-slate-700 font-medium">{conversation.languages.to}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                    {conversation.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* After Visit Note Section */}
          <Card className="bg-white/90 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Stethoscope className="h-5 w-5 text-red-500" />
                <span>After Visit Note</span>
              </CardTitle>
              <CardDescription>Medical summary and care instructions from this visit</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Instructions */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Instructions</h3>
                <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                  {conversation.afterVisitNote.instructions.map((instruction: string, index: number) => (
                    <p key={index} className="text-slate-800">
                      • {instruction}
                    </p>
                  ))}
                </div>
              </div>

              {/* Medication List */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Medication List</h3>
                <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                  {conversation.afterVisitNote.medications.map((medication: string, index: number) => (
                    <p key={index} className="text-slate-800">
                      • {medication}
                    </p>
                  ))}
                </div>
              </div>

              {/* Patient Summary */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Patient Summary</h3>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-slate-800 leading-relaxed">{conversation.afterVisitNote.patientSummary}</p>
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Recommendations</h3>
                <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                  {conversation.afterVisitNote.recommendations.map((recommendation: string, index: number) => (
                    <p key={index} className="text-slate-800">
                      • {recommendation}
                    </p>
                  ))}
                </div>
              </div>

              {/* Standing Order */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Standing Order</h3>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-slate-800">{conversation.afterVisitNote.standingOrder}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs sm:text-sm text-slate-500">
            All data is encrypted and HIPAA compliant • Session automatically deleted after 30 days
          </p>
        </div>
      </footer>
    </div>
  )
}
