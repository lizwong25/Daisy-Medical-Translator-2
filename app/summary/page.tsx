"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Stethoscope, Menu, MessageSquare, History, Settings } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SummaryPage() {
  const [isExporting, setIsExporting] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const handleExport = async () => {
    setIsExporting(true)
    // Simulate export process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsExporting(false)
  }

  const handleShare = () => {
    // Implement share functionality
    console.log("Sharing summary...")
  }

  const handleNewConversation = () => {
    setIsMenuOpen(false)
    // Navigate back to homepage for new conversation
    router.push("/")
  }

  const handleConversationHistory = () => {
    setIsMenuOpen(false)
    // Navigate to conversation history
    router.push("/conversation-history")
  }

  const handleSettings = () => {
    setIsMenuOpen(false)
    // Navigate to settings
    router.push("/settings")
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#e2eff4" }}>
      {/* Header */}
      <header className="w-full py-4 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
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
            </div>

            <img src="/logo-daisy.svg" alt="Daisy Logo" className="h-16 w-auto" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">After Visit Summary</h1>
            <p className="text-slate-600">Complete record of your medical translation session</p>
          </div>

          {/* After Visit Note Section */}
          <div>
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
                    <p className="text-slate-800">• Schedule and complete CT abdomen with contrast within 1 week.</p>
                    <p className="text-slate-800">• Omeprazole 20 mg – 1 tablet by mouth daily before breakfast.</p>
                    <p className="text-slate-800">
                      • Acetaminophen 500 mg – 1–2 tablets by mouth every 6 hours as needed for pain (max 3,000 mg/day).
                    </p>
                    <p className="text-slate-800">• Follow up in 2 weeks after CT results.</p>
                    <p className="text-slate-800">
                      • Go to ER if severe abdominal pain, vomiting blood, or high fever develops.
                    </p>
                  </div>
                </div>

                {/* Medication List */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Medication List</h3>
                  <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                    <p className="text-slate-800">• Omeprazole 20 mg – 1 tablet by mouth daily before breakfast.</p>
                    <p className="text-slate-800">
                      • Acetaminophen 500 mg – 1–2 tablets by mouth every 6 hours as needed (max 3,000 mg/day).
                    </p>
                    <p className="text-slate-800">
                      • Lisinopril 10 mg – 1 tablet by mouth daily (continue current medication).
                    </p>
                  </div>
                </div>

                {/* Patient Summary */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Patient Summary</h3>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-slate-800 leading-relaxed">
                      45-year-old patient presented with abdominal pain that began yesterday evening. Pain is described
                      as dull and constant, located in the upper abdomen, with associated nausea but no vomiting.
                      Patient reports similar episodes 2-3 times over the past month. No fever, changes in bowel
                      movements, or urinary symptoms. Currently taking Lisinopril for hypertension. No known allergies
                      to medications.
                    </p>
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Recommendations</h3>
                  <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                    <p className="text-slate-800">• Eat smaller, more frequent meals.</p>
                    <p className="text-slate-800">• Avoid spicy, fatty, or acidic foods.</p>
                    <p className="text-slate-800">• Stay hydrated with clear fluids.</p>
                    <p className="text-slate-800">• Keep a food diary to identify triggers.</p>
                    <p className="text-slate-800">• Elevate head of bed when sleeping.</p>
                    <p className="text-slate-800">• Consider stress reduction techniques.</p>
                  </div>
                </div>

                {/* Standing Order */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Standing Order</h3>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-slate-800">
                      Abdominal pain, rule out gastritis | Dr. Sarah Smith | {new Date().toLocaleDateString("en-US")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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
