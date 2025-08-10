"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Menu, MessageSquare, History, Settings, User, Mail, Globe, Trash2, Save, AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showDeleteMessage, setShowDeleteMessage] = useState(false)
  const [formData, setFormData] = useState({
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@hospital.com",
    primaryLanguage: "en",
  })

  const router = useRouter()

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
    // Already on settings page
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSaving(false)
    console.log("Settings saved:", formData)
  }

  const handleDeleteAccount = () => {
    setShowDeleteMessage(true)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
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
                      className="flex items-center space-x-4 p-4 rounded-xl bg-purple-50 border border-purple-200 text-left group"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-purple-200 rounded-xl flex items-center justify-center">
                        <Settings className="h-6 w-6 text-purple-700" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-purple-900">Settings</h3>
                        <p className="text-sm text-purple-700">Preferences and configuration</p>
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
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">Account Settings</h1>
            <p className="text-slate-600">Manage your profile and preferences</p>
          </div>

          {/* Settings Form */}
          <Card className="bg-white/90 backdrop-blur-sm border-slate-200 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-slate-600" />
                <span>Profile Information</span>
              </CardTitle>
              <CardDescription>Update your personal information and language preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-slate-500" />
                  <span>Full Name</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  className="bg-white border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/20"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-slate-500" />
                  <span>Email Address</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email address"
                  className="bg-white border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/20"
                />
              </div>

              {/* Primary Language Field */}
              <div className="space-y-2">
                <Label htmlFor="primary-language" className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-slate-500" />
                  <span>Primary Language</span>
                </Label>
                <Select
                  value={formData.primaryLanguage}
                  onValueChange={(value) => handleInputChange("primaryLanguage", value)}
                >
                  <SelectTrigger className="bg-white border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/20">
                    <SelectValue placeholder="Select your primary language" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="en">🇺🇸 English</SelectItem>
                    <SelectItem value="es">🇪🇸 Spanish</SelectItem>
                    <SelectItem value="zh">🇨🇳 Mandarin</SelectItem>
                    <SelectItem value="fr">🇫🇷 French</SelectItem>
                    <SelectItem value="de">🇩🇪 German</SelectItem>
                    <SelectItem value="ar">🇸🇦 Arabic</SelectItem>
                    <SelectItem value="pt">🇵🇹 Portuguese</SelectItem>
                    <SelectItem value="ru">🇷🇺 Russian</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Save Button */}
              <div className="pt-4">
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Saving Changes..." : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="bg-white/90 backdrop-blur-sm border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-700">
                <AlertTriangle className="h-5 w-5" />
                <span>Account Deletion</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Separator className="bg-red-200" />

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-red-800 mb-1">Account Deletion</h4>
                    <p className="text-sm text-red-700 mb-3">
                      This action cannot be undone. All your conversation history, settings, and personal data will be
                      permanently deleted.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleDeleteAccount}
                variant="destructive"
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Account
              </Button>

              {/* Delete Account Message */}
              {showDeleteMessage && (
                <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800 mb-2">Account Deletion Request</h4>
                      <p className="text-sm text-slate-700 mb-3">To delete your account, please email us at:</p>
                      <div className="bg-white border border-slate-300 rounded-md p-3">
                        <code className="text-sm font-mono text-emerald-700 break-all">ew62710@gmail.com</code>
                      </div>
                      <p className="text-xs text-slate-500 mt-2">
                        Please include your account email address in the deletion request.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs sm:text-sm text-slate-500">
            All data is encrypted and HIPAA compliant • Changes are saved securely
          </p>
        </div>
      </footer>
    </div>
  )
}
