import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables
const envPath = path.resolve(__dirname, ".env")
console.log("Attempting to load .env file from:", envPath)
const result = dotenv.config({ path: envPath })

if (result.error) {
  console.error("Error loading .env file:", result.error)
} else {
  console.log(".env file loaded successfully")
}

// Log all environment variables
console.log("Environment variables:")
console.log(JSON.stringify(process.env, null, 2))

//console.log("Node environment:", process.env.NODE_ENV)
//console.log("Database URL:", process.env.DATABASE_URL)
//console.log("Port:", process.env.PORT || 5000)
//console.log("DB_NAME:", process.env.DB_NAME)
//console.log("DB_USER:", process.env.DB_USER)
//console.log("DB_HOST:", process.env.DB_HOST)
//console.log("DB_PORT:", process.env.DB_PORT)

import { sequelize } from "./models/index.js"
import authRoutes from "./routes/auth.js"
import blogRoutes from "./routes/blog.js"
import userRoutes from "./routes/user.js"
import commentRoutes from "./routes/comment.js"
import applicationRoutes from "./routes/application.js"
import adminRoutes from "./routes/admin.js"

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
app.use("/api/admin", adminRoutes)

app.get("/env", (req, res) => {
  res.json({
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
  })
})

const PORT = process.env.PORT || 5000

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error)
  process.exit(1)
})

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason)
  process.exit(1)
})

async function startServer() {
  try {
    console.log("Attempting to connect to the database...")
    await Promise.race([
      sequelize.authenticate(),
      new Promise((_, reject) => setTimeout(() => reject(new Error("Database connection timeout")), 10000)),
    ])
    console.log("Database connected successfully.")

    console.log("Synchronizing database...")
    await sequelize.sync()
    console.log("Database synchronized successfully.")

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  } catch (error) {
    console.error("Error starting the server:", error)
    if (error.original) {
      console.error("Original error:", error.original)
    }
    process.exit(1)
  }
}

startServer()

