"use client"

import { ScrollArea } from "@/components/ui/scroll-area"

import { Label } from "@/components/ui/label"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Smile, Frown, Meh, PlusCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useScrollRestoration } from "@/components/scroll-restoration-provider"

export default function MoodTrackingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [mood, setMood] = useState<string>("")
  const [notes, setNotes] = useState<string>("")
  const [moodHistory, setMoodHistory] = useState<{ date: string; mood: string; notes: string; timestamp: number }[]>([])
  const [progress, setProgress] = useState(0)
  const router = useRouter()
  const { restoreScrollPosition } = useScrollRestoration()

  useEffect(() => {
    // Load mood history from local storage
    const storedHistory = localStorage.getItem("moodHistory")
    if (storedHistory) {
      setMoodHistory(JSON.parse(storedHistory))
    }
  }, [])

  useEffect(() => {
    // Simulate progress for the mood tracking feature
    const timer = setTimeout(() => setProgress(75), 500)
    return () => clearTimeout(timer)
  }, [])

  const handleSaveMood = () => {
    if (selectedDate && mood) {
      const newEntry = {
        date: selectedDate.toISOString().split("T")[0],
        mood,
        notes,
        timestamp: Date.now(),
      }
      const updatedHistory = [...moodHistory, newEntry].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      )
      setMoodHistory(updatedHistory)
      localStorage.setItem("moodHistory", JSON.stringify(updatedHistory))
      setMood("")
      setNotes("")
      alert("Mood saved successfully!")
    } else {
      alert("Please select a mood and a date.")
    }
  }

  const getMoodIcon = (moodValue: string) => {
    switch (moodValue) {
      case "happy":
        return <Smile className="h-5 w-5 text-yellow-500" />
      case "neutral":
        return <Meh className="h-5 w-5 text-gray-500" />
      case "sad":
        return <Frown className="h-5 w-5 text-blue-500" />
      default:
        return null
    }
  }

  const handleBackToHome = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-section-light">
      {/* Navigation */}
      <nav className="nav-enhanced">
        <div className="container-responsive">
          <div className="flex justify-between items-center nav-mobile">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="btn-enhanced btn-ghost-enhanced touch-target"
                onClick={handleBackToHome}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-2">
                <Smile className="h-6 w-6 text-emerald-600" />
                <span className="text-lg font-semibold text-gray-900">Mood Tracker</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="btn-enhanced btn-outline-enhanced bg-transparent">
              <PlusCircle className="h-4 w-4 mr-2" />
              New Entry
            </Button>
          </div>
        </div>
      </nav>

      <div className="container-responsive py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mood Input Card */}
          <Card className="card-enhanced lg:col-span-1">
            <CardHeader className="border-b p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Log Your Mood</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mood-select">How are you feeling?</Label>
                <Select value={mood} onValueChange={setMood}>
                  <SelectTrigger id="mood-select" className="input-enhanced">
                    <SelectValue placeholder="Select your mood" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="happy">Happy 😊</SelectItem>
                    <SelectItem value="neutral">Neutral 😐</SelectItem>
                    <SelectItem value="sad">Sad 😔</SelectItem>
                    <SelectItem value="anxious">Anxious 😟</SelectItem>
                    <SelectItem value="stressed">Stressed 😫</SelectItem>
                    <SelectItem value="calm">Calm 😌</SelectItem>
                    <SelectItem value="energetic">Energetic ⚡</SelectItem>
                    <SelectItem value="tired">Tired 😴</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="mood-notes">Notes (optional)</Label>
                <Textarea
                  id="mood-notes"
                  placeholder="What's on your mind?"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="textarea-enhanced min-h-[80px]"
                />
              </div>
              <div className="space-y-2">
                <Label>Select Date</Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border shadow-sm w-full"
                />
              </div>
              <Button onClick={handleSaveMood} className="btn-enhanced btn-primary-enhanced w-full">
                Save Mood
              </Button>
            </CardContent>
          </Card>

          {/* Mood History Card */}
          <Card className="card-enhanced lg:col-span-2">
            <CardHeader className="border-b p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Mood History</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              {moodHistory.length === 0 ? (
                <p className="text-center text-gray-500">No mood entries yet. Log your first mood!</p>
              ) : (
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {moodHistory.map((entry, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-md bg-gray-50 p-3 shadow-sm"
                      >
                        <div className="flex items-center space-x-3">
                          {getMoodIcon(entry.mood)}
                          <div>
                            <p className="font-medium capitalize">{entry.mood}</p>
                            <p className="text-sm text-gray-500">{entry.notes}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          {new Date(entry.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Mood Trends/Analytics (Placeholder) */}
        <Card className="card-enhanced mt-6">
          <CardHeader className="border-b p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">Mood Trends & Insights</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <p className="text-gray-600">
              This section will display visual trends of your mood over time. (Coming Soon!)
            </p>
            <Progress value={progress} className="w-full" />
            <div className="flex justify-between text-sm text-gray-500">
              <span>Data Collection</span>
              <span>Analysis Ready</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
