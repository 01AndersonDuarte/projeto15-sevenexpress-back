import { ObjectId } from "mongodb";
import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";

export async function registerProducts(req, res) {
    const { name, price, description, amount, category, image } = req.body;
    const { idUser } = res.locals.session;

    try {
        const admin = await db.collection("users").findOne({ _id: new ObjectId(idUser) });
        if (!admin) return res.status(500).send("Erro do servidor");

        const checkPassword = bcrypt.compareSync(process.env.PASSWORD_ADMIN, admin.password);
        if (admin.email !== process.env.EMAIL_ADMIN) return res.status(401).send("Sem autorização!");
        if (!checkPassword) return res.status(401).send("Sem autorização");

        await db.collection("products").insertOne({ name, price, description, amount, category, image });
        res.status(201).send("Produto criado com sucesso");
    } catch (err) {
        res.status(500).send(err.message);
    }

}

export async function getProducts(req, res) {
    const { id } = req.params;
    const { category } = req.query;

    try {
        if (!id) {
            if (category === "mais vendidos" || category === "eletrodomestico" || category === "tecnologia" || category === "vestuario" || category === "cuidado pessoal") {
                const section = await db.collection("products").find({ category: category }).toArray();
                return res.send(section);
            }
            const listaDeItens = await db.collection("products").find().toArray();
            return res.send(listaDeItens);
        }
        const product = await db.collection("products").findOne({ _id: new ObjectId(id) });
        return res.send(product);
    } catch (err) {
        res.status(500).send(err.message);
    }
}