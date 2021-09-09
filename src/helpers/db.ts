import * as dotenv from "dotenv"
import mysql2 from "mysql2/promise"
dotenv.config();

const db = mysql2.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  })


export default db


// // async function connection () {
// //     const conn = await mysql.createConnection({ 
// //         host: process.env.DB_HOST,
// //         user: process.env.DB_USER,
// //         password: process.env.DB_PASSWORD,
// //         database: process.env.DB_DATABASE,
// //         connectTimeout: 90000
// //      });
// //     await conn.end();
// // }

