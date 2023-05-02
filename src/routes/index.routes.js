import {Router} from "express";
import userRouter from "./user.routes.js";
import productsRouter from "./products.routes.js";
import carrinhoRouter from "./carrinho.routes.js";

 
const router = Router();

router.use(userRouter);
router.use(productsRouter);
router.use(carrinhoRouter)

export default router;