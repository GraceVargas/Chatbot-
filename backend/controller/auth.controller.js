import { generateToken } from "../utils/jwt.js";

export async function login(req, res) {
    const { email, password } = req.body;

    const user = { id:1, email };

    if (email === defaultUser.email && password === defaultUser.password) {
        const token = generateToken(user);
        res.json({ token })
    } else {
        res.sendStatus(401).json("Usuario no autorizado");
    }
}

class Login {
  #pwd="";
  constructor(puser, ppwd) {
    this.user = puser;
    this.#pwd=ppwd;
  }

    async autenticar() {
        console.log("ingreso a autenticar");
        const conn = await lib_c.pool.getConnection();
        const pwd_hash=await bcrypt.hash(this.#pwd, 10);
        console.log("hash de pwd: "+this.#pwd+":"+pwd_hash);


        try {
        const rows = await conn.execute(
            'SELECT nombre_usuario, pwd_usuario FROM usuarios WHERE nombre_usuario = ?',
            [this.user]
        );

        /*
            CREATE TABLE usuarios (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre_usuario VARCHAR(255) NOT NULL,
            pwd_usuario VARCHAR(255) NOT NULL -- almacenada con bcrypt
            );
        */

        if (rows.length === 0) {
            console.log("usuario no encontrado");
            return { success: false, message: 'Usuario no encontrado' };
        }

        const user = rows[0].nombre_usuario, pwd=rows[0].pwd_usuario;

        

        const match = await bcrypt.compare(this.#pwd, pwd);
        console.log(match);

        if (match) {
            console.log("usuario encontrado!");
            return { success: true, message: 'Login exitoso', user: user.nombre_usuario };
        } else {
            return { success: false, message: 'Contraseña incorrecta' };
        }
        } catch (error) {
        return { success: false, message: 'Error en autenticación', error };
        } finally {
        await conn.release();
        }
  }
}