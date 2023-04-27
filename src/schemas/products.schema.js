import joi from "joi";

export const productsSchema = joi.object({
    name: joi.string().required().min(5),
    price: joi.number().precision(2).positive().required(),
    description: joi.string().required().min(10),
    amount: joi.number().integer().positive().required(),
    category: joi.string().required().valid("mais vendidos", "eletrodomestico", "tecnologia", "vestuario", "cuidado pessoal")
})