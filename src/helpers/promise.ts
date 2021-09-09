import db2 from "./db2"

export const execPromise = (sql:string, data:any[]) =>{
    return new Promise<any>((resolve, reject)=>{
        db2.query(sql, data, (err, results)=>{
            if(err){
                reject(err)
            }
            resolve(results)
        })
    })
}