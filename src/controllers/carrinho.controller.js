import { ObjectId } from "mongodb";
import { db } from "../database/database.connection.js";

export async function postCarrinho(req, res){
    const { idUser, name, price, image } = req.body;

    try {

        await db.collection("carrinho").insertOne({idUser, name, price, image})
        res.send("Produto adicionado ao carrinho")
    } catch (err){
        res.status(500).send(err.message)
    }
}

export async function getCarrinho(req, res){
    const {id} = req.params

    try {
        const userCarrinho = await db.collection("carrinho").find({idUser: id}).toArray()
        if(!userCarrinho) res.status(404).send("Carrinho Vazio")

        console.log(userCarrinho)
        res.send(userCarrinho)
    } catch (err) {
        res.status(500).send(err.mesasge)
    }
}