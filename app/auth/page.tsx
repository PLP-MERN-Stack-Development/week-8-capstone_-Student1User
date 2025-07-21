"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Eye, EyeOff, Upload } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createBrowserClient } from "@/lib/supabase/client" // Corrected import

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null) // State for displaying errors
  const router = useRouter()
  const supabase = createBrowserClient() // Use the corrected client

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  })

  const [registerForm, setRegisterForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    religion: "",
    profilePicture: null as File | null,
  })

  const religions = [
    "Christianity",
    "Islam",
    "Judaism",
    "Hinduism",
    "Buddhism",
    "Sikhism",
    "Other",
    "Prefer not to say",
  ]

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null) // Clear previous errors

    const { error } = await supabase.auth.signInWithPassword({
      email: loginForm.email,
      password: loginForm.password,
    })

    if (error) {
      setError(error.message)
      setIsLoading(false)
    } else {
      router.push("/chat") // Redirect to chat on successful login
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (registerForm.password !== registerForm.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)
    setError(null) // Clear previous errors

    const { error } = await supabase.auth.signUp({
      email: registerForm.email,
      password: registerForm.password,
      options: {
        data: {
          full_name: registerForm.fullName,
          username: registerForm.username,
          gender: registerForm.gender,
          religion: registerForm.religion,
          // profile_picture: registerForm.profilePicture ? registerForm.profilePicture.name : null, // Handle file upload separately if needed
        },
      },
    })

    if (error) {
      setError(error.message)
      setIsLoading(false)
    } else {
      // Supabase automatically logs in the user after sign up
      router.push("/chat") // Redirect to chat on successful registration
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setRegisterForm((prev) => ({ ...prev, profilePicture: file }))
    }
  }

  return (
    <div className="min-h-screen bg-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 mb-4 hover:opacity-75 transition-opacity touch-target"
            scroll={true}
          >
            <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600" />
            <span className="text-xl sm:text-2xl font-bold text-gray-900">MindEase</span>
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Sign in to continue your mental wellness journey
          </p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login" className="text-sm sm:text-base">
              Sign In
            </TabsTrigger>
            <TabsTrigger value="register" className="text-sm sm:text-base">
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="card-enhanced">
              <CardHeader className="card-mobile">
                <CardTitle className="text-lg sm:text-xl">Sign In</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="card-mobile">
                <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm sm:text-base">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm((prev) => ({ ...prev, email: e.target.value }))}
                      required
                      className="input-enhanced text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                        required
                        className="input-enhanced text-base pr-12"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent btn-enhanced btn-ghost-enhanced touch-target"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                  <Button type="submit" className="btn-enhanced btn-primary-enhanced btn-mobile" disabled={isLoading}>
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>

                <div className="mt-4 text-center">
                  <Button
                    variant="link"
                    className="text-sm text-emerald-600 btn-enhanced btn-ghost-enhanced touch-target"
                  >
                    Forgot your password?
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card className="card-enhanced">
              <CardHeader className="card-mobile">
                <CardTitle className="text-lg sm:text-xl">Create Account</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Join MindEase to start your mental wellness journey
                </CardDescription>
              </CardHeader>
              <CardContent className="card-mobile">
                <form onSubmit={handleRegister} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-sm sm:text-base">
                        Full Name
                      </Label>
                      <Input
                        id="fullName"
                        placeholder="John Doe"
                        value={registerForm.fullName}
                        onChange={(e) => setRegisterForm((prev) => ({ ...prev, fullName: e.target.value }))}
                        required
                        className="input-enhanced text-base"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-sm sm:text-base">
                        Username
                      </Label>
                      <Input
                        id="username"
                        placeholder="johndoe"
                        value={registerForm.username}
                        onChange={(e) => setRegisterForm((prev) => ({ ...prev, username: e.target.value }))}
                        required
                        className="input-enhanced text-base"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm sm:text-base">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm((prev) => ({ ...prev, email: e.target.value }))}
                      required
                      className="input-enhanced text-base"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="gender" className="text-sm sm:text-base">
                        Gender
                      </Label>
                      <Select
                        value={registerForm.gender}
                        onValueChange={(value) => setRegisterForm((prev) => ({ ...prev, gender: value }))}
                      >
                        <SelectTrigger className="text-base">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="religion" className="text-sm sm:text-base">
                        Religion/Spirituality
                      </Label>
                      <Select
                        value={registerForm.religion}
                        onValueChange={(value) => setRegisterForm((prev) => ({ ...prev, religion: value }))}
                      >
                        <SelectTrigger className="text-base">
                          <SelectValue placeholder="Select religion" />
                        </SelectTrigger>
                        <SelectContent>
                          {religions.map((religion) => (
                            <SelectItem key={religion} value={religion.toLowerCase()}>
                              {religion}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="profilePicture" className="text-sm sm:text-base">
                      Profile Picture (Optional)
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="profilePicture"
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("profilePicture")?.click()}
                        className="btn-enhanced btn-outline-enhanced btn-mobile text-sm sm:text-base"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {registerForm.profilePicture ? registerForm.profilePicture.name : "Upload Photo"}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a strong password"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm((prev) => ({ ...prev, password: e.target.value }))}
                      required
                      className="input-enhanced text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={registerForm.confirmPassword}
                      onChange={(e) => setRegisterForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                      required
                      className="input-enhanced text-base"
                    />
                  </div>

                  {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                  <Button type="submit" className="btn-enhanced btn-primary-enhanced btn-mobile" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center text-xs sm:text-sm text-gray-600">
          <p className="leading-relaxed">
            By signing up, you agree to our{" "}
            <Link href="/terms" scroll={true}>
              <Button
                variant="link"
                className="p-0 h-auto text-emerald-600 hover:text-emerald-700 btn-enhanced btn-ghost-enhanced text-xs sm:text-sm touch-target"
              >
                Terms of Service
              </Button>
            </Link>{" "}
            and{" "}
            <Link href="/privacy" scroll={true}>
              <Button
                variant="link"
                className="p-0 h-auto text-emerald-600 hover:text-emerald-700 btn-enhanced btn-ghost-enhanced text-xs sm:text-sm touch-target"
              >
                Privacy Policy
              </Button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
