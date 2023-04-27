import { ObjectId } from "mongodb";
import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";

export async function registerProducts(req, res) {
    const { name, price, amount, category } = req.body;
    const { userId } = res.locals.session;

    try {
        const admin = await db.collection("users").findOne({ _id: new ObjectId(userId) });
        if (!admin) return res.status(500).send("Erro do servidor");

        const checkPassword = bcrypt.compareSync(process.env.PASSWORD_ADMIN, admin.password);
        if (admin.email !== process.env.EMAIL_ADMIN) return res.status(401).send("Sem autorização!");
        if (!checkPassword) return res.status(401).send("Sem autorização");

        await db.collection("products").insertOne({ name, price, amount, category });
        res.status(201).send("Produto criado com sucesso");
    } catch (err) {
        res.status(500).send(err.message);
    }

}

export async function getProducts(req, res) {

    try {
        const listaDeItens = await db.collection("products").find().toArray();
        res.send(listaDeItens);
    } catch (err) {
        res.status(500).send(err.message);
    }
}