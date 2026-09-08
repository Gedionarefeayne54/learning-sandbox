# GPT-Clone Backend — Completed

This is your `gpt-clone/backend` project, finished and tested. Everything below either
fixes a bug that was already there or fills in a piece that was left as a stub.

## What was wrong / missing

- `index.js` never called `app.use(express.json())`, so `req.body` was always
  `undefined` on POST requests — fixed.
- `chat.route.js` imported `./controller/chat.controller` without the `.js`
  extension, which Node's ES modules require — fixed.
- `main.routes.js` imported `chat` from `chat.route.js` but tried to use a
  variable called `chatRouter` that was never defined — fixed.
- `chat.controller.js` exported `createConversationcontroller` /
  `getConversationcontroller` (lowercase "c"), but the route file imported
  `createConversationController` / `getConversationsController` (capital
  "C", plural) — the names didn't match, so the imports were `undefined` —
  fixed and renamed consistently.
- The routes were mounted at `/conversation` (singular), but your own
  `API-Notes.md` documents `/api/chat/conversations` (plural) — I matched
  the routes to your documented spec.
- The controllers were empty stubs (`res.send('create conversation')`) —
  both are now fully implemented (see below).
- `index.js` had a duplicate, broken route (`app.post("api/chat/conversation", ...)`
  — missing leading slash, and redundant since the real route already
  handles this) — removed.
- No CORS handling — added, so a separate frontend (e.g. Vite on a
  different port) can call this API.

## What was added

- **Real AI integration.** `POST /api/chat/conversations` now saves the
  user's message, sends the recent conversation history to the Gemini API
  (via `@google/genai`), saves the reply, and returns both messages.
- **`GET /api/chat/conversations`** now actually queries the database (last
  100 messages, returned oldest-first) instead of a placeholder string.
- **Token tracking.** Each row's `token_count` column is now filled in — a
  rough estimate for user messages, and the real usage number from Gemini
  for assistant replies.
- **`src/api/middleware/utils/asyncHandler.js`** — a small helper for
  wrapping async route handlers (not wired in yet, since your two
  controllers already handle their own try/catch, but it's there for when
  you add more routes).
- **`cors`** and **`@google/genai`** added as dependencies.
- **`.env`** now has `GEMINI_API_KEY` and `GEMINI_MODEL` placeholders.

## Setup

1. **Install dependencies** (not included in this zip — `node_modules` was
   left out to keep the download small):
   ```bash
   cd backend
   npm install
   ```

2. **Add your Gemini key.** Open `.env` and fill in:
   ```
   GEMINI_API_KEY=your key here
   ```
   Get one at https://aistudio.google.com/apikey — without this, the
   server runs fine and `GET` works, but `POST` will return a clear error
   telling you the key is missing.

3. **Make sure MySQL is running** and matches the credentials in `.env`
   (defaults: user `gpt-admin`, password `123456`, database `gpt-clone`).
   Create the database and load the schema:
   ```bash
   mysql -u root -e "CREATE DATABASE \`gpt-clone\`;"
   mysql -u root gpt-clone < db/schema.sql
   ```

4. **Run it:**
   ```bash
   npm start
   ```
   You should see:
   ```
   Connected to MySQL database.
   Server is running on http://localhost:3888
   ```

## Endpoints

| Method | Path                        | Body                     | Does |
|--------|------------------------------|--------------------------|------|
| GET    | `/api/chat/conversations`    | —                        | Returns the last 100 messages, oldest first |
| POST   | `/api/chat/conversations`    | `{ "content": "..." }`   | Saves your message, gets an AI reply, saves + returns both |

I tested this end-to-end (fresh MySQL database, schema loaded, server started,
both endpoints hit with curl) to confirm the wiring and validation work. The
only part I couldn't test on my end is the actual Gemini call, since that
needs your personal API key — everything up to that call (DB writes, request
validation, error handling) is confirmed working.
