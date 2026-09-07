# 💬 ChatGPT Clone API ⚡

> **The high-performance engine behind your next-gen conversational UI.** 🚀

A lightweight, rock-solid backend powering a seamless ChatGPT-style experience. Built to manage long-term conversation storage, interface directly with modern LLM providers, and deliver lightning-fast history retrieval.

Every prompt sent, every response stream handled, every token accounted for—with zero fluff. ⚙️

---

### ✨ Core Capabilities

* 📜 **Instant History Retrieval:** Pulls up to the last 100 messages from storage, chronologically sorted and ready to render instantly on page load.
* 🧠 **Smart Contextual AI:** Ingests user input, saves it atomically, injects relevant conversation context, and streams back intelligent responses.
* 🛡️ **Server-Side Guardrails:** Built-in safety instructions enforce a tech-focused persona (Programming, Software Engineering, & IT) safely behind the API boundary.
* 🔁 **Append-Only Architecture:** Maintains absolute data integrity—every request creates a new record. No overwritten rows, no lost context, no silent edits.
* 🧮 **Granular Token Analytics:** Tracks precise prompt and completion token counts per turn, keeping API spend completely transparent.
* ⚡ **Resilient Fault Isolation:** Automatically intercepts upstream provider outages, rate limits, and missing keys to surface clean, actionable payloads to the client.

---

### 🚀 API Reference

#### `GET /api/chat/conversations`

> **Fetch Saved History** 📥
> Loads historical chat turns to reconstruct the UI on initial load or browser refresh.

* **Params:** None
* **Auth:** Optional / Unauthenticated
* **Response:** Array of message objects ordered by `createdAt` ASC.

#### `POST /api/chat/conversations`

> **Execute Chat Turn** 📤
> Validates user input, attaches historical context, triggers the AI engine, and persists both turns in a unified transaction.

* **Payload:** `{ "message": "How do I optimize a Postgres query?" }`
* **Response:** Pair of newly created message objects (User Input + AI Response) including token metrics.

---

### 🧠 Behind the Scenes: Anatomy of a Chat Turn

```
[ User Input ] ➡️ [ Input Validation ] ➡️ [ Fetch Last 5 Context Messages ]
                                                      │
[ Client Output ] ⬅️ [ Save AI Reply + Tokens ] ⬅️ [ Stream / Fetch LLM Response ]

```

1. **Validation & Sanitization:** Filters empty payloads and enforces a hard **65,535-character limit** 🛑.
2. **Context Assembly:** Fetches only the last **5 messages** 🔍—keeping latency minimal and costs ultra-low.
3. **Optimistic Storage:** Persists the user's prompt to the database *before* hitting the external AI model 💾.
4. **Targeted Inference:** Sends prompt + context to the model wrapped in strict domain-focused system prompts 🤖.
5. **Analytics & Persistence:** Stores the assistant's completion alongside exact **token consumption stats** 📊.
6. **Unified Delivery:** Returns both created records to the client in a single HTTP response cycle 📦.

---

### 🧰 Technical Specifications & Architecture Highlights

| Feature | Design Implementation |
| --- | --- |
| **Response Schema** | Universal JSON format using standard `camelCase` identifiers (`tokenCount`, `createdAt`, `messageId`). |
| **Validation Layer** | Strict type-checking with explicit error messages (`400 Bad Request`) on invalid inputs. |
| **Context Windowing** | Capped at $N=5$ recent messages to eliminate unnecessary token inflation on long threads. |
| **Error Handling** | Graceful fallback handlers for upstream failures (`502 Bad Gateway` / `503 Service Unavailable`). |
| **Frontend Ready** | Schema designed for direct consumption by React, Vue, or Svelte chat components out of the box. |

---

### 🛠️ Key Architectural Decisions

* **History $\neq$ Context Window:** The UI displays up to 100 historical messages to the user, but only the most recent 5 are sent to the AI. This keeps operations sub-second and cost-effective without frustrating the user.
* **Security at the Perimeter:** System prompts and domain safety controls live exclusively on the backend, making them completely immune to client-side tampering.
* **Append-Only Persistence:** Mirroring true conversation flow, duplicate prompts generate new unique records—ensuring complete compliance and auditing accuracy.

---

Happy coding! 💻✨ 
