import Register from '../models/register.model.js';

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email y password son obligatorios" });
    }

    const reg = new Register(email, password);
    await reg.insert_user();

    return res.status(201).json({ message: "Usuario registrado correctamente" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno al Registrar" });
  }
};
