"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Brain, Heart, Shield, Users } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useScrollRestoration } from "@/components/scroll-restoration-provider"

export default function AboutPage() {
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
                <Brain className="h-6 w-6 text-emerald-600" />
                <span className="text-lg font-semibold text-gray-900">About Us</span>
              </div>
            </div>
            <Link href="/contact" scroll={true}>
              <Button variant="outline" size="sm" className="btn-enhanced btn-outline-enhanced bg-transparent">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container-responsive py-4 sm:py-6">
        <Card className="card-enhanced">
          <CardHeader className="border-b p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">Our Mission at MindEase</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-6">
            <p className="text-gray-700 leading-relaxed">
              At MindEase, we believe that mental well-being is a fundamental right, not a privilege. Our mission is to
              democratize access to mental health support by leveraging cutting-edge AI technology and a compassionate,
              user-centric approach. We strive to create a safe, private, and accessible platform where everyone can
              find the tools and support they need to navigate their emotional journey.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Founded on the principles of empathy, innovation, and inclusivity, MindEase is more than just an app; it's
              a companion designed to listen without judgment, offer personalized insights, and empower you to cultivate
              a healthier mind.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <Heart className="h-8 w-8 text-emerald-600 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Compassionate AI</h3>
                  <p className="text-gray-600 text-sm">
                    Our AI is trained to understand nuances of human emotion, providing empathetic and supportive
                    responses.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Brain className="h-8 w-8 text-emerald-600 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Innovative Technology</h3>
                  <p className="text-gray-600 text-sm">
                    We utilize the latest advancements in AI and machine learning to offer personalized mental wellness
                    tools.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Shield className="h-8 w-8 text-emerald-600 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Privacy & Security</h3>
                  <p className="text-gray-600 text-sm">
                    Your data is encrypted and kept confidential. We prioritize your privacy above all else.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Users className="h-8 w-8 text-emerald-600 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Inclusivity</h3>
                  <p className="text-gray-600 text-sm">
                    MindEase is built for everyone, offering multi-faith support and a welcoming environment for all
                    backgrounds.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Vision for the Future</h3>
              <p className="text-gray-700 leading-relaxed">
                We envision a world where mental health support is seamlessly integrated into daily life, empowering
                individuals to proactively manage their emotional well-being. MindEase will continue to evolve,
                incorporating new features and insights to serve our community better.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
