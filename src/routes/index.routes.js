import {Router} from "express";
import userRouter from "./user.routes.js";
import productsRouter from "./products.routes.js";
import carrinhoRouter from "./carrinho.routes.js";

 
const router = Router();

router.use(carrinhoRouter)
router.use(userRouter);
router.use(productsRouter);

export default router;