import "dotenv/config"
import express from "express"
import cors from "cors"
import { sequelize } from "./models/index.js"
import authRoutes from "./routes/auth.js"
import blogRoutes from "./routes/blog.js"
import userRoutes from "./routes/user.js"
import commentRoutes from "./routes/comment.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/blogs", blogRoutes)
app.use("/api/users", userRoutes)
app.use("/api/comments", commentRoutes)

const PORT = process.env.PORT || 5000

async function startServer() {
  try {
    await sequelize.authenticate()
    console.log("Database connected.")

    // Sincroniza los modelos con la base de datos
    await sequelize.sync({ force: true }) // CUIDADO: 'force: true' eliminará las tablas existentes
    console.log("Database synchronized.")

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  } catch (error) {
    console.error("Unable to start the server:", error)
  }
}

startServer()

