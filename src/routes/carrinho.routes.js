import { Router } from "express";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { getCarrinho, postCarrinho } from "../controllers/carrinho.controller.js";

const carrinhoRouter = Router()

//carrinhoRouter.use(authValidation)
carrinhoRouter.post("/carrinho", postCarrinho)
carrinhoRouter.get("/carrinho/:id", getCarrinho)

export default carrinhoRouter