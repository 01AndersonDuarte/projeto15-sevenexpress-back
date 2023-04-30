import { ObjectId } from "mongodb";
import { db } from "../database/database.connection.js";

export async function postCarrinho(req, res) {
    const { idProduct, idUser, name, price, image } = req.body;

    try {

        await db.collection("carrinho").insertOne({ idProduct, idUser, name, price, image })
        res.send("Produto adicionado ao carrinho")
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getCarrinho(req, res) {
    const { id } = req.params

    try {
        const userCarrinho = await db.collection("carrinho").find({ idUser: id }).toArray()
        if (!userCarrinho) res.status(404).send("Carrinho Vazio")

        res.send(userCarrinho)
    } catch (err) {
        res.status(500).send(err.mesasge)
    }
}

export async function deleteCarrinho(req, res) {
    const { id } = req.params
    const { idProduct, idUser } = req.body

    if (id !== idUser) return res.status(401).send("Usuario diferente")
    try {
        const deleteProduct = await db.collection("carrinho").deleteOne({ idProduct, idUser })

        if (deleteProduct.deletedCount === 0) res.status(404).send("Esse produto nao existe")
        res.send("Item deletado com sucesso!")

    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function finishPurchase(req, res) {
    const { id } = req.params
    console.log(req.body)

    try {
        req.body.forEach(async function edit(e) {
            const amountProduct = await db.collection("products").findOne({ _id: new ObjectId(e) })
            if(!amountProduct.amount === 0) return res.status(404).send("Esse produto ja esta esgotado")

            const deleteProduct = await db.collection("carrinho").deleteOne({ idProduct: e, idUser: id })

            if (deleteProduct.deletedCount === 0) return res.status(404).send("Esse produto nao existe")
    
            console.log(amountProduct.amount)
            await db.collection("products").updateOne({ _id: new ObjectId(e) }, { $set: { amount: amountProduct.amount - 1 } })
        })



        res.status(200).send("Compra finalizada com sucesso")
    } catch (err) {
        res.status(500).send(err.message)
    }
}