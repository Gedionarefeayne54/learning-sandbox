import express from 'express';

import chatRouter from './chat.route.js';

const mainRouter = express.Router();

// /api/chat
mainRouter.use('/chat', chatRouter);

export default mainRouter;
