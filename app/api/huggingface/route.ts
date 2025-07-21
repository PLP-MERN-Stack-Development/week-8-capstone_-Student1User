import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { prompt, model = "gpt2" } = await req.json() // Default to gpt2 if no model is provided

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const huggingFaceApiKey = process.env.HUGGING_FACE_API_KEY

    if (!huggingFaceApiKey) {
      return NextResponse.json({ error: "Hugging Face API key not configured" }, { status: 500 })
    }

    const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
      headers: {
        Authorization: `Bearer ${huggingFaceApiKey}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ inputs: prompt }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Hugging Face API error:", errorData)
      return NextResponse.json(
        { error: errorData.error || "Failed to generate text from Hugging Face" },
        { status: response.status },
      )
    }

    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in Hugging Face API route:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
