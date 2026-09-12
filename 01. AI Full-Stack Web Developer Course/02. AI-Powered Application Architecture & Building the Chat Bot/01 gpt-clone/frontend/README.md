# 💬 GPT-Clone — Frontend

A ChatGPT-styled chat interface built with **React + Vite**. 🚀

---

## 🧱 Tech Stack

| Tool | Purpose |
|---|---|
| ⚛️ **React 19** | UI components & state |
| ⚡ **Vite** | Dev server & build tool |
| 🌐 **Axios** | Talking to the backend API |
| 📝 **React Markdown** | Renders the AI's replies as formatted markdown |
| 🎨 **React Syntax Highlighter** | Colors code blocks inside AI replies |
| 🎯 **Lucide React** | Icon set (user, bot, send button, sidebar icons, etc.) |

---

## 📁 Project Structure

```
src/
├── App.jsx                     🧠 Main app — holds chat state & talks to the backend
├── App.css                     🎨 Global layout styling
└── components/
    ├── Sidebar/                📚 Left nav (New chat, Search, Images, Apps, etc.)
    ├── ChatHeader/              🏷️ Top bar with the "ChatGPT" title
    ├── MessageList/             📜 Scrolling list of messages + empty state + loading dots
    ├── ChatMessage/             💬 A single message bubble (user or AI, with avatar)
    └── ChatInput/               ⌨️ The text box + send button at the bottom
```

---

## ⚙️ What the Code Does

**`App.jsx`** is the brain of the app:
- 📥 On page load, fetches saved conversation history from `GET /api/chat/conversations` and displays it
- ✍️ When you send a message, it's added to the chat immediately (so the UI feels instant) while the real request goes out
- 📤 Sends your message to `POST /api/chat/conversations`
- 🤖 Once the backend replies, swaps the temporary message for the real saved user message + the AI's reply
- ⏳ Tracks an `isLoading` flag to show a typing indicator while waiting
- ⚠️ If the request fails, drops an error bubble into the chat instead of breaking the page
- 📜 Auto-scrolls to the bottom whenever new messages arrive

**`components/`** break the UI into focused pieces:
- **Sidebar** — static nav links styled like ChatGPT's sidebar (not wired to any functionality yet, just visual)
- **ChatHeader** — the top title bar
- **MessageList** — loops over all messages and renders a `ChatMessage` for each one, shows "What are you working on?" when empty, shows animated loading dots while waiting on a reply
- **ChatMessage** — renders one message: user messages as plain text, AI messages run through `ReactMarkdown` (so lists, bold text, code blocks, etc. render properly) with syntax-highlighted code
- **ChatInput** — controlled text input with a send button that only appears once you've typed something; disabled while a reply is loading

---

## 🔮 What It's Meant To Do (End-to-End)

1. You type a message and hit send
2. It shows up instantly on your screen
3. It's sent to the backend, saved to the database, and forwarded to **Gemini**
4. Gemini's reply comes back, gets saved too, and appears in the chat as formatted markdown
5. Reload the page → your whole conversation history is still there, loaded from the database



## 🛠️ What I Worked On

This frontend started life completely disconnected from its backend — two separate zip files, built independently, that had never actually talked to each other. Here's the journey to get them wired up:

- 🔌 **Fixed the API connection** — the frontend was calling the wrong port (`3777`) while the backend was listening on `3888`. Pointed it to the right address.
- 🧩 **Matched the data contract** — the frontend and backend disagreed on the shape of requests/responses (`question` vs `content`, wrapped `success/data` vs flat JSON). Rewrote `App.jsx` so both sides speak the same language.
- 🩹 **Fixed error handling** — corrected how failed requests are parsed so real backend error messages actually show up in the chat instead of a silent failure.
- 📁 **Solved a nasty Windows path issue** — `npm install` kept silently corrupting the `vite` package because the project folder was nested many layers deep with long names (and, at first, synced through OneDrive). Moved everything to a short path (`C:\gpt-clone\...`) to fix it for good.
- ✅ **Got both servers running side by side** — backend on `:3888` connected to MySQL, frontend on Vite's dev server — and confirmed real messages flow between them.

---

## ⚙️ What It Does

- 💬 Clean, ChatGPT-style chat UI (message bubbles, avatars, markdown + code syntax highlighting)
- 📜 Loads previous conversation history from the database on page load
- ✍️ Send a message → it's saved to MySQL → sent to **Gemini** → the AI's reply is saved and shown
- ⏳ Shows a typing/loading indicator while waiting on the AI
- 🛡️ Gracefully shows an error bubble in the chat if the backend or AI call fails, instead of crashing

---

## 🚦 Status

| Piece | Status |
|---|---|
| Frontend dev server | ✅ Running |
| Backend + MySQL | ✅ Running |
| Frontend ↔ Backend connection | ✅ Connected |
| AI replies (Gemini) | 🔧 Being debugged — checking the API key |

---

## ▶️ Running It

```bash
# Terminal 1 — backend
cd backend
npm install
npm run dev      # → http://localhost:3888

# Terminal 2 — frontend
cd frontend
npm install
npm run dev      # → http://localhost:5173
```

Open the frontend URL in your browser, type a message, and hit send. 🎉

---

## 🚧 Not Yet Wired Up

- The **Sidebar** links (New chat, Search chats, Images, Apps, Deep research, Codex, Projects) are visual only — no click handlers yet
- No multiple/separate conversation threads — it's currently one continuous history
