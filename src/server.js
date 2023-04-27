import express from "express"
import cors from "cors"
import router from "./routes/index.routes.js"

const server = express()
server.use(cors())
server.use(express.json())
server.use(router)

const port = process.env.PORT || 5000
server.listen(port, () => console.log(`Servidor rodando na porta ${port}`))
