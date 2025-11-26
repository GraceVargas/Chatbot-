import Login from '../models/auth.model.js';
import { generateToken } from '../utils/jwt.js';


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email y password son obligatorios" });
    }
    
    const login = new Login(email, password);
    const response = await login.authenticate();
    if (response.success) {
        const token = generateToken(response.user);
        return res
            .cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
                maxAge: 3600000 
            })
            .status(200)
            .json({
                message: response.message,
                user: response.user,
            });
    } else {
        return res.status(401).json({ message: response.message, error: response.error });
    }
    

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno al loguearse" });
  }
};

export const logout = async(req, res) => {
    res.clearCookie("token");
    res.json({ message: "Sesión cerrada" });
}
