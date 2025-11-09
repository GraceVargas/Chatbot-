import express from 'express';
import 'dotenv/config';
import authRoute from './router/auth.route.js'

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.use('/auth', authRoute);

app.listen(port, () => {
    console.log(`Server running on PORT: ${port}`);
})