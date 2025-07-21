"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Brain, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { createBrowserClient } from "@/lib/supabase/client"
import { seedAdminUser } from "@/actions/seed-admin"
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "@/lib/constants" // Updated import

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [seedMessage, setSeedMessage] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createBrowserClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      setError(signInError.message)
    } else if (data.user) {
      // Check if the logged-in user is the admin (based on email or a custom role if implemented)
      // For this demo, we'll assume the specific admin email grants admin access.
      // In a real app, you'd check user roles from Supabase.
      if (data.user.email === ADMIN_EMAIL) {
        router.push("/admin/dashboard")
      } else {
        // If a non-admin user logs in via this page, sign them out
        await supabase.auth.signOut()
        setError("Access denied. Only admin users can log in here.")
      }
    } else {
      setError("Login failed. Please check your credentials.")
    }
    setIsLoading(false)
  }

  const handleSeedAdmin = async () => {
    setSeedMessage("Attempting to seed admin user...")
    const result = await seedAdminUser()
    setSeedMessage(result.message)
    if (result.success) {
      // Optionally, pre-fill login form with admin credentials after seeding
      setEmail(ADMIN_EMAIL)
      setPassword(ADMIN_PASSWORD)
    }
  }

  return (
    <div className="min-h-screen bg-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 mb-4 hover:opacity-75 transition-opacity touch-target"
            scroll={true}
          >
            <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600" />
            <span className="text-xl sm:text-2xl font-bold text-gray-900">MindEase Admin</span>
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Admin Login</h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Access the MindEase administrative dashboard
          </p>
        </div>

        <Card className="card-enhanced">
          <CardHeader className="card-mobile">
            <CardTitle className="text-lg sm:text-xl">Sign In as Admin</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Use credentials: `{ADMIN_EMAIL}` / `{ADMIN_PASSWORD}`
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
                  placeholder={ADMIN_EMAIL}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                    placeholder={ADMIN_PASSWORD}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                {isLoading ? "Logging In..." : "Login"}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <Button
                type="button"
                variant="outline"
                onClick={handleSeedAdmin}
                className="btn-enhanced btn-outline-enhanced btn-mobile bg-transparent"
                disabled={isLoading}
              >
                Seed Admin User (Dev Only)
              </Button>
              {seedMessage && <p className="text-sm mt-2">{seedMessage}</p>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
