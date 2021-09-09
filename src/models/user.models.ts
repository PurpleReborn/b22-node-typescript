const { promisify } = require('util')
import { Email,User } from "../types/user.types";
import { execPromise } from "../helpers/promise";
import db from "../helpers/db";
import db2 from "../helpers/db2";

const table = "users"

export const getUserByEmail = async (email: Email) => {
  return  (await db).execute(`
       SELECT * from ${table} WHERE email=?`
       , [email])
}

export const getUserByEmail2 = (email:Email) => {
  return new Promise((resolve, reject)=>{
    db2.query(`SELECT * from ${table} WHERE email=?`, [email], (err, results)=>{
      if(err){
        reject(err)
      }
      resolve(results)
    })
  })
}

export const getUserByEmail3 = (email : string) =>{
  return execPromise(`SELECT * from ${table} WHERE email=?`, [email])
}

export const register = async (data: User) => {
  return (await db).execute(`
      INSERT INTO ${table} (name,number,email,password) VALUES (?, ?, ?, ?)`
      , [data.name, data.number, data.email, data.password])
}

