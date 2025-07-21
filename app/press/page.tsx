"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Newspaper } from "lucide-react"
import { useRouter } from "next/navigation"
import { useScrollRestoration } from "@/components/scroll-restoration-provider"

export default function PressPage() {
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
                <Newspaper className="h-6 w-6 text-emerald-600" />
                <span className="text-lg font-semibold text-gray-900">Press</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container-responsive py-4 sm:py-6">
        <Card className="card-enhanced text-center">
          <CardHeader className="border-b p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">MindEase in the News</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              We appreciate your interest in MindEase and our mission to support mental wellness.
            </p>
            <p className="text-gray-700 leading-relaxed text-2xl font-bold text-emerald-600">Coming Soon!</p>
            <p className="text-gray-600">
              Our press kit and media mentions will be available here shortly. For media inquiries, please contact us
              directly.
            </p>
            <p className="text-sm text-gray-500">
              You can reach us via the{" "}
              <a href="/contact" className="text-emerald-600 hover:underline" onClick={handleBackToHome}>
                Contact Us
              </a>{" "}
              page.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
