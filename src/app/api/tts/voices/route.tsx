import { NextResponse } from "next/server";
import { TextToSpeechClient } from "@google-cloud/text-to-speech";
import path from "path";

// 初始化 Google TTS 客戶端
const client = new TextToSpeechClient({
  keyFilename: path.join(process.cwd(), "text-to-speech.json"),
});

export async function GET() {
  try {
    const [result] = await client.listVoices({});
    return NextResponse.json(result.voices ?? []);
  } catch (error) {
    console.error("ListVoices error:", error);
    return NextResponse.json(
      { message: "Failed to get voices" },
      { status: 500 },
    );
  }
}
