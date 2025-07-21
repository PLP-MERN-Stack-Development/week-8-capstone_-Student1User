"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useScrollRestoration } from "@/components/scroll-restoration-provider"

export default function PrivacyPage() {
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
                <span className="text-lg font-semibold text-gray-900">Privacy Policy</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container-responsive py-4 sm:py-6">
        <Card className="card-enhanced">
          <CardHeader className="border-b p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">MindEase Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-6 text-gray-700 leading-relaxed">
            <p>
              <strong>Effective Date: July 18, 2025</strong>
            </p>
            <p>
              MindEase ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy describes how
              we collect, use, disclose, and protect your personal information when you use our website, mobile
              applications, and services (collectively, the "Service").
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-4">1. Information We Collect</h3>
            <p>We collect information to provide and improve our Service. This includes:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>
                <strong>Personal Information:</strong> When you create an account, we may collect your name, email
                address, password, gender, and religious/spiritual preferences.
              </li>
              <li>
                <strong>Usage Data:</strong> We collect information about how you access and use the Service, such as
                your interactions with the AI chatbot, mood entries, journal content, and analytics data.
              </li>
              <li>
                <strong>Device Information:</strong> We may collect information about the device you use to access the
                Service, including IP address, device type, operating system, and browser type.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-4">2. How We Use Your Information</h3>
            <p>We use the collected information for various purposes, including:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>To provide, maintain, and improve our Service.</li>
              <li>To personalize your experience, such as tailoring AI responses and spiritual content.</li>
              <li>To understand and analyze how you use our Service to enhance features and functionality.</li>
              <li>To communicate with you, including sending updates, security alerts, and support messages.</li>
              <li>To detect, prevent, and address technical issues or fraudulent activities.</li>
              <li>To comply with legal obligations.</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-4">3. Data Sharing and Disclosure</h3>
            <p>We do not sell your personal information to third parties. We may share information:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>
                <strong>With Service Providers:</strong> We may share your information with third-party vendors who
                perform services on our behalf, such as hosting, data analysis, and customer support. These providers
                are obligated to protect your information and use it only for the purposes for which it was disclosed.
              </li>
              <li>
                <strong>For Legal Reasons:</strong> We may disclose your information if required to do so by law or in
                response to valid requests by public authorities (e.g., a court order or government agency).
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, your
                personal information may be transferred. We will notify you before your personal information becomes
                subject to a different Privacy Policy.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-4">4. Data Security</h3>
            <p>
              We implement robust security measures to protect your personal information from unauthorized access,
              alteration, disclosure, or destruction. This includes encryption, access controls, and secure data
              storage. However, no method of transmission over the Internet or electronic storage is 100% secure.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-4">5. Your Data Rights</h3>
            <p>You have certain rights regarding your personal information, including:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>
                <strong>Access:</strong> You can request access to the personal information we hold about you.
              </li>
              <li>
                <strong>Correction:</strong> You can request that we correct any inaccurate or incomplete personal
                information.
              </li>
              <li>
                <strong>Deletion:</strong> You can request the deletion of your personal information, subject to legal
                obligations.
              </li>
              <li>
                <strong>Objection:</strong> You can object to the processing of your personal information in certain
                circumstances.
              </li>
            </ul>
            <p>To exercise these rights, please contact us at support@mindease.com.</p>

            <h3 className="text-lg font-semibold text-gray-900 mt-4">6. Changes to This Privacy Policy</h3>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Effective Date" at the top. You are advised to review this
              Privacy Policy periodically for any changes.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-4">7. Contact Us</h3>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{" "}
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
