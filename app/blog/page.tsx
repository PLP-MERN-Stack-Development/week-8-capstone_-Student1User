"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Rss } from "lucide-react"
import { useRouter } from "next/navigation"
import { useScrollRestoration } from "@/components/scroll-restoration-provider"

export default function BlogPage() {
  const router = useRouter()
  const { restoreScrollPosition } = useScrollRestoration()

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
                <Rss className="h-6 w-6 text-emerald-600" />
                <span className="text-lg font-semibold text-gray-900">Blog</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container-responsive py-4 sm:py-6">
        <Card className="card-enhanced text-center">
          <CardHeader className="border-b p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">MindEase Blog</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Stay tuned for insightful articles, tips, and updates on mental wellness from the MindEase team.
            </p>
            <p className="text-gray-700 leading-relaxed text-2xl font-bold text-emerald-600">Coming Soon!</p>
            <p className="text-gray-600">
              We're actively working on creating valuable content to support your journey. Check back soon for our first
              posts!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
