import * as dotenv from "dotenv"
import mysql2 from "mysql2"
dotenv.config();

const db2 = mysql2.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  })


export default db2