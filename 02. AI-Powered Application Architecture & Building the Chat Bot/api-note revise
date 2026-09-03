# README Notes: ChatGPT Clone API 📝

*My personal breakdown — what each endpoint does and why it's built this way.*

---

## Quick Mental Model

| Endpoint | Role | Touches AI? | Touches DB? |
|---|---|---|---|
| `GET /api/chat/conversations` | Load history | ❌ No | ✅ Read only |
| `POST /api/chat/conversations` | Have a turn | ✅ Yes | ✅ Read + Write |

If `GET` is a mirror, `POST` is a conversation partner.

---

## GET — Reading the Past

1. Pulls the **latest 100 rows**, newest first (`ORDER BY id DESC LIMIT 100`).
2. **Reverses** the array so the frontend gets oldest → newest — the order humans actually read in.
3. Renames snake_case DB fields to camelCase for the API (`token_count` → `tokenCount`).
4. No messages yet? Still a clean `200` with `"conversations": []` — empty isn't an error.

👉 **Key insight:** fetching the "right rows" and fetching them in the "right order" are two separate concerns. `DESC + LIMIT` solves the first; the reverse solves the second.

---

## POST — Writing the Present

The full lifecycle of *one* chat turn, condensed:

```
validate question → grab last 5 messages for context → save user's message
   → send [context + question] to AI → save AI's answer → return both rows
```

**Three details worth remembering:**

- ⚠️ **Not idempotent.** Send the same question twice → two separate user rows and two separate AI rows. No dedup logic anywhere.
- ⏱️ **Order of operations:** the "last 5" context is pulled *before* the new question is saved to the DB — so it's sent to the AI explicitly as `[5 old] + [1 new]`, never re-queried after the insert.
- 🔢 **Two different memory windows exist**, and mixing them up is an easy mistake:
  - `GET` shows up to **100** messages (for the human, scrolling the UI)
  - `POST` only feeds the AI the last **5** (for cost/latency reasons)

---

## Why the Assistant's Rules Live on the Backend

The system prompt — stay on programming topics, use code blocks, refuse harmful code — is enforced **server-side**, not in the frontend. Makes sense: anyone can skip the UI and hit the API directly (Postman, curl, etc.), so any rule that matters has to live where it can't be bypassed.

---

## Errors, Sorted by Blame

| Who's responsible | Status | When |
|---|---|---|
| Me (bad request) | `400` | Missing/empty `question`, or over 65,535 chars |
| Server | `500` | Missing AI API key, empty AI response, or generic failure |

---

## TL;DR

> `GET` remembers everything (up to 100); `POST` only *thinks about* the last 5 — but saves every single turn permanently, duplicates included.
