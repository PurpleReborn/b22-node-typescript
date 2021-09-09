import { execPromise } from "../helpers/promise"

export const forgotPaswwordModel = (code:string, id: number) => {
    return execPromise('INSERT INTO forgot_request SET ?', [{code, user_id:id}])
}

export const resetCodeModel = (code:string) => {
    return execPromise(`SELECT u.id ,u.email, r.code FROM forgot_request r LEFT JOIN users u ON r.user_id=u.id WHERE r.code=?`, [code])
}

export const updatePassword = (data:object, id: number)=>{
    return execPromise('UPDATE users SET ? WHERE id=?', [data, id])
}

export const deleteCode = (code: string)=>{
    return execPromise('DELETE FROM forgot_request WHERE code=?', [code])
}