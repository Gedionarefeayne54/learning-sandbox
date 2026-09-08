import express from 'express';

import {
  createConversationController,
  getConversationsController,
} from './controller/chat.controller.js';

const chatRouter = express.Router();

// GET /api/chat/conversations — load chat history
chatRouter.get('/conversations', getConversationsController);

// POST /api/chat/conversations — send a message, get the AI's reply
chatRouter.post('/conversations', createConversationController);

export default chatRouter;
