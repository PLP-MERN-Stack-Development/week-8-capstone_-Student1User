import { NextResponse } from "next/server"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq" // Import Groq AI SDK

export const maxDuration = 30 // seconds

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()
    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required for AI recommendation." }, { status: 400 })
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "GROQ_API_KEY environment variable not configured." }, { status: 500 })
    }

    // Use Groq's Llama 3 8B model
    const modelToUse = groq("llama3-8b-8192")

    const { text } = await generateText({
      model: modelToUse,
      prompt,
    })
    return NextResponse.json({ recommendation: text, modelUsed: "llama3-8b-8192" })
  } catch (error: any) {
    console.error("Error in admin AI recommendation API route:", error)
    let errorMessage = "An unexpected error occurred while generating the recommendation."
    if (error.message && error.message.includes("API key not valid")) {
      errorMessage = "Invalid Groq API Key. Please check your GROQ_API_KEY."
    } else if (error.message && error.message.includes("quota")) {
      errorMessage = "Groq API quota exceeded. Please check your usage limits."
    } else if (error.message && error.message.includes("404")) {
      errorMessage = "AI model not found or temporarily unavailable. Please try again."
    }
    return NextResponse.json(
      {
        error: errorMessage,
      },
      { status: 500 },
    )
  }
}
