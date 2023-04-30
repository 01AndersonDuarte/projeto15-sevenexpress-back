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

export async function signIn(req, res){
    const {email, password} = req.body

    try {
        const checkEmail = await db.collection("users").findOne({email})
        if(!checkEmail) return res.status(404).send("Email nao cadastrado")

        const checkPassword = bcrypt.compareSync(password, checkEmail.password)
        if(!checkPassword) return res.status(401).send("Senha incorreta")

        const token = uuid()
        await db.collection("sessions").insertOne({token, idUser: checkEmail._id})

        const getBody = {id: checkEmail._id, token, name: checkEmail.name}
        res.status(200).send(getBody)
    } catch (err) {
        res.status(500).send(err.message)
    }
}
