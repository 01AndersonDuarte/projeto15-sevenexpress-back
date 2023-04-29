import { Router } from "express";
import { productsSchema } from "../schemas/products.schema.js";
import { registerProducts, getProducts } from "../controllers/products.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";

const productsRouter = Router();

productsRouter.post("/registrar-produto", authValidation, validateSchema(productsSchema), registerProducts);
productsRouter.get("/produtos", getProducts);
productsRouter.get("/produtos/:id", getProducts);

export default productsRouter;