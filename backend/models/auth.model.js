import bcrypt from 'bcrypt';
import db from '../config/db.js';

class Login {
    #pwd="";
    constructor(puser, ppwd) {
        this.user = puser;
        this.#pwd=ppwd;
    }

    async authenticate () {
        try {
            const query = "SELECT EMAIL, PASSWORD FROM USERS WHERE EMAIL = ?";
            const result = await db.query(query, [this.user]);
            const match = await bcrypt.compare(this.#pwd, result[0].PASSWORD); 
            if (match) {
                return { success: true, message: 'Login exitoso', user: result[0].EMAIL };
            } else {
                return { success: false, message: 'Contraseña incorrecta' };
            }
          
        } catch (error) {
            return { success: false, message: 'Error en autenticación', error };
        }
    }
}

export default Login;