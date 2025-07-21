"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useScrollRestoration } from "@/components/scroll-restoration-provider"

export default function TermsPage() {
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
                <span className="text-lg font-semibold text-gray-900">Terms of Service</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container-responsive py-4 sm:py-6">
        <Card className="card-enhanced">
          <CardHeader className="border-b p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">MindEase Terms of Service</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-6 text-gray-700 leading-relaxed">
            <p>
              <strong>Effective Date: July 18, 2025</strong>
            </p>
            <p>
              Welcome to MindEase! These Terms of Service ("Terms") govern your access to and use of the MindEase
              website, mobile applications, and services (collectively, the "Service"). By accessing or using the
              Service, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms,
              please do not use our Service.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-4">1. Use of Service</h3>
            <p>
              MindEase provides an AI-powered mental health companion, mood tracking, and personal journaling tools. The
              Service is intended for informational and supportive purposes only and does not constitute professional
              medical advice, diagnosis, or treatment. Always seek the advice of a qualified health provider for any
              questions you may have regarding a medical condition.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-4">2. User Accounts</h3>
            <p>
              To access certain features of the Service, you may be required to create an account. You agree to provide
              accurate, current, and complete information during the registration process and to update such information
              to keep it accurate, current, and complete. You are responsible for safeguarding your password and for any
              activities or actions under your account.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-4">3. Privacy</h3>
            <p>
              Your privacy is paramount to us. Our Privacy Policy explains how we collect, use, and disclose information
              about you. By using the Service, you consent to our collection, use, and disclosure of your information as
              described in the Privacy Policy.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-4">4. Prohibited Conduct</h3>
            <p>You agree not to:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Use the Service for any illegal or unauthorized purpose.</li>
              <li>
                Impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a
                person or entity.
              </li>
              <li>Interfere with or disrupt the integrity or performance of the Service.</li>
              <li>
                Upload or transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory,
                vulgar, obscene, or otherwise objectionable.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-4">5. Intellectual Property</h3>
            <p>
              All content, trademarks, service marks, trade names, and logos on the Service are owned by MindEase or its
              licensors and are protected by copyright and other intellectual property laws. You may not use any of our
              intellectual property without our prior written consent.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-4">6. Disclaimers</h3>
            <p>
              THE SERVICE IS PROVIDED "AS IS," WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING,
              WITHOUT LIMITATION, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
              NON-INFRINGEMENT. MINDEASE DOES NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-4">7. Limitation of Liability</h3>
            <p>
              IN NO EVENT SHALL MINDEASE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
              DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA,
              USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (A) YOUR ACCESS TO OR USE OF OR INABILITY TO
              ACCESS OR USE THE SERVICE; (B) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICE; OR (C)
              UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-4">8. Changes to Terms</h3>
            <p>
              We may revise these Terms from time to time. The most current version will always be posted on our
              website. By continuing to access or use the Service after revisions become effective, you agree to be
              bound by the revised Terms.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-4">9. Governing Law</h3>
            <p>These Terms shall be governed by the laws of Kenya, without regard to its conflict of law principles.</p>

            <h3 className="text-lg font-semibold text-gray-900 mt-4">10. Contact Us</h3>
            <p>
              If you have any questions about these Terms, please contact us at{" "}
              <Link href="mailto:support@mindease.com" className="text-emerald-600 hover:underline">
                support@mindease.com
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
