import { NextRequest, NextResponse } from "next/server";
import { TextToSpeechClient } from "@google-cloud/text-to-speech";
import path from "path";

const client = new TextToSpeechClient({
  keyFilename: path.join(process.cwd(), "text-to-speech.json"),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { text, language, voice, speed, pitch } = body;

  if (!text || typeof text !== "string") {
    return NextResponse.json({ message: "Invalid input" }, { status: 400 });
  }

  try {
    const [response] = await client.synthesizeSpeech({
      input: { text },
      voice: { languageCode: language, name: voice },
      audioConfig: {
        audioEncoding: "MP3",
        speakingRate: speed ?? 1.0,
        pitch: pitch ?? 0,
      },
    });

    const headers = new Headers();
    headers.set("Content-Type", "audio/mpeg");

    return new NextResponse(response.audioContent as any, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("TTS Error:", error);
    return NextResponse.json({ message: "TTS failed" }, { status: 500 });
  }
}
