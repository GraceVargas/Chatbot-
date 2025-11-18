import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import authRoute from './router/auth.routes.js';
import apiRoute from './router/api.routes.js';
import { authRequired } from './middlewares/auth.middleware.js';

const app = express();
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 3001;

app.use('/auth', authRoute);

app.use('/api', authRequired, apiRoute);

app.listen(port, () => {
    console.log(`Server running on PORT: ${port}`);
})