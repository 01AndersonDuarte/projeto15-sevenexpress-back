import joi from "joi";

export const signupSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required().min(3).message({
        "string.min": "A senha deve ter no minimo 3 caracteres"
    })
})

export const signinSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required()
})