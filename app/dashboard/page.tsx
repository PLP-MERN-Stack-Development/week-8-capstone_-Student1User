"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  BookOpen,
  BarChart3,
  MessageCircle,
  Calendar,
  TrendingUp,
  Heart,
  Smile,
  User,
  Settings,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [moodData, setMoodData] = useState({
    today: 7,
    average: 6.5,
    streak: 5,
  })
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("mindease_user")
    if (!userData) {
      router.push("/auth")
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  const quickActions = [
    {
      title: "Chat with AI",
      description: "Get personalized support and guidance",
      icon: MessageCircle,
      href: "/chat",
      color: "bg-emerald-500",
      textColor: "text-emerald-600",
    },
    {
      title: "Log Mood",
      description: "Track how you're feeling today",
      icon: Heart,
      href: "/mood",
      color: "bg-green-500",
      textColor: "text-green-600",
    },
    {
      title: "Write Journal",
      description: "Express your thoughts and feelings",
      icon: BookOpen,
      href: "/journal",
      color: "bg-emerald-700",
      textColor: "text-emerald-700",
    },
    {
      title: "View Analytics",
      description: "See your progress and insights",
      icon: BarChart3,
      href: "/analytics",
      color: "bg-green-600",
      textColor: "text-green-700",
    },
  ]

  const recentActivities = [
    {
      type: "mood",
      title: "Mood logged",
      description: "Feeling good today (7/10)",
      time: "2 hours ago",
      icon: Smile,
    },
    {
      type: "journal",
      title: "Journal entry",
      description: "Wrote about morning meditation",
      time: "1 day ago",
      icon: BookOpen,
    },
    {
      type: "chat",
      title: "AI conversation",
      description: "Discussed stress management",
      time: "2 days ago",
      icon: MessageCircle,
    },
  ]

  if (!user) {
    return (
      <div className="min-h-screen bg-section-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-section-light">
      {/* Navigation */}
      <nav className="nav-enhanced">
        <div className="container-responsive">
          <div className="flex justify-between items-center nav-mobile">
            <div className="flex items-center space-x-2">
              <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600" />
              <span className="text-xl sm:text-2xl font-bold text-gray-900">MindEase</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="btn-enhanced btn-ghost-enhanced">
                <Settings className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Settings</span>
              </Button>
              <Button variant="ghost" size="sm" className="btn-enhanced btn-ghost-enhanced">
                <User className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">{user.fullName}</span>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="sm:hidden touch-target btn-enhanced btn-ghost-enhanced"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden mt-4 pb-4 border-t border-emerald-100">
              <div className="flex flex-col space-y-3 pt-4">
                <Button variant="ghost" className="btn-enhanced btn-ghost-enhanced w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button variant="ghost" className="btn-enhanced btn-ghost-enhanced w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  {user.fullName}
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="container-responsive py-6 sm:py-8">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-fluid-2xl font-bold text-gray-900 mb-2">
            Welcome back, {user.fullName.split(" ")[0]}! 👋
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            How are you feeling today? Let's continue your mental wellness journey.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="card-enhanced hover-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
              <CardTitle className="text-sm sm:text-base font-medium">Today's Mood</CardTitle>
              <Heart className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="text-xl sm:text-2xl font-bold">{moodData.today}/10</div>
              <p className="text-xs text-muted-foreground">+0.5 from yesterday</p>
            </CardContent>
          </Card>

          <Card className="card-enhanced hover-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
              <CardTitle className="text-sm sm:text-base font-medium">Weekly Average</CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="text-xl sm:text-2xl font-bold">{moodData.average}/10</div>
              <p className="text-xs text-muted-foreground">Trending upward</p>
            </CardContent>
          </Card>

          <Card className="card-enhanced hover-glow sm:col-span-2 lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
              <CardTitle className="text-sm sm:text-base font-medium">Logging Streak</CardTitle>
              <Calendar className="h-4 w-4 text-emerald-700" />
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="text-xl sm:text-2xl font-bold">{moodData.streak} days</div>
              <p className="text-xs text-muted-foreground">Keep it up!</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href} scroll={true}>
                <Card className="card-feature hover-lift cursor-pointer h-full touch-target">
                  <CardHeader className="card-mobile pb-3">
                    <div className={`inline-flex p-2 sm:p-3 rounded-lg ${action.color} w-fit mb-2`}>
                      <action.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <CardTitle className="text-base sm:text-lg">{action.title}</CardTitle>
                    <CardDescription className="text-sm sm:text-base">{action.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="card-enhanced">
              <CardHeader className="card-mobile">
                <CardTitle className="text-lg sm:text-xl">Recent Activity</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Your latest interactions with MindEase
                </CardDescription>
              </CardHeader>
              <CardContent className="card-mobile">
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <activity.icon className="h-4 w-4 text-gray-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm sm:text-base font-medium text-gray-900">{activity.title}</p>
                        <p className="text-xs sm:text-sm text-gray-500">{activity.description}</p>
                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Wellness Tips */}
          <div>
            <Card className="card-gradient">
              <CardHeader className="card-mobile">
                <CardTitle className="text-lg sm:text-xl">Daily Wellness Tip</CardTitle>
              </CardHeader>
              <CardContent className="card-mobile">
                <div className="space-y-4">
                  <div className="p-4 bg-emerald-50 rounded-lg">
                    <h3 className="font-medium text-emerald-900 mb-2 text-base sm:text-lg">Practice Gratitude</h3>
                    <p className="text-sm sm:text-base text-emerald-700 leading-relaxed">
                      Take a moment to write down three things you're grateful for today. This simple practice can
                      significantly boost your mood and overall well-being.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900 text-base sm:text-lg">Today's Progress</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Mood tracking</span>
                        <span>1/1</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Journal entry</span>
                        <span>0/1</span>
                      </div>
                      <Progress value={0} className="h-2" />
                    </div>
                  </div>

                  <Link href="/journal" scroll={true}>
                    <Button className="btn-enhanced btn-primary-enhanced btn-mobile w-full" size="sm">
                      Complete Today's Journal
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
