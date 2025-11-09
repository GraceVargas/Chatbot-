import mariadb from 'mariadb';
import 'dotenv/config';

class Database {
  constructor() {
    if (!Database.instance) {
      this.pool = mariadb.createPool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        connectionLimit: 5
      });

      Database.instance = this;
    }

    return Database.instance;
  }

  async query(sql, params = []) {
    let conn;
    try {
      conn = await this.pool.getConnection();
      const result = await conn.query(sql, params);
      return result;
    } catch (err) {
      console.error('DB error:', err);
      throw err;
    } finally {
      if (conn) conn.release();
    }
  }
}

const db = new Database();
export default db;
