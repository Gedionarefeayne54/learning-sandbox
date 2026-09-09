# 🤖 GPT-Clone — Backend

A lean Express + MySQL backend that powers a ChatGPT-style chat app, using **Google Gemini** as the brain 🧠 behind the replies!.

---

## 🏗️ What's Actually Built Here

### 🚪 The Server (`index.js`)
- Spins up an **Express 5** app and immediately checks it can talk to MySQL *before* accepting traffic — no half-broken server pretending to be ready 💪
- `express.json()` is wired in so `POST` bodies actually get parsed (a classic gotcha, already solved ✅)
- `cors()` enabled so a separate frontend (hello, Vite on `:5173` 👋) can call the API without a fight
- A friendly `GET /` health check: *"GPT-Clone backend is running."* 🩺
- Configurable `PORT` via `.env`, defaulting to `3888`

### 🗄️ Database Layer (`db/`)
- `db.config.js` sets up a **MySQL connection pool** via `mysql2/promise` — fast, reusable connections instead of opening a new one per request ⚡
- `schema.sql` defines a single, no-nonsense `conversations` table:
  - `role` → `user` or `assistant` 🗣️
  - `content` → the actual message text 💬
  - `token_count` → tracks usage per message 📊
  - `created_at` → auto-timestamped 🕒

### 🧭 Routing (`src/api/chat/`)
- `main.routes.js` mounts everything under `/api/chat` — clean namespacing 🧩
- `chat.route.js` exposes exactly two endpoints:
  - `GET /api/chat/conversations` → load chat history 📜
  - `POST /api/chat/conversations` → send a message, get an AI reply back 🚀

### 🧠 The Brains (`chat.controller.js`)
This is where the magic happens ✨:
1. **Saves your message** to MySQL the moment it arrives 💾
2. **Pulls the last 20 messages** as context, so Gemini remembers the conversation instead of having amnesia every request 🧵
3. **Talks to Gemini** (`gemini-2.5-flash` by default) with a lightweight system prompt keeping it concise and helpful 🎯
4. **Estimates token usage** (~4 chars/token) as a fallback when the API doesn't hand back real numbers 🧮
5. **Saves the AI's reply** right back to the database 📥
6. Returns both messages in one tidy response so the frontend can just append them to the UI — no extra round trip needed 🎁

Bonus: the Gemini client is created **lazily**, so a missing `GEMINI_API_KEY` fails gracefully with a clear error instead of crashing the whole server on boot 🛡️

### 🧰 Utilities(`src/api/middleware/utils/asyncHandler.js`)
A small wrapper that catches errors from async route handlers and forwards them to Express's error handling — no more unhandled promise rejections silently taking down the server 🕸️

---

## 📦 Dependencies at a Glance

| Package | Job |
|---|---|
| `express` | Web framework 🌐 |
| `mysql2` | MySQL driver + connection pooling 🐬 |
| `@google/genai` | Talks to Gemini 🔮 |
| `cors` | Lets the frontend in 🚧 |
| `dotenv` | Loads secrets from `.env` 🔐 |

---

## 🚦 Status

✅ Server boots and verifies DB connection first
✅ Full send-message → save → ask AI → save reply → respond loop works
✅ Conversation history endpoint for reloading chat
✅ Graceful error handling for missing API key & DB issues
🔲 No auth / multi-user support yet
🔲 No streaming responses (yet 👀)

A solid, working foundation for a ChatGPT clone backend — small, readable, and ready to build on. 🚀
