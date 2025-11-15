import Login from '../models/auth.model.js';


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email y password son obligatorios" });
    }
    
    const login = new Login(email, password);
    const response = await login.authenticate();
    if (response.success) {
        return res.status(200).json({ message: response.message, user: response.user });
    } else {
        return res.status(401).json({ message: response.message, error: response.error });
    }
    

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno al loguearse" });
  }
};
