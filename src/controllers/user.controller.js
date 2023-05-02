import { db } from "../database/database.connection.js";
import {v4 as uuid} from "uuid"
import bcrypt from "bcrypt"
import { ObjectId } from "mongodb";

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

        const idUser = (checkEmail._id).toString();
        const userCarrinho = await db.collection("carrinho").find({idUser}).toArray();

        const getBody = {id: checkEmail._id, token, name: checkEmail.name, cart: userCarrinho}

        if (checkEmail.email === process.env.EMAIL_ADMIN && bcrypt.compareSync(process.env.PASSWORD_ADMIN, checkEmail.password)){
            return res.status(200).send({...getBody, root: true});
        }

        res.status(200).send(getBody)
    } catch (err) {
        res.status(500).send(err.message)
    }
}
