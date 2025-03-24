"use client";

import { useEffect, useState } from "react";

type VoiceInfo = {
  languageCodes: string[];
  name: string;
  ssmlGender: string;
};

const languageNameMap: Record<string, string> = {
  "en-US": "英文（美國）",
  "en-GB": "英文（英國）",
  "cmn-CN": "中文（中國）",
  "cmn-TW": "中文（台灣）",
  "yue-HK": "粵語（香港）",
};

const allowedLanguages = ["en-US", "en-GB", "cmn-CN", "cmn-TW", "yue-HK"];

export default function TTSPage() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("en-US");
  const [voice, setVoice] = useState("");
  const [speed, setSpeed] = useState(1);
  const [pitch, setPitch] = useState(0);
  const [loading, setLoading] = useState(false);
  const [voices, setVoices] = useState<VoiceInfo[]>([]);

  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const res = await fetch("/api/tts/voices");
        const data = await res.json();
        const filtered = data.filter((v: VoiceInfo) =>
          v.languageCodes.some((code) => allowedLanguages.includes(code)),
        );
        setVoices(filtered);

        const defaultVoice = filtered.find((v) =>
          v.languageCodes.includes("en-US"),
        );
        if (defaultVoice) {
          setLanguage("en-US");
          setVoice(defaultVoice.name);
        }
      } catch (err) {
        console.error("Failed to load voices:", err);
      }
    };
    fetchVoices();
  }, []);

  const languageOptions = Array.from(
    new Set(
      voices.flatMap((v) =>
        v.languageCodes.filter((code) => allowedLanguages.includes(code)),
      ),
    ),
  ).sort();

  const voiceOptions = voices.filter((v) => v.languageCodes.includes(language));

  const handlePlay = async (download: boolean = false) => {
    if (!text) return;
    const byteLength = new TextEncoder().encode(text).length;
    if (byteLength > 4800) {
      alert("輸入過長（超過 5000 bytes 限制），請分段朗讀");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, language, voice, speed, pitch }),
      });

      if (!res.ok) {
        alert("播放失敗");
        return;
      }

      const audioBlob = await res.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      if (download) {
        const a = document.createElement("a");
        a.href = audioUrl;
        a.download = "tts.mp3";
        a.click();
      } else {
        const audio = new Audio(audioUrl);
        audio.play();
      }
    } catch (error) {
      console.error(error);
      alert("播放出錯");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="card w-full max-w-xl bg-base-200 shadow-xl">
        <div className="card-body space-y-4">
          <h2 className="card-title text-xl">🗣️ Google TTS 工具</h2>

          <textarea
            className="textarea textarea-bordered h-32 w-full"
            placeholder="請輸入要朗讀的文字"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>

          <div className="form-control">
            <label className="label">語言</label>
            <select
              className="select select-bordered"
              value={language}
              onChange={(e) => {
                const newLang = e.target.value;
                setLanguage(newLang);
                const defaultVoice = voices.find((v) =>
                  v.languageCodes.includes(newLang),
                );
                if (defaultVoice) setVoice(defaultVoice.name);
              }}
            >
              {languageOptions.map((langCode) => (
                <option key={langCode} value={langCode}>
                  {languageNameMap[langCode] ?? langCode}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label className="label">人聲</label>
            <select
              className="select select-bordered"
              value={voice}
              onChange={(e) => setVoice(e.target.value)}
            >
              {voiceOptions.map((v) => (
                <option key={v.name} value={v.name}>
                  {v.name} ({v.ssmlGender})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">語速：</label>
              <input
                type="number"
                min="0.25"
                max="2"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="input input-bordered mb-2"
              />
              <input
                type="range"
                min="0.25"
                max="2"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="range"
              />
            </div>
            <div className="form-control">
              <label className="label">語調：</label>
              <input
                type="number"
                min="-10"
                max="10"
                step="0.1"
                value={pitch}
                onChange={(e) => setPitch(parseFloat(e.target.value))}
                className="input input-bordered mb-2"
              />
              <input
                type="range"
                min="-10"
                max="10"
                step="0.1"
                value={pitch}
                onChange={(e) => setPitch(parseFloat(e.target.value))}
                className="range"
              />
            </div>
          </div>

          <div className="card-actions justify-end mt-4">
            <button
              className={`btn btn-secondary ${loading ? "loading" : ""}`}
              onClick={() => handlePlay(true)}
              disabled={loading}
            >
              下載語音
            </button>
            <button
              className={`btn btn-primary ${loading ? "loading" : ""}`}
              onClick={() => handlePlay(false)}
              disabled={loading}
            >
              播放語音
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
