import express from 'express';
import { askChat } from '../controller/api.controller.js';

const router = express.Router();

router.post("/chat", askChat);

export default router;