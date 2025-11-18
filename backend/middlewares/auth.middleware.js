import 'dotenv/config';
import { verifyToken } from '../utils/jwt.js';

export const authRequired = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.sendStatus(401);
    const verificationResult = verifyToken(token);
    if (!verificationResult.valid) return res.sendStatus(403);

    req.user = verificationResult.decoded;
    next(); 
}
