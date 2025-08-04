import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY,
});

const systemPrompt = "What's in the image";

// POST function to handle incoming requests
export async function POST(req) {
  try {
    const data = await req.json();

    // Ensure data is an array of messages or an object with appropriate structure
    if (
      !Array.isArray(data) ||
      data.some((item) => !item.role || !item.content)
    ) {
      return new NextResponse("Invalid request data", { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: systemPrompt }, ...data],
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
    return new NextResponse("Internal server error", { status: 500 });
  }
}
