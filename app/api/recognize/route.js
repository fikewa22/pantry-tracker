import { NextResponse } from "next/server";
import OpenAI from "openai";

// Check if API key is available
if (!process.env.NEXT_PUBLIC_OPENROUTER_API_KEY) {
  console.warn(
    "OpenRouter API key not found. Image recognition will not work."
  );
}

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || "",
});

const systemPrompt = "What's in the image";

// POST function to handle incoming requests
export async function POST(req) {
  try {
    // Check if API key is configured
    if (!process.env.NEXT_PUBLIC_OPENROUTER_API_KEY) {
      return new NextResponse(
        JSON.stringify({
          error:
            "API key not configured. Please set NEXT_PUBLIC_OPENROUTER_API_KEY environment variable.",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const data = await req.json();

    // Validate request data
    if (!data || typeof data !== "object") {
      return new NextResponse(
        JSON.stringify({ error: "Invalid request data format" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Handle both array and object formats
    let messages;
    if (Array.isArray(data)) {
      if (data.some((item) => !item.role || !item.content)) {
        return new NextResponse(
          JSON.stringify({ error: "Invalid message format in array" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
      messages = [{ role: "user", content: systemPrompt }, ...data];
    } else {
      // Handle single object format
      messages = [
        { role: "user", content: systemPrompt },
        {
          role: "user",
          content: data.image || data.content || JSON.stringify(data),
        },
      ];
    }

    const completion = await openai.chat.completions.create({
      messages,
      model: "meta-llama/llama-3.1-8b-instruct:free",
      stream: true,
    });

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              const text = encoder.encode(content);
              controller.enqueue(text);
            }
          }
        } catch (err) {
          console.error("Stream error:", err);
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new NextResponse(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    console.error("Error handling request:", error);
    return new NextResponse(
      JSON.stringify({
        error: "Internal server error",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
