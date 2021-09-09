import { Request,Response } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import response from "../helpers/response"
import {getUserByEmail,getUserByEmail3,register as RegisterModel} from "../models/user.models"
import { deleteCode, forgotPaswwordModel, resetCodeModel, updatePassword } from "../models/forgotPass.models";
import { customAlphabet } from 'nanoid/async'

const {APP_KEY} = process.env

export interface FindEmail {
    user: object | any[]
  }

  export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body
    const results:any = await getUserByEmail(email)
    const finalData = results[0][0]
    // console.log(results[0])
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const valid = emailRegexp.test(email)
    if(!valid){
      return res.json({
        success: false,
        message: 'e-mail is not in e-mail format',
      })
    }
    if(password.length < 8){
      return res.json({
        success: false,
        message: 'password must be length more then 8',
      })
    }
    if(!finalData) {
      return response(res, "Email not found", 500)
    } else {
      const compare = await bcrypt.compare(password, finalData.password)
      if(compare) {
          const token = jwt.sign({id: finalData.id, email:finalData.email}, APP_KEY || "")
          return response(res, "Login success", 200, {token})
      } else {
        return response(res, "Wrong password", 404)
      }
    }
    
  }

  export const register = async (req: Request, res: Response) => {
    const name = req.body.name
    const number = req.body.number
    const email = req.body.email
    const password = req.body.password
    const user:any = await getUserByEmail(email)
    const checkEmail = user[0][0]

    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const valid = emailRegexp.test(email)
    if(!valid){
      return res.json({
        success: false,
        message: 'e-mail is not in e-mail format',
      })
    }
    if(password.length < 8){
      return res.json({
        success: false,
        message: 'password must be length more then 8',
      })
    }
    if(number.length < 8){
      return res.json({
        success: false,
        message: 'phone number must be length more then 8',
      })
    }
    if(checkEmail){
        return response(res,"Email already in use", 500)
    } else {
        const cryptPassword = await bcrypt.hash(password, await bcrypt.genSalt())
        const data = { name, number, email, password: cryptPassword }
        await RegisterModel(data)
        return response(res, "Register SuccesFully,Lets Login", 200)
    }
}

export const forgotPassword = async (req:Request, res: Response)=>{
  const {email} = req.body
  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const valid = emailRegexp.test(email)
  if(!valid){
    return res.json({
      success: false,
      message: 'e-mail is not in e-mail format',
    })
  }
  const result = await getUserByEmail3(email)
  if(result.length>0){
    const user = result[0]
    const code = await customAlphabet('0123456789', 4)
    const forgotData = await forgotPaswwordModel(await code(),user.id)
    return res.json({
      success: true,
      message: `Request success`
    })
  }else{
    return res.json({
      success: false,
      message:'Email not found'
    })
  }
}

export const resetPassword = async (req:Request, res: Response)=>{
  const {email, code, new_password, confirm_password} = req.body
  const [user] = await resetCodeModel(code)
  if(user){
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const valid = emailRegexp.test(email)
    if(!valid){
      return res.json({
        success: false,
        message: 'e-mail is not in e-mail format',
      })
    }
    if(user.email !== email){
      return res.json({
        success: false,
        message: 'Wrong email',
      })
    }
    if(new_password.length < 8){
      return res.json({
        success: false,
        message: 'password must be length more then 8',
      })
    }
    if(confirm_password.length < 8 ){
      return res.json({
        success: false,
        message: 'password must be length more then 8',
      })
    }
    if(new_password !== confirm_password){
      return res.json({
        success: false,
        message: 'password not match',
      })
    }
    const cryptPassword = await bcrypt.hash(new_password, await bcrypt.genSalt())
    await updatePassword({password: cryptPassword}, user.id)
    await deleteCode(code)
    return res.json({
      success: true,
      message: 'Your password has been reset',
      results: user
    })
  }else{
    return res.json({
      success: false,
      message:'Reset password failed'
    })
  }
}