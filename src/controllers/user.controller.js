import { db } from "../database/database.connection.js";
import {v4 as uuid} from "uuid"
import bcrypt from "bcrypt"

export async function signUp(req, res){
    const {name, email, password} =  req.body

    try {   
        const checkEmail = await db.collection("users").findOne({email})
        if(checkEmail) return res.status(409).send("Email ja registrado")

        const hash = bcrypt.hashSync(password, 10)
        await db.collection("users").insertOne({name, email, password: hash})

        res.status(201).send("Conta criada com sucesso")
    } catch (err) {
        res.status(500).send(err.message)
    }
}