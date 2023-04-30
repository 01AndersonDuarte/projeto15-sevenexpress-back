import { ObjectId } from "mongodb";
import { db } from "../database/database.connection.js";

export async function postCarrinho(req, res){
    const { idProduct, idUser, name, price, image } = req.body;

    try {

        await db.collection("carrinho").insertOne({idProduct, idUser, name, price, image})
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

        res.send(userCarrinho)
    } catch (err) {
        res.status(500).send(err.mesasge)
    }
}

export async function deleteCarrinho(req, res){
    const {id} = req.params
    const {idProduct, idUser} = req.body

    if(id !== idUser) return res.status(401).send("Usuario diferente") 
    try {
        const deleteProduct = await db.collection("carrinho").deleteOne({idProduct, idUser})

        if(deleteProduct.deletedCount === 0) res.status(404).send("Esse produto nao existe")
        res.send("Item deletado com sucesso!")

    } catch (err){
        res.status(500).send(err.message)
    }
}