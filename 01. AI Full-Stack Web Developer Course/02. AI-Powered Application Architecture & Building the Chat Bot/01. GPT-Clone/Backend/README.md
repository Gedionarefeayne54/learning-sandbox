# My Notes: ChatGPT Clone API 🧠

*A "do I actually get this?" breakdown of the two chat endpoints.*

---

## The Big Picture

There are only **2 endpoints**, and they split the work cleanly:

- **`GET`** → *"Show me what was already said."* (just reads the DB)
- **`POST`** → *"Here's a new question, go handle the whole turn."* (writes + calls AI + writes again)

Think of `GET` as opening a book to where you left off, and `POST` as writing the next page **and** getting the reply written back, in one motion.

---

## GET /api/chat/conversations — "Load history"

**What I understand:**
- It's read-only. No AI call happens here at all.
- It grabs the **last 100 messages**, but the DB naturally returns them *newest first* (`ORDER BY id DESC`).
- Since chat UIs read top-to-bottom (oldest → newest), the backend **flips the array** before sending it.
- Field names get "prettied up" for the frontend: `token_count` → `tokenCount`, `created_at` → `createdAt`.

**The "aha" moment:** the reversal step. It's easy to forget that "give me the latest 100" and "give me them in reading order" are two different problems — you need `DESC` + `LIMIT` to get the *right* rows, then a reverse to get the *right order*.

---

## POST /api/chat/conversations — "Have a turn"

This is the meaty one. My mental model, in plain steps:

```
question in
   ↓
validate (not empty, not too long)
   ↓
grab last 5 messages (for AI memory)
   ↓
save the user's question to DB
   ↓
send [last 5] + [new question] to the AI
   ↓
get answer back
   ↓
save the AI's answer to DB
   ↓
return both saved rows
```

**Three things I want to remember:**

1. **It's not idempotent.** Same question sent twice = two separate rows, twice. No deduplication happening anywhere.
2. **The order of operations matters.** The "last 5" history is fetched *before* the new question is inserted — so the AI never sees its own not-yet-saved question in that history block. It gets `[5 old messages] + [1 new question]` sent explicitly, not pulled fresh from the DB after insert.
3. **Two different memory sizes exist**, and they serve totally different purposes:

   | What | How many rows | Why |
   |---|---|---|
   | Chat window (GET) | 100 | so a human can scroll back |
   | AI's short-term memory (POST) | 5 | so the model has *some* context without blowing up cost/latency |

   Easy to mix these up if you're skimming — they sound similar but solve different problems.

---

## The AI's Personality Is Server-Side, Not Frontend-Side

Small but important detail: the system prompt (stay on programming topics, refuse harmful code, use Markdown/code blocks) lives on the **backend**. The doc is explicit that the frontend shouldn't be trusted to enforce this — which makes sense, since anyone can bypass frontend code with a raw API call (Postman, curl, whatever). The safety/personality rules only mean something if they're unavoidable.

---

## Errors — Grouped by "Whose Fault Is It?"

**My fault (400 — bad input):**
- Missing or empty `question`
- `question` over 65,535 characters

**Server's fault (500 — something broke):**
- No AI API key configured
- AI gave back an empty answer
- Generic catch-all failure

Simple rule of thumb: **400 = fix your request, 500 = not your problem to fix.**

---

## One Sentence Summary

> `GET` shows you the past, `POST` writes the present — and the AI only ever sees a 5-message sliding window, no matter how long the full conversation gets.
