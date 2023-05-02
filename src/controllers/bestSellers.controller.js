import { ObjectId } from "mongodb";
import { db } from "../database/database.connection.js";

export async function bestSellers() {
    await db.collection("products").deleteMany({ category: "mais vendidos" });
    const allPurchases = await db.collection("allPurchases").find().toArray();
    const items = [];
    const itemsBestSellers = [];

    allPurchases.map(i => {
        i.items.map(t => {
            items.push(t);
        });
    });

    for (let i = 0; i < items.length; i++) {
        let cont = 1;
        for (let j = i + 1; j < items.length; j++) {
            if (items[i] === items[j]) {
                cont++;
            }
        }
        if (cont >= 10 && !itemsBestSellers.includes(items[i])) {
            itemsBestSellers.push(items[i]);
        }
    }

    const ids = itemsBestSellers.map(i => new ObjectId(i));
    const products = await db.collection("products").find({ _id: { $in: ids }, category: { $in: ["eletrodomestico", "tecnologia", "vestuario", "cuidado pessoal"] } }).toArray();
    // const updatedProducts = products.map((p) => ({ ...p, category: "mais vendidos" }));

    // await db.collection("products").insertMany(updatedProducts)
    products.map((p) => {
        db.collection("products").insertOne({ name: p.name, price: p.price, description: p.description, amount: p.amount, category: "mais vendidos", image: p.image });
    });
}