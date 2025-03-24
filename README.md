# 🗣️ Google TTS 工具（Next.js + App Router + DaisyUI）

這是一個使用 **Google Text-to-Speech API** 製作的語音朗讀工具，支援中英文語音、人聲選擇、語速與語調調整，並可播放或下載語音。

## 🔧 使用技術

- [x] **Next.js (App Router)**
- [x] **TypeScript**
- [x] **Tailwind CSS + DaisyUI**
- [x] **Google Cloud Text-to-Speech API**

---

## 🚀 功能說明

- ✅ 支援輸入任意文字進行朗讀
- ✅ 自動從 Google API 撈取可用語言與人聲清單
- ✅ 語言限定為中英文（含台灣中文、大陸中文、粵語、美式/英式英文）
- ✅ 顯示語言名稱
- ✅ 可選擇人聲（Voice Name + 性別）
- ✅ 語速與語調支援 **輸入數值** 與 **滑桿調整**
- ✅ 可選擇播放或下載 MP3 音檔
- ✅ 限制輸入不得超過 5000 bytes，避免 API 拋錯

---

## 📁 專案結構（重點）

```
/app
  /tts/page.tsx           前端 UI 頁面（語音輸入、選項與播放）
  /api/tts/route.ts       TTS API，呼叫 Google TTS 並回傳音訊
  /api/tts/voices/route.ts 撈取所有可用語音選項
```

---

## 🛠️ 使用說明

### 1. 安裝相依套件
```bash
yarn install
```

### 2. 放入 Google TTS 金鑰
請將你從 Google Cloud Console 下載的 `JSON 金鑰檔案` 放到專案根目錄，檔名必須為：

```
text-to-speech.json
```

> ⚠️ 此檔案已加入 `.gitignore`，不會被加入版本控制。
> 若要部署至 Vercel，請改用「環境變數」方式設定認證，並小心控管使用量以避免產生費用。

### 3. 啟動本地開發伺服器
```bash
yarn dev
```
開啟 `http://localhost:3000` 即可開始使用。

---

## 🌐 Google TTS API 使用說明
請參考： https://cloud.google.com/text-to-speech/docs

- 若需更多語言與語音，可自行調整 `allowedLanguages` 陣列與語言名稱對應表

---

## 📄 License
本專案僅供學習與測試用途，請勿直接公開部署供他人大量使用（可能產生 API 費用）。