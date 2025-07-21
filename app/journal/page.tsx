"use client"

import { Label } from "@/components/ui/label"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, BookOpen, PlusCircle, Save, Trash2, Search } from "lucide-react"
import { useScrollRestoration } from "@/components/scroll-restoration-provider"

interface JournalEntry {
  id: string
  title: string
  content: string
  date: string
  tags: string[]
  timestamp: number
}

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [currentEntry, setCurrentEntry] = useState<JournalEntry | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()
  const { restoreScrollPosition } = useScrollRestoration()

  useEffect(() => {
    // Load entries from local storage
    const storedEntries = localStorage.getItem("journalEntries")
    if (storedEntries) {
      setEntries(JSON.parse(storedEntries))
    }
  }, [])

  useEffect(() => {
    // Save entries to local storage whenever they change
    localStorage.setItem("journalEntries", JSON.stringify(entries))
  }, [entries])

  const handleNewEntry = () => {
    setCurrentEntry({
      id: Date.now().toString(),
      title: "",
      content: "",
      date: new Date().toISOString().split("T")[0],
      tags: [],
      timestamp: Date.now(),
    })
    setIsEditing(true)
  }

  const handleSaveEntry = () => {
    if (currentEntry) {
      if (currentEntry.title.trim() === "" || currentEntry.content.trim() === "") {
        alert("Title and content cannot be empty.")
        return
      }

      setEntries((prevEntries) => {
        const existingIndex = prevEntries.findIndex((entry) => entry.id === currentEntry.id)
        if (existingIndex > -1) {
          // Update existing entry
          const updatedEntries = [...prevEntries]
          updatedEntries[existingIndex] = currentEntry
          return updatedEntries.sort((a, b) => b.timestamp - a.timestamp) // Sort by latest
        } else {
          // Add new entry
          return [currentEntry, ...prevEntries].sort((a, b) => b.timestamp - a.timestamp) // Sort by latest
        }
      })
      setIsEditing(false)
      setCurrentEntry(null)
    }
  }

  const handleDeleteEntry = (id: string) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      setEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== id))
      if (currentEntry?.id === id) {
        setCurrentEntry(null)
        setIsEditing(false)
      }
    }
  }

  const handleEditEntry = (entry: JournalEntry) => {
    setCurrentEntry(entry)
    setIsEditing(true)
  }

  const filteredEntries = entries.filter(
    (entry) =>
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

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
                <BookOpen className="h-6 w-6 text-emerald-600" />
                <span className="text-lg font-semibold text-gray-900">Personal Journal</span>
              </div>
            </div>
            <Button onClick={handleNewEntry} className="btn-enhanced btn-primary-enhanced">
              <PlusCircle className="h-4 w-4 mr-2" />
              New Entry
            </Button>
          </div>
        </div>
      </nav>

      <div className="container-responsive py-4 sm:py-6">
        {isEditing ? (
          <Card className="card-enhanced">
            <CardHeader className="border-b p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">
                {currentEntry?.id ? "Edit Journal Entry" : "New Journal Entry"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="entry-title">Title</Label>
                <Input
                  id="entry-title"
                  placeholder="My thoughts today..."
                  value={currentEntry?.title || ""}
                  onChange={(e) => setCurrentEntry((prev) => (prev ? { ...prev, title: e.target.value } : null))}
                  className="input-enhanced"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="entry-content">Content</Label>
                <Textarea
                  id="entry-content"
                  placeholder="Write your thoughts here..."
                  value={currentEntry?.content || ""}
                  onChange={(e) => setCurrentEntry((prev) => (prev ? { ...prev, content: e.target.value } : null))}
                  className="textarea-enhanced min-h-[200px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="entry-tags">Tags (comma-separated)</Label>
                <Input
                  id="entry-tags"
                  placeholder="e.g., mood, reflection, gratitude"
                  value={currentEntry?.tags.join(", ") || ""}
                  onChange={(e) =>
                    setCurrentEntry((prev) =>
                      prev ? { ...prev, tags: e.target.value.split(",").map((tag) => tag.trim()) } : null,
                    )
                  }
                  className="input-enhanced"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  className="btn-enhanced btn-outline-enhanced"
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveEntry} className="btn-enhanced btn-primary-enhanced">
                  <Save className="h-4 w-4 mr-2" />
                  Save Entry
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Journal Entries List */}
            <Card className="card-enhanced lg:col-span-2">
              <CardHeader className="border-b p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">Your Journal Entries</CardTitle>
                <div className="relative mt-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search entries by title, content, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-enhanced pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                {filteredEntries.length === 0 ? (
                  <p className="text-center text-gray-500">No journal entries found. Start a new one!</p>
                ) : (
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-4">
                      {filteredEntries.map((entry) => (
                        <div
                          key={entry.id}
                          className="rounded-md bg-gray-50 p-4 shadow-sm hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-lg">{entry.title}</h3>
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditEntry(entry)}
                                className="btn-enhanced btn-ghost-enhanced"
                              >
                                Edit
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteEntry(entry.id)}
                                className="btn-enhanced btn-ghost-enhanced text-red-500 hover:text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2">{entry.content}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {entry.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <p className="text-xs text-gray-400 mt-2">
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

            {/* Quick Actions / Info */}
            <Card className="card-enhanced lg:col-span-1">
              <CardHeader className="border-b p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">Journal Insights</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <p className="text-gray-600">
                  Your journal is a private space for reflection. Write freely and track your thoughts over time.
                </p>
                <Button onClick={handleNewEntry} className="btn-enhanced btn-primary-enhanced w-full">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add New Entry
                </Button>
                <div className="space-y-2">
                  <h4 className="font-semibold">Total Entries:</h4>
                  <p className="text-2xl font-bold text-emerald-600">{entries.length}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Last Entry:</h4>
                  <p className="text-gray-600">
                    {entries.length > 0
                      ? new Date(entries[0].date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "N/A"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
