import express from 'express';
import { register } from '../controller/register.controller.js'
import { login, logout } from '../controller/auth.controller.js'

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

export default router;