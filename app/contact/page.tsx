"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Mail, Phone, MapPin, PhoneIcon as Whatsapp } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useScrollRestoration } from "@/components/scroll-restoration-provider"

export default function ContactPage() {
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
                <Mail className="h-6 w-6 text-emerald-600" />
                <span className="text-lg font-semibold text-gray-900">Contact Us</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container-responsive py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Form */}
          <Card className="card-enhanced">
            <CardHeader className="border-b p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <p className="text-gray-600">
                We'd love to hear from you! Fill out the form below or reach out through our direct contact methods.
              </p>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your Name" className="input-enhanced" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@example.com" className="input-enhanced" />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Subject of your inquiry" className="input-enhanced" />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Your message..." className="textarea-enhanced min-h-[120px]" />
                </div>
                <Button type="submit" className="btn-enhanced btn-primary-enhanced w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="card-enhanced">
            <CardHeader className="border-b p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Our Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-emerald-600" />
                <p className="text-gray-700">support@mindease.com</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-emerald-600" />
                <Link
                  href="https://wa.me/254712345678?text=Hello"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-emerald-600 transition-colors flex items-center space-x-1"
                >
                  <span>+254 712 345 678</span>
                  <Whatsapp className="h-4 w-4 text-green-500" />
                </Link>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-1" />
                <p className="text-gray-700">
                  MindEase Headquarters
                  <br />
                  Nairobi, Kenya
                </p>
              </div>
              <p className="text-sm text-gray-500">Our support team is available Monday - Friday, 9 AM - 5 PM EAT.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
