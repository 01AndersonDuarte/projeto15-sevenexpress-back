import joi from "joi";

export const productsSchema = joi.object({
    name: joi.string().required().min(5),
    price: joi.number().precision(2).positive().required(),
    disponibilidade: joi.number().integer().positive().required(),
    categoria: joi.string().required().valid("mais vendidos", "eletrodomestico", "tecnologia", "vestuario", "cuidado pessoal")
})