## 💬 ChatGPT Clone API

A lightweight backend powering a ChatGPT-style chat experience — built to store conversations, talk to an AI provider, and serve up chat history like a pro. Think of it as the engine room behind the chat window: every question, every answer, every token accounted for.

### ✨ What it does

This service handles the full lifecycle of a chat turn:

- 📜 **Fetches chat history** — pulls your last 100 messages from the database and hands them back to the frontend in perfect chronological order, ready to render the moment the page loads.
- 🧠 **Generates AI responses** — takes a user's question, saves it, sends it (with a bit of recent context) to the AI provider, and stores the reply right alongside it.
- 🛡️ **Keeps things safe server-side** — the assistant is scoped to programming, software engineering, and IT topics, with guardrails baked into the backend (not the frontend) so nothing sneaky slips through.
- 🔁 **Never overwrites, always appends** — every request creates fresh rows, so your chat history stays a true, growing record. Ask the same question twice, get two honest entries — no silent overwrites, no lost history.
- 🧮 **Tracks token usage** — every assistant reply is stored with its token count, so you always know exactly what a conversation cost.

### 🚀 Endpoints

- `GET /api/chat/conversations` — Load saved chat messages. Perfect for rebuilding chat history on page load or refresh. No params, no auth, no fuss.
- `POST /api/chat/conversations` — Send a question, get an AI-generated answer, and save both. This is where the real work happens: validation, history lookup, the AI call, and two new database rows — all in one round trip.

### 🧠 How a chat turn actually works

1. Your question comes in and gets validated (no empty strings, nothing over 65,535 characters).
2. The backend grabs the last 5 messages for context — just enough for the AI to stay relevant without dragging in your entire chat history.
3. Your question is saved to the database *first*.
4. The AI provider gets the recent context + your new question, guided by a system instruction that keeps it locked onto programming and IT topics.
5. The AI's answer is saved right after, complete with token usage.
6. Both rows — your question and the AI's answer — are sent back to the frontend together.

Simple on the surface, but every step is deliberate: validate early, save often, keep the AI's context window small and cheap.

### 🧰 Tech Highlights

- Clean, consistent success/error response shapes across every endpoint (`tokenCount`, `createdAt`, and friends — always camelCase, always predictable)
- Input validation on every request, with clear, specific error messages for missing, empty, or oversized input
- Smart context windowing — only the latest 5 messages go to the AI, keeping responses fast and API costs low
- Graceful failure handling — missing API keys, empty AI responses, and generic server hiccups all return clear, structured errors instead of silent crashes
- Built for a real frontend — response shapes are designed to drop straight into a chat UI with zero extra transformation

### 🛠️ Design Notes

- **History vs. context aren't the same thing.** The chat window can show up to 100 messages, but the AI only ever "sees" the last 5. This keeps every AI call fast and affordable — just know the assistant won't recall anything further back than that.
- **Safety lives on the server, not the client.** The frontend never decides what topics are allowed — every guardrail is enforced where it can't be bypassed.
- **Nothing is idempotent by design.** This API mirrors how a real chat works: every message is a new moment in the conversation, never a silent edit.

---

Happy coding! 😄
