import express from "express"
import cors from "cors"
import { config } from "dotenv"
config()

import { sequelize } from "./models/index.js"
import authRoutes from "./routes/auth.js"
import blogRoutes from "./routes/blog.js"
import userRoutes from "./routes/user.js"
import commentRoutes from "./routes/comment.js"
import applicationRoutes from "./routes/application.js"

const app = express()

app.use(
  cors({
    origin: process.env.NODE_ENV === "production" ? "https://tu-dominio-de-produccion.com" : "http://localhost:3000",
  }),
)
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/blogs", blogRoutes)
app.use("/api/users", userRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/applications", applicationRoutes)

const PORT = process.env.PORT || 5000

async function startServer() {
  try {
    await sequelize.authenticate()
    console.log("Database connected.")

    await sequelize.sync()
    console.log("Database synchronized.")

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  } catch (error) {
    console.error("Unable to start the server:", error)
  }
}

startServer()

