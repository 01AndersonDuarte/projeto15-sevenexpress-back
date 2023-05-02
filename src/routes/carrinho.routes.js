import { Router } from "express";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { deleteCarrinho, finishPurchase, getCarrinho, postCarrinho } from "../controllers/carrinho.controller.js";

const carrinhoRouter = Router()

carrinhoRouter.use(authValidation)
carrinhoRouter.post("/carrinho", postCarrinho)
carrinhoRouter.get("/carrinho/:id", getCarrinho)
carrinhoRouter.post("/carrinho/:id", deleteCarrinho)
carrinhoRouter.put("/carrinho/:id", finishPurchase)

export default carrinhoRouter