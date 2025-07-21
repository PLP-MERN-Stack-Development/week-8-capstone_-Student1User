import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ScrollRestorationProvider } from "@/components/scroll-restoration-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MindEase - AI-Powered Mental Health Companion",
  description:
    "A comprehensive mental wellness platform that combines AI-powered conversations, mood tracking, and personal journaling to support your emotional well-being.",
  keywords: "mental health, AI companion, mood tracking, journaling, wellness, meditation, therapy support",
  authors: [{ name: "MindEase Team" }],
  creator: "MindEase",
  publisher: "MindEase",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mindease.com",
    title: "MindEase - AI-Powered Mental Health Companion",
    description: "Your personal mental health companion supporting your journey to emotional well-being.",
    siteName: "MindEase",
  },
  twitter: {
    card: "summary_large_image",
    title: "MindEase - AI-Powered Mental Health Companion",
    description: "Your personal mental health companion supporting your journey to emotional well-being.",
    creator: "@mindease",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#10b981",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ScrollRestorationProvider>{children}</ScrollRestorationProvider>
      </body>
    </html>
  )
}
