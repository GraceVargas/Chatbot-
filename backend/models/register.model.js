import bcrypt from 'bcrypt';
import db from '../config/db.js';

class Register {
    #pwd = "";
    
    constructor(puser, ppwd) {
        this.user = puser;
        this.#pwd=ppwd;
    }
    async insert_user () {
        let rta = "";
        const pwd_hash = await bcrypt.hash(this.#pwd, 10);
        const query = "INSERT INTO USERS (EMAIL, PASSWORD) VALUES (?, ?)"
        await db.query(query, [this.user, pwd_hash]);
    }
}

export default Register;