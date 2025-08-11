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
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">指导</h3>
                  <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                    <p className="text-slate-800">• 在 1 周内预约并完成腹部 CT（增强扫描）。</p>
                    <p className="text-slate-800">• 奥美拉唑 20 毫克 – 每天早餐前口服 1 片。</p>
                    <p className="text-slate-800">
                      • 对乙酰氨基酚 500 毫克 – 每 6 小时口服 1–2 片，按需缓解疼痛（每日最大剂量 3,000 毫克）。
                    </p>
                    <p className="text-slate-800">• CT 检查结果出来后 2 周内复诊。</p>
                    <p className="text-slate-800">• 若出现剧烈腹痛、呕血或高热，请立即前往急诊。</p>
                  </div>
                </div>

                {/* Medication List */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">用药清单</h3>
                  <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                    <p className="text-slate-800">• 奥美拉唑 20 毫克 – 每天早餐前口服 1 片。</p>
                    <p className="text-slate-800">
                      • 对乙酰氨基酚 500 毫克 – 每 6 小时口服 1–2 片，按需使用（每日最大剂量 3,000 毫克）。
                    </p>
                    <p className="text-slate-800">• 赖诺普利 10 毫克 – 每天口服 1 片（继续原有用药）。</p>
                  </div>
                </div>

                {/* Patient Summary */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">病人摘要</h3>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-slate-800 leading-relaxed">
                      45 岁患者，昨晚开始出现腹痛。疼痛描述为持续性钝痛，位于上腹部，伴有恶心但无呕吐。
                      患者报告在过去一个月内曾出现过 2–3 次类似发作。无发热、排便改变或泌尿系统症状。
                      目前因高血压服用赖诺普利。无已知药物过敏史。
                    </p>
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">建议</h3>
                  <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                    <p className="text-slate-800">• 少量多餐。</p>
                    <p className="text-slate-800">• 避免辛辣、油腻或酸性食物。</p>
                    <p className="text-slate-800">• 保持充足清淡液体摄入。</p>
                    <p className="text-slate-800">• 保留饮食日记以寻找诱因。</p>
                    <p className="text-slate-800">• 睡觉时抬高床头。</p>
                    <p className="text-slate-800">• 适当进行减压放松活动。</p>
                  </div>
                </div>

                {/* Standing Order */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">医嘱</h3>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-slate-800">腹痛，排除胃炎 | Sarah Smith 医生 | 2025 年 8 月 10 日</p>
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
