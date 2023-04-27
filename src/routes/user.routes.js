import { Router } from "express";
import { signupSchema } from "../schemas/user.schema.js";
import { signUp } from "../controllers/user.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";

const userRouter = Router()

userRouter.post("/cadastro", validateSchema(signupSchema), signUp)

export default userRouter