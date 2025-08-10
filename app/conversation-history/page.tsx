"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, MessageSquare, History, Settings, Calendar, User, Eye } from "lucide-react"
import { useRouter } from "next/navigation"

// Sample conversation data from patient's perspective
const patientConversationHistory = [
  {
    id: "conv-001",
    date: "2024-01-15",
    time: "14:30",
    doctorName: "Dr. Sarah Smith",
    specialty: "Internal Medicine",
    reasonForVisit: "Abdominal pain and nausea",
    languages: { from: "Spanish", to: "English" },
    duration: "12 min",
    status: "completed",
    summary: "Discussed ongoing abdominal pain, prescribed medication, and scheduled follow-up CT scan.",
  },
  {
    id: "conv-002",
    date: "2024-01-14",
    time: "09:15",
    doctorName: "Dr. Michael Johnson",
    specialty: "Cardiology",
    reasonForVisit: "Hypertension follow-up",
    languages: { from: "Spanish", to: "English" },
    duration: "8 min",
    status: "completed",
    summary: "Routine blood pressure check, medication adjustment, and lifestyle recommendations.",
  },
  {
    id: "conv-003",
    date: "2024-01-12",
    time: "16:45",
    doctorName: "Dr. Emily Chen",
    specialty: "Endocrinology",
    reasonForVisit: "Diabetes management consultation",
    languages: { from: "Spanish", to: "English" },
    duration: "15 min",
    status: "completed",
    summary: "Reviewed blood sugar levels, adjusted insulin dosage, and discussed dietary changes.",
  },
  {
    id: "conv-004",
    date: "2024-01-10",
    time: "11:20",
    doctorName: "Dr. Lisa Park",
    specialty: "Family Medicine",
    reasonForVisit: "Annual physical examination",
    languages: { from: "Spanish", to: "English" },
    duration: "25 min",
    status: "completed",
    summary: "Complete physical exam, updated vaccinations, and preventive care recommendations.",
  },
  {
    id: "conv-005",
    date: "2024-01-08",
    time: "13:00",
    doctorName: "Dr. Robert Martinez",
    specialty: "Orthopedics",
    reasonForVisit: "Knee pain evaluation",
    languages: { from: "Spanish", to: "English" },
    duration: "18 min",
    status: "completed",
    summary: "Examined knee injury, recommended physical therapy, and prescribed pain management.",
  },
  {
    id: "conv-006",
    date: "2024-01-05",
    time: "10:30",
    doctorName: "Dr. Amanda Wilson",
    specialty: "Dermatology",
    reasonForVisit: "Skin rash consultation",
    languages: { from: "Spanish", to: "English" },
    duration: "10 min",
    status: "completed",
    summary: "Diagnosed eczema, prescribed topical treatment, and provided skincare guidance.",
  },
]

export default function ConversationHistoryPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const handleNewConversation = () => {
    setIsMenuOpen(false)
    router.push("/")
  }

  const handleConversationHistory = () => {
    setIsMenuOpen(false)
    // Already on this page
  }

  const handleSettings = () => {
    setIsMenuOpen(false)
    router.push("/settings")
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
                      className="flex items-center space-x-4 p-4 rounded-xl bg-blue-50 border border-blue-200 text-left group"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-200 rounded-xl flex items-center justify-center">
                        <History className="h-6 w-6 text-blue-700" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-blue-900">Conversation History</h3>
                        <p className="text-sm text-blue-700">View past translation sessions</p>
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
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">My Conversation History</h1>
            <p className="text-slate-600">Your complete record of medical conversations and visit summaries</p>
          </div>

          {/* Conversation List */}
          <div className="space-y-4">
            {patientConversationHistory.map((conversation) => (
              <Card
                key={conversation.id}
                className="bg-white/90 backdrop-blur-sm border-slate-200 hover:bg-white/95 hover:shadow-md transition-all duration-200"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    {/* Left Section - Main Info */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-1">
                          Conversation with {conversation.doctorName}
                        </h3>
                        <p className="text-slate-600 text-sm mb-3 font-medium">{conversation.reasonForVisit}</p>
                        <div className="flex items-center space-x-4 text-sm text-slate-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(conversation.date)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{conversation.specialty}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Section - Action Button */}
                    <div className="flex items-center justify-end lg:justify-center">
                      <Link href={`/conversation-history/${conversation.id}`}>
                        <Button
                          variant="outline"
                          className="bg-white/80 backdrop-blur-sm border-slate-300 hover:bg-white/90 text-slate-700 hover:text-slate-800 flex items-center space-x-2"
                        >
                          <Eye className="h-4 w-4" />
                          <span>View Summary</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State (if no conversations) */}
          {patientConversationHistory.length === 0 && (
            <Card className="bg-white/90 backdrop-blur-sm border-slate-200">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <History className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">No conversations yet</h3>
                <p className="text-slate-600 mb-6">
                  Start your first medical translation session to see your conversation history here.
                </p>
                <Link href="/">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">Start New Conversation</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs sm:text-sm text-slate-500">
            All data is encrypted and HIPAA compliant • Sessions automatically deleted after 30 days
          </p>
        </div>
      </footer>
    </div>
  )
}
