import {Request, Response} from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'

interface AuthRequest extends Request {
    authUser: string | JwtPayload
}


const authMiddlewares = (req: AuthRequest, res: Response, next: Function)=>{
    const payload = req.headers.authorization
    if(payload){
        'Bearer Token'
        const token = payload.slice(7)
        try{
            const verify = jwt.verify(token, process.env.APP_KEY || "")
            req.authUser = verify
            next()
        }catch(e){
            return res.json({
                success: false,
                message: 'Auth error'
            })
        }
    }

    return res.json({
        success: false,
        message: 'Auth token needed'
    })
}

export default authMiddlewares

