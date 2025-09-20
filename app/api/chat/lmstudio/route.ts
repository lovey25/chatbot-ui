import { checkApiKey, getServerProfile } from "@/lib/server/server-chat-helpers"
import { ChatSettings } from "@/types"
import { OpenAIStream, StreamingTextResponse } from "ai"
import { ServerRuntime } from "next"
import OpenAI from "openai"
import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions.mjs"

export const runtime: ServerRuntime = "edge"

export async function POST(request: Request) {
  const json = await request.json()
  const { chatSettings, messages } = json as {
    chatSettings: ChatSettings
    messages: any[]
  }

  try {
    const profile = await getServerProfile()

    // LM Studio doesn't require API key but we check for base URL
    if (!profile.lmstudio_url) {
      throw new Error("LM Studio URL not configured")
    }

    // Create OpenAI client pointing to LM Studio server
    const openai = new OpenAI({
      apiKey: "lm-studio", // LM Studio doesn't require a real API key
      baseURL: profile.lmstudio_url + "/v1"
    })

    const response = await openai.chat.completions.create({
      model: chatSettings.model as ChatCompletionCreateParamsBase["model"],
      messages: messages as ChatCompletionCreateParamsBase["messages"],
      temperature: chatSettings.temperature,
      max_tokens: chatSettings.maxTokens || 4096,
      stream: true
    })

    const stream = OpenAIStream(response)

    return new StreamingTextResponse(stream)
  } catch (error: any) {
    let errorMessage = error.message || "An unexpected error occurred"
    const errorCode = error.status || 500

    if (errorMessage.toLowerCase().includes("lm studio url")) {
      errorMessage =
        "LM Studio URL not configured. Please set it in your profile settings."
    } else if (errorMessage.toLowerCase().includes("econnrefused") || 
               errorMessage.toLowerCase().includes("fetch failed")) {
      errorMessage =
        "Cannot connect to LM Studio. Please ensure LM Studio is running and the server is started."
    }

    return new Response(JSON.stringify({ message: errorMessage }), {
      status: errorCode
    })
  }
}