import { Router } from "express";
import { signinSchema, signupSchema } from "../schemas/user.schema.js";
import { signIn, signUp } from "../controllers/user.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";

const userRouter = Router()

userRouter.post("/cadastro", validateSchema(signupSchema), signUp)
userRouter.post("/login", validateSchema(signinSchema), signIn)

export default userRouter