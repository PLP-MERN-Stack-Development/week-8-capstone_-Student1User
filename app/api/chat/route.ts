import { NextResponse } from "next/server"
import { streamText } from "ai"
import { groq } from "@ai-sdk/groq" // Import Groq AI SDK

export const maxDuration = 30 // seconds

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "GROQ_API_KEY environment variable not configured." }, { status: 500 })
    }

    // Use Groq's Llama 3 8B model
    const modelToUse = groq("llama3-8b-8192")

    const result = await streamText({
      model: modelToUse,
      messages,
    })
    return result.toDataStreamResponse()
  } catch (error: any) {
    console.error("Error in chat API route:", error)
    let errorMessage = "An unexpected error occurred while processing your request."
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
