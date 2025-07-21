"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Heart, BookOpen, BarChart3, Shield, Smartphone, Users, Star, Menu, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Conversations",
      description: "Intelligent chatbot with sentiment analysis and personalized responses based on your beliefs",
      color: "bg-emerald-500",
    },
    {
      icon: BarChart3,
      title: "Mood Tracking",
      description: "Daily mood logging with visual analytics and trend insights",
      color: "bg-green-600",
    },
    {
      icon: BookOpen,
      title: "Personal Journal",
      description: "Secure, private journaling with tagging and search capabilities",
      color: "bg-emerald-700",
    },
    {
      icon: Heart,
      title: "Multi-faith Support",
      description: "Personalized spiritual content for various religious and spiritual beliefs",
      color: "bg-green-500",
    },
  ]

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Teacher",
      content:
        "MindEase has been a game-changer for my mental wellness journey. The AI companion truly understands and provides meaningful support.",
      rating: 5,
    },
    {
      name: "David L.",
      role: "Software Engineer",
      content:
        "The mood tracking feature helped me identify patterns I never noticed. The spiritual content is beautifully integrated.",
      rating: 5,
    },
    {
      name: "Maria R.",
      role: "Healthcare Worker",
      content:
        "As someone in a high-stress job, the journaling and AI chat features provide the perfect outlet for my thoughts and emotions.",
      rating: 5,
    },
  ]

  const handleGetStarted = () => {
    router.push("/auth")
  }

  return (
    <div className="min-h-screen bg-hero">
      {/* Navigation */}
      <nav className="nav-enhanced sticky top-0 z-50">
        <div className="container-responsive">
          <div className="flex justify-between items-center nav-mobile">
            <div className="flex items-center space-x-2">
              <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600" />
              <span className="text-xl sm:text-2xl font-bold text-gray-900">MindEase</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex items-center space-x-4">
              <Link href="/auth" scroll={true}>
                <Button variant="ghost" className="btn-enhanced btn-ghost-enhanced">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth" scroll={true}>
                <Button className="btn-enhanced btn-primary-enhanced">Get Started</Button>
              </Link>
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
                <Link href="/auth" onClick={() => setMobileMenuOpen(false)} scroll={true}>
                  <Button variant="ghost" className="btn-enhanced btn-ghost-enhanced w-full justify-start">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth" onClick={() => setMobileMenuOpen(false)} scroll={true}>
                  <Button className="btn-enhanced btn-primary-enhanced w-full">Get Started</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container-responsive">
          <div className="text-center">
            <Badge className="badge-enhanced mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
              AI-Powered Mental Wellness
            </Badge>
            <h1 className="text-fluid-4xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Your Personal
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600">
                {" "}
                Mental Health{" "}
              </span>
              Companion
            </h1>
            <p className="text-fluid-lg text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
              A comprehensive mental wellness platform that combines AI-powered conversations, mood tracking, and
              personal journaling to support your emotional well-being.
            </p>
            <div className="btn-group-mobile justify-center">
              <Button
                onClick={handleGetStarted}
                size="lg"
                className="btn-enhanced btn-primary-enhanced btn-mobile bg-emerald-600 hover:bg-emerald-700"
              >
                Start Your Journey
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="btn-enhanced btn-outline-enhanced btn-mobile bg-transparent"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-section-colored">
        <div className="container-responsive">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-fluid-3xl font-bold text-gray-900 mb-4">Everything You Need for Mental Wellness</h2>
            <p className="text-fluid-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools designed to support your mental health journey with AI-powered insights and
              personalized care.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className={`card-enhanced hover-lift cursor-pointer transition-all duration-300 ${
                    activeFeature === index ? "ring-2 ring-emerald-500 shadow-lg" : "hover:shadow-md"
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <CardHeader className="flex flex-row items-center space-y-0 pb-2 p-4 sm:p-6">
                    <div className={`p-2 sm:p-3 rounded-lg ${feature.color} mr-3 sm:mr-4 flex-shrink-0`}>
                      <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-base sm:text-lg leading-tight">{feature.title}</CardTitle>
                      <CardDescription className="text-sm sm:text-base mt-1">{feature.description}</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="relative mt-8 lg:mt-0">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-6 sm:p-8 h-80 sm:h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className={`inline-flex p-3 sm:p-4 rounded-full ${features[activeFeature].color} mb-4`}>
                    {React.createElement(features[activeFeature].icon, {
                      className: "h-8 w-8 sm:h-12 sm:w-12 text-white",
                    })}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{features[activeFeature].title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {features[activeFeature].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-section-light">
        <div className="container-responsive">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-fluid-3xl font-bold text-gray-900 mb-4">Why Choose MindEase?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="card-feature text-center">
              <CardHeader className="card-mobile">
                <Shield className="h-10 w-10 sm:h-12 sm:w-12 text-emerald-600 mx-auto mb-4" />
                <CardTitle className="text-lg sm:text-xl">Privacy First</CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6 pb-6">
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Your data is encrypted and secure. We prioritize your privacy with industry-leading security measures.
                </p>
              </CardContent>
            </Card>

            <Card className="card-feature text-center">
              <CardHeader className="card-mobile">
                <Smartphone className="h-10 w-10 sm:h-12 sm:w-12 text-green-700 mx-auto mb-4" />
                <CardTitle className="text-lg sm:text-xl">Mobile Optimized</CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6 pb-6">
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Beautiful, responsive design that works seamlessly across all your devices.
                </p>
              </CardContent>
            </Card>

            <Card className="card-feature text-center md:col-span-2 lg:col-span-1">
              <CardHeader className="card-mobile">
                <Users className="h-10 w-10 sm:h-12 sm:w-12 text-emerald-700 mx-auto mb-4" />
                <CardTitle className="text-lg sm:text-xl">Multi-faith Support</CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6 pb-6">
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Personalized spiritual content for Christianity, Islam, Judaism, Hinduism, Buddhism, and more.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-section-colored">
        <div className="container-responsive">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-fluid-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-enhanced h-full">
                <CardHeader className="card-mobile">
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-base sm:text-lg">{testimonial.name}</CardTitle>
                  <CardDescription className="text-sm sm:text-base">{testimonial.role}</CardDescription>
                </CardHeader>
                <CardContent className="px-4 sm:px-6 pb-6">
                  <p className="text-sm sm:text-base text-gray-600 italic leading-relaxed">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-cta">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-fluid-3xl font-bold text-white mb-4">Ready to Start Your Mental Wellness Journey?</h2>
          <p className="text-fluid-lg text-emerald-100 mb-6 sm:mb-8 leading-relaxed">
            Join thousands of users who have found peace and clarity with MindEase.
          </p>
          <Button
            onClick={handleGetStarted}
            size="lg"
            className="btn-enhanced btn-primary-enhanced btn-mobile bg-white text-emerald-600 hover:bg-gray-100"
          >
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="container-responsive">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-400" />
                <span className="text-xl sm:text-2xl font-bold">MindEase</span>
              </div>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                Your personal mental health companion, supporting your journey to emotional well-being.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-base sm:text-lg">Features</h3>
              <ul className="space-y-2 text-sm sm:text-base text-gray-400">
                <li>
                  <Link
                    href="/chat"
                    className="hover:text-emerald-400 transition-colors touch-target block"
                    scroll={true}
                  >
                    AI Chat
                  </Link>
                </li>
                <li>
                  <Link
                    href="/mood"
                    className="hover:text-emerald-400 transition-colors touch-target block"
                    scroll={true}
                  >
                    Mood Tracking
                  </Link>
                </li>
                <li>
                  <Link
                    href="/journal"
                    className="hover:text-emerald-400 transition-colors touch-target block"
                    scroll={true}
                  >
                    Personal Journal
                  </Link>
                </li>
                <li>
                  <Link
                    href="/analytics"
                    className="hover:text-emerald-400 transition-colors touch-target block"
                    scroll={true}
                  >
                    Analytics
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-base sm:text-lg">Support</h3>
              <ul className="space-y-2 text-sm sm:text-base text-gray-400">
                <li>
                  <Link
                    href="/help"
                    className="hover:text-emerald-400 transition-colors touch-target block"
                    scroll={true}
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-emerald-400 transition-colors touch-target block"
                    scroll={true}
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-emerald-400 transition-colors touch-target block"
                    scroll={true}
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-emerald-400 transition-colors touch-target block"
                    scroll={true}
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-base sm:text-lg">Company</h3>
              <ul className="space-y-2 text-sm sm:text-base text-gray-400">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-emerald-400 transition-colors touch-target block"
                    scroll={true}
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-emerald-400 transition-colors touch-target block"
                    scroll={true}
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="hover:text-emerald-400 transition-colors touch-target block"
                    scroll={true}
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/press"
                    className="hover:text-emerald-400 transition-colors touch-target block"
                    scroll={true}
                  >
                    Press
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
            <p className="text-sm sm:text-base text-gray-400">
              &copy; 2025 MindEase. All rights reserved. Built with care for mental wellness.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
