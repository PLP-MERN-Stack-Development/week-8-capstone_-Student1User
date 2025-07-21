"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Brain, Send, ArrowLeft, Heart, Lightbulb, Book, Smile, MessageCircle, LogOut } from "lucide-react"
import { useChat } from "ai/react"
import { useRouter } from "next/navigation"
import { useScrollRestoration } from "@/components/scroll-restoration-provider"
import { createBrowserClient } from "@/lib/supabase/client"

export default function ChatPage() {
  const [user, setUser] = useState<any>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { restoreScrollPosition } = useScrollRestoration()
  const supabase = createBrowserClient()

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hello! I'm your AI mental health companion. I'm here to listen, support, and provide guidance on your wellness journey. How are you feeling today?",
      },
    ],
  })

  useEffect(() => {
    const checkUserSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session) {
        setUser(session.user)
      } else {
        router.push("/auth") // Redirect to login if no session
      }
    }
    checkUserSession()
  }, [router, supabase])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const suggestions = [
    {
      text: "I'm feeling anxious today",
      icon: Heart,
      color: "bg-green-100 text-green-700 hover:bg-green-200",
    },
    {
      text: "Help me with stress management",
      icon: Lightbulb,
      color: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
    },
    {
      text: "I need motivation",
      icon: Smile,
      color: "bg-green-200 text-green-800 hover:bg-green-300",
    },
    {
      text: "Share a spiritual quote",
      icon: Book,
      color: "bg-emerald-200 text-emerald-800 hover:bg-emerald-300",
    },
  ]

  const handleSuggestionClick = (suggestion: string) => {
    handleInputChange({ target: { value: suggestion } } as any)
  }

  const getSentimentColor = (content: string) => {
    // Simple sentiment analysis based on keywords
    const positiveWords = ["happy", "good", "great", "wonderful", "amazing", "love", "joy"]
    const negativeWords = ["sad", "bad", "terrible", "awful", "hate", "angry", "depressed"]

    const lowerContent = content.toLowerCase()
    const hasPositive = positiveWords.some((word) => lowerContent.includes(word))
    const hasNegative = negativeWords.some((word) => lowerContent.includes(word))

    if (hasPositive && !hasNegative) return "text-green-600"
    if (hasNegative && !hasPositive) return "text-red-600"
    return "text-emerald-600"
  }

  const handleBackToHome = () => {
    router.push("/")
  }

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      router.push("/auth")
    } else {
      console.error("Error signing out:", error)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading user session...</p>
      </div>
    )
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
                <Brain className="h-6 w-6 text-emerald-600" />
                <span className="text-lg font-semibold text-gray-900">AI Companion</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="badge-enhanced text-xs sm:text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Online
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                className="btn-enhanced btn-ghost-enhanced touch-target"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4" />
                <span className="sr-only">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container-responsive py-4 sm:py-6">
        <Card className="card-enhanced h-[calc(100vh-160px)] sm:h-[calc(100vh-180px)] flex flex-col">
          <CardHeader className="border-b p-4 sm:p-6">
            <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
              <MessageCircle className="h-5 w-5 text-emerald-600" />
              <span>Mental Health Support Chat</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4 sm:p-6" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 text-sm sm:text-base ${
                        message.role === "user" ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      {message.role === "user" && (
                        <div className="text-xs mt-1 opacity-70">
                          <span className={getSentimentColor(message.content)}>● Sentiment detected</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Suggestions */}
            {messages.length <= 1 && (
              <div className="p-4 sm:p-6 border-t bg-gray-50">
                <p className="text-sm sm:text-base text-gray-600 mb-3">Quick suggestions to get started:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {suggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className={`btn-enhanced btn-outline-enhanced justify-start h-auto py-2 text-xs sm:text-sm ${suggestion.color} touch-target`}
                      onClick={() => handleSuggestionClick(suggestion.text)}
                    >
                      <suggestion.icon className="h-4 w-4 mr-2" />
                      <span>{suggestion.text}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 sm:p-6 border-t">
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Share your thoughts or ask for guidance..."
                  className="input-enhanced flex-1 text-sm sm:text-base"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="btn-enhanced btn-primary-enhanced touch-target"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
              {error && <div className="mt-2 text-red-500 text-sm">Error: {error.message}</div>}
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Your conversations are private and secure. This AI is designed to provide support, not replace
                professional therapy.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
