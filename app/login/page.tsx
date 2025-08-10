"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    primaryLanguage: "",
  })
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  })

  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Sign up data:", signUpData)
    setIsLoading(false)
    // Redirect to homepage after successful signup
    router.push("/")
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Sign in data:", signInData)
    setIsLoading(false)
    // Redirect to homepage after successful signin
    router.push("/")
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#e2eff4" }}>
      {/* Header with Logo */}
      <header className="w-full py-1 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/" className="inline-block">
            <img src="/logo-daisy.svg" alt="Daisy Logo" className="h-64 sm:h-72 lg:h-80 w-auto" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 -mt-4">
        <div className="w-full max-w-md">
          <Card className="bg-white/90 backdrop-blur-sm border-slate-200">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-slate-800">Welcome to Daisy</CardTitle>
              <CardDescription className="text-slate-600">Medical translation made simple</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="signin" className="space-y-4">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email">Email</Label>
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="Enter your email"
                        value={signInData.email}
                        onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                        required
                        className="bg-white border-slate-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signin-password">Password</Label>
                      <Input
                        id="signin-password"
                        type="password"
                        placeholder="Enter your password"
                        value={signInData.password}
                        onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                        required
                        className="bg-white border-slate-300"
                      />
                    </div>
                    <Button type="submit" className="w-full hover:bg-emerald-700 bg-blue-500" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup" className="space-y-4">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Name</Label>
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Enter your full name"
                        value={signUpData.name}
                        onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                        required
                        className="bg-white border-slate-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={signUpData.email}
                        onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                        required
                        className="bg-white border-slate-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Create a password"
                        value={signUpData.password}
                        onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                        required
                        className="bg-white border-slate-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="primary-language">Primary Language</Label>
                      <Select
                        value={signUpData.primaryLanguage}
                        onValueChange={(value) => setSignUpData({ ...signUpData, primaryLanguage: value })}
                        required
                      >
                        <SelectTrigger className="bg-white border-slate-300">
                          <SelectValue placeholder="Select your primary language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">🇺🇸 English</SelectItem>
                          <SelectItem value="es">🇪🇸 Spanish</SelectItem>
                          <SelectItem value="zh">🇨🇳 Mandarin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button type="submit" className="w-full hover:bg-emerald-700 bg-blue-500" disabled={isLoading}>
                      {isLoading ? "Creating account..." : "Sign Up"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs sm:text-sm text-slate-500">
            Designed for healthcare professionals • Secure & HIPAA compliant
          </p>
        </div>
      </footer>
    </div>
  )
}
