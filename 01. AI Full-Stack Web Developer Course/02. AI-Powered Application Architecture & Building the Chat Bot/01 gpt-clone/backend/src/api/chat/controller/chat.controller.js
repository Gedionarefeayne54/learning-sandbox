import { GoogleGenAI } from '@google/genai';

import db from '../../../../db/db.config.js';

const MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
const SYSTEM_PROMPT =
  'You are a helpful assistant in a ChatGPT-style clone app. Keep answers clear and concise.';

// Only created once the key actually exists — created lazily inside the
// controller so a missing key gives a clean error instead of crashing on startup.
let ai;
function getClient() {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return ai;
}

// Very rough token estimate (~4 characters per token) used only as a fallback
// when the API doesn't return real usage numbers. Good enough for the
// `token_count` column — not meant to be exact.
function estimateTokens(text) {
  return Math.max(1, Math.ceil(text.length / 4));
}

// GET /api/chat/conversations — load the most recent messages, oldest first
export async function getConversationsController(req, res) {
  try {
    const [rows] = await db.query(
      'SELECT id, role, content, token_count, created_at FROM conversations ORDER BY id DESC LIMIT 100'
    );

    // rows come back newest-first (for an efficient LIMIT), reverse them so the
    // frontend can render top-to-bottom in the order the conversation happened
    res.json({ conversations: rows.reverse() });
  } catch (error) {
    console.error('getConversationsController error:', error.message);
    res.status(500).json({ error: 'Failed to load conversation history.' });
  }
}

// POST /api/chat/conversations — save the user's message, ask the AI, save + return the reply
export async function createConversationController(req, res) {
  const { content } = req.body;

  if (!content || typeof content !== 'string' || !content.trim()) {
    return res.status(400).json({ error: '"content" is required and must be a non-empty string.' });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({
      error: 'Server is missing GEMINI_API_KEY. Add it to backend/.env to enable AI replies.',
    });
  }

  const connection = await db.getConnection();

  try {
    // 1. Save the user's message
    const [userInsert] = await connection.query(
      'INSERT INTO conversations (role, content, token_count) VALUES (?, ?, ?)',
      ['user', content, estimateTokens(content)]
    );

    // 2. Pull recent history for context (last 20 messages, oldest first)
    const [historyRows] = await connection.query(
      'SELECT role, content FROM conversations ORDER BY id DESC LIMIT 20'
    );
    const history = historyRows.reverse();

    // Gemini expects role "model" for the assistant, not "assistant"
    const contents = history.map((row) => ({
      role: row.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: row.content }],
    }));

    // 3. Ask the AI, sending the conversation so far as context
    const aiResponse = await getClient().models.generateContent({
      model: MODEL,
      contents,
      config: { systemInstruction: SYSTEM_PROMPT },
    });

    const replyText = aiResponse.text?.trim();
    const usedTokens =
      aiResponse.usageMetadata?.candidatesTokenCount ?? estimateTokens(replyText || '');

    if (!replyText) {
      throw new Error('Gemini API returned an empty response.');
    }

    // 4. Save the assistant's reply
    const [assistantInsert] = await connection.query(
      'INSERT INTO conversations (role, content, token_count) VALUES (?, ?, ?)',
      ['assistant', replyText, usedTokens]
    );

    // 5. Return both messages so the frontend can append them straight to the chat
    res.status(201).json({
      userMessage: { id: userInsert.insertId, role: 'user', content },
      assistantMessage: { id: assistantInsert.insertId, role: 'assistant', content: replyText },
    });
  } catch (error) {
    console.error('createConversationController error:', error.message);
    res.status(500).json({ error: 'Failed to get a response from the AI. Please try again.' });
  } finally {
    connection.release();
  }
}
