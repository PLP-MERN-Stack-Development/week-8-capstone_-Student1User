import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const verse = searchParams.get("verse")

    if (!verse) {
      return NextResponse.json({ error: "Verse parameter is required" }, { status: 400 })
    }

    const bibleApiUrl = process.env.BIBLE_API_URL || "https://bible-api.com"

    const response = await fetch(`${bibleApiUrl}/${encodeURIComponent(verse)}`)

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Bible API error:", errorData)
      return NextResponse.json({ error: errorData.error || "Failed to fetch Bible verse" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in Bible API route:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
