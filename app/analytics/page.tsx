"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, BarChart3, TrendingUp, LineChart, PieChart } from "lucide-react"
import { useRouter } from "next/navigation"
import { useScrollRestoration } from "@/components/scroll-restoration-provider"

export default function AnalyticsPage() {
  const [progress, setProgress] = useState(0)
  const router = useRouter()
  const { restoreScrollPosition } = useScrollRestoration()

  useEffect(() => {
    // Simulate data loading progress
    const timer = setTimeout(() => setProgress(80), 500)
    return () => clearTimeout(timer)
  }, [])

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
                <BarChart3 className="h-6 w-6 text-emerald-600" />
                <span className="text-lg font-semibold text-gray-900">Analytics</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="btn-enhanced btn-outline-enhanced bg-transparent">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Reports
            </Button>
          </div>
        </div>
      </nav>

      <div className="container-responsive py-4 sm:py-6">
        <Card className="card-enhanced">
          <CardHeader className="border-b p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">Your Mental Wellness Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-6">
            <p className="text-gray-600">
              This section provides insights into your mood trends, journal activity, and overall well-being.
            </p>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Mood Trends (Coming Soon!)</h3>
              <div className="flex items-center justify-center h-48 bg-gray-100 rounded-lg border border-gray-200">
                <LineChart className="h-16 w-16 text-gray-400" />
                <p className="ml-4 text-gray-500">Graph will appear here</p>
              </div>
              <Progress value={progress} className="w-full" />
              <div className="flex justify-between text-sm text-gray-500">
                <span>Data Processing</span>
                <span>Ready for Visualization</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Journal Activity (Coming Soon!)</h3>
              <div className="flex items-center justify-center h-48 bg-gray-100 rounded-lg border border-gray-200">
                <PieChart className="h-16 w-16 text-gray-400" />
                <p className="ml-4 text-gray-500">Summary will appear here</p>
              </div>
              <Progress value={progress} className="w-full" />
              <div className="flex justify-between text-sm text-gray-500">
                <span>Analyzing Entries</span>
                <span>Insights Generated</span>
              </div>
            </div>

            <div className="text-center text-gray-500 mt-8">
              <p>More detailed analytics and personalized insights are under development.</p>
              <p>Thank you for your patience!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
