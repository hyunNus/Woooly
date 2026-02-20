import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: Request) {
  try {
    const { messages, systemPrompt } = await request.json();

    console.log("📨 [Server] runpod vllm ngrok 서버로 요청 전송 중...");

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    console.log("✅ [Server] 응답 수신 성공!");
    const aiMsg = completion.choices[0].message.content;
    return NextResponse.json({ role: "assistant", content: aiMsg });

  } catch (error: any) {
    console.error("🔥 [API Error]", error);
    return NextResponse.json(
      { error: "서버 연결 실패: " + (error.message || "Unknown error") },
      { status: 500 }
    );
  }
}