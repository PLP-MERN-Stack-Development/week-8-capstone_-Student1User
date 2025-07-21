"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Brain, Users, BarChart, LogOut, ChevronRight, Smile, Frown, Meh, Send, Lightbulb } from "lucide-react"
import {
  generateSimulatedUsers,
  generateSimulatedMoodTrends,
  generateSimulatedSentimentDistribution,
  type SimulatedUser,
  type SimulatedMoodTrend,
  type SimulatedSentimentDistribution,
} from "@/lib/data-simulation"
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Textarea } from "@/components/ui/textarea"
import { createBrowserClient } from "@/lib/supabase/client"
import { ADMIN_EMAIL } from "@/lib/constants" // Updated import

export default function AdminDashboardPage() {
  const router = useRouter()
  const [users, setUsers] = useState<SimulatedUser[]>([])
  const [moodTrends, setMoodTrends] = useState<SimulatedMoodTrend[]>([])
  const [sentimentDistribution, setSentimentDistribution] = useState<SimulatedSentimentDistribution[]>([])
  const [selectedUser, setSelectedUser] = useState<SimulatedUser | null>(null)
  const [messageContent, setMessageContent] = useState("")
  const [aiRecommendationLoading, setAiRecommendationLoading] = useState(false)
  const [aiRecommendation, setAiRecommendation] = useState<string | null>(null)

  useEffect(() => {
    const checkAdminSession = async () => {
      const supabase = createBrowserClient()
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()

      // In a real application, you'd check for a specific admin role or user ID
      // For this demo, we'll check if a session exists and if the user's email matches the admin email
      if (!session || session.user.email !== ADMIN_EMAIL) {
        router.push("/admin/login")
        return
      }

      // Load simulated data
      setUsers(generateSimulatedUsers(10)) // Generate 10 dummy users
      setMoodTrends(generateSimulatedMoodTrends())
      setSentimentDistribution(generateSimulatedSentimentDistribution())
    }

    checkAdminSession()
  }, [router])

  const handleLogout = async () => {
    const supabase = await createBrowserClient()
    const { error } = await supabase.auth.signOut()
    if (!error) {
      router.push("/admin/login")
    } else {
      console.error("Error signing out:", error)
    }
  }

  const getMoodIcon = (moodValue: number) => {
    if (moodValue >= 7) return <Smile className="h-4 w-4 text-green-500" />
    if (moodValue >= 5) return <Meh className="h-4 w-4 text-yellow-500" />
    return <Frown className="h-4 w-4 text-red-500" />
  }

  const handleSendMessage = (userId: string) => {
    // In a real app, this would send a message to the user via a backend service
    alert(`Simulating sending message to ${selectedUser?.name || userId}: "${messageContent}"`)
    setMessageContent("")
  }

  const handleGenerateAIRecommendation = async (user: SimulatedUser) => {
    setAiRecommendationLoading(true)
    setAiRecommendation(null)
    try {
      // In a real app, you'd send actual user data to your AI API
      // For this demo, we'll send a generic prompt based on simulated data
      const prompt = `Generate a mental wellness recommendation for a user named ${user.name} who has an average mood of ${user.moodAverage}/10, made ${user.journalEntries} journal entries, and had ${user.chatSessions} chat sessions. Their primary religious/spiritual preference is ${user.religion}.`

      const response = await fetch("/api/admin-ai-recommendation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to get AI recommendation")
      }

      const data = await response.json()
      setAiRecommendation(data.recommendation)
    } catch (error: any) {
      console.error("AI Recommendation error:", error)
      setAiRecommendation(`Error generating recommendation: ${error.message}`)
    } finally {
      setAiRecommendationLoading(false)
    }
  }

  if (!users.length) {
    return (
      <div className="min-h-screen bg-section-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
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
              <span className="text-xl sm:text-2xl font-bold text-gray-900">MindEase Admin</span>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="btn-enhanced btn-ghost-enhanced" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container-responsive py-6 sm:py-8">
        <h1 className="text-fluid-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="card-enhanced">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
              <CardTitle className="text-sm sm:text-base font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="text-xl sm:text-2xl font-bold">{users.length}</div>
              <p className="text-xs text-muted-foreground">Simulated data</p>
            </CardContent>
          </Card>

          <Card className="card-enhanced">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
              <CardTitle className="text-sm sm:text-base font-medium">Avg. Mood Score</CardTitle>
              <Smile className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="text-xl sm:text-2xl font-bold">
                {(users.reduce((sum, user) => sum + user.moodAverage, 0) / users.length).toFixed(1)}/10
              </div>
              <p className="text-xs text-muted-foreground">Overall average</p>
            </CardContent>
          </Card>

          <Card className="card-enhanced sm:col-span-2 lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
              <CardTitle className="text-sm sm:text-base font-medium">Total Journal Entries</CardTitle>
              <BarChart className="h-4 w-4 text-emerald-700" />
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="text-xl sm:text-2xl font-bold">
                {users.reduce((sum, user) => sum + user.journalEntries, 0)}
              </div>
              <p className="text-xs text-muted-foreground">Across all simulated users</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* User List */}
          <div className="lg:col-span-2">
            <Card className="card-enhanced">
              <CardHeader className="card-mobile">
                <CardTitle className="text-lg sm:text-xl">All Users</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Overview of simulated user activity and mental health metrics.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Mood Avg.</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell className="flex items-center gap-2">
                          {getMoodIcon(user.moodAverage)} {user.moodAverage}/10
                        </TableCell>
                        <TableCell>{user.lastActive}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedUser(user)}
                            className="btn-enhanced btn-ghost-enhanced"
                          >
                            View <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* User Details / Messaging / AI Recommendation */}
          <div className="lg:col-span-1">
            {selectedUser ? (
              <Card className="card-enhanced">
                <CardHeader className="card-mobile border-b">
                  <CardTitle className="text-lg sm:text-xl">{selectedUser.name}'s Details</CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Simulated data for {selectedUser.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Email: {selectedUser.email}</p>
                    <p className="text-sm font-medium">Gender: {selectedUser.gender}</p>
                    <p className="text-sm font-medium">Religion: {selectedUser.religion}</p>
                    <p className="text-sm font-medium">Mood Average: {selectedUser.moodAverage}/10</p>
                    <p className="text-sm font-medium">Journal Entries: {selectedUser.journalEntries}</p>
                    <p className="text-sm font-medium">Chat Sessions: {selectedUser.chatSessions}</p>
                  </div>

                  <h3 className="text-md font-semibold text-gray-900 mt-4">Send Message</h3>
                  <Textarea
                    placeholder={`Type message to ${selectedUser.name}...`}
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    className="textarea-enhanced min-h-[80px]"
                  />
                  <Button
                    onClick={() => handleSendMessage(selectedUser.id)}
                    className="btn-enhanced btn-primary-enhanced w-full"
                    disabled={!messageContent.trim()}
                  >
                    <Send className="h-4 w-4 mr-2" /> Send Message
                  </Button>

                  <h3 className="text-md font-semibold text-gray-900 mt-4">AI Recommendation</h3>
                  <Button
                    onClick={() => handleGenerateAIRecommendation(selectedUser)}
                    className="btn-enhanced btn-secondary-enhanced w-full"
                    disabled={aiRecommendationLoading}
                  >
                    {aiRecommendationLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Lightbulb className="h-4 w-4 mr-2" /> Generate AI Recommendation
                      </>
                    )}
                  </Button>
                  {aiRecommendation && (
                    <Card className="card-enhanced mt-4">
                      <CardContent className="p-4 text-sm text-gray-700">{aiRecommendation}</CardContent>
                    </Card>
                  )}

                  <Button
                    variant="outline"
                    onClick={() => setSelectedUser(null)}
                    className="btn-enhanced btn-outline-enhanced w-full mt-4"
                  >
                    Back to User List
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="card-enhanced h-full">
                <CardHeader className="card-mobile">
                  <CardTitle className="text-lg sm:text-xl">User Details</CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Select a user from the list to view their simulated details and actions.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 text-center text-gray-500">No user selected.</CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Graphs Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mt-6 sm:mt-8">
          <Card className="card-enhanced">
            <CardHeader className="card-mobile">
              <CardTitle className="text-lg sm:text-xl">Overall Mood Trends</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Simulated average mood score over the last 12 months.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <ChartContainer
                config={{
                  averageMood: {
                    label: "Average Mood",
                    color: "hsl(var(--emerald-600))",
                  },
                }}
                className="h-[300px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={moodTrends} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[1, 10]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line type="monotone" dataKey="averageMood" stroke="hsl(var(--emerald-600))" name="Average Mood" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="card-enhanced">
            <CardHeader className="card-mobile">
              <CardTitle className="text-lg sm:text-xl">Simulated Sentiment Distribution</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Distribution of sentiments from simulated journal entries/chat.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 flex items-center justify-center">
              <ChartContainer
                config={{
                  positive: {
                    label: "Positive",
                    color: "hsl(var(--green-500))",
                  },
                  neutral: {
                    label: "Neutral",
                    color: "hsl(var(--yellow-500))",
                  },
                  negative: {
                    label: "Negative",
                    color: "hsl(var(--red-500))",
                  },
                }}
                className="h-[300px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sentimentDistribution}
                      dataKey="count"
                      nameKey="sentiment"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      label
                    >
                      {sentimentDistribution.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            entry.sentiment === "Positive"
                              ? "hsl(var(--green-500))"
                              : entry.sentiment === "Neutral"
                                ? "hsl(var(--yellow-500))"
                                : "hsl(var(--red-500))"
                          }
                        />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
