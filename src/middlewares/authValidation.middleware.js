import { db } from "../database/database.connection";

export async function authValidation(req, res, next){
    const {authorization} = req.headers
    const token = authorization?.replace("Bearer ", "")
    if(!token) return res.senStatus("401")

    try {
        const session = await db.collection("sessions").findOne({token})
        if(!token) return res.status(401).send("Sem autorizacao")

        res.locals.session = session

        next()
    } catch (err) {
        res.status(500).send(err.message)
    }
}