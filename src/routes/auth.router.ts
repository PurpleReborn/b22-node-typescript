import { Router } from "express"
import { forgotPassword, login,register, resetPassword} from "../controllers/auth.controllers"
const auth = Router()

auth.post("/login", login)
auth.post("/register", register)
auth.post("/forgotPassword", forgotPassword)
auth.post("/confirmPassword", resetPassword)

export default auth