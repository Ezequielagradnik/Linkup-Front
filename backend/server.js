import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import fs from "fs"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log("Current working directory:", process.cwd())
console.log("__dirname:", __dirname)

// Load environment variables
const envPath = path.resolve(__dirname, ".env")
console.log("Attempting to load .env file from:", envPath)

try {
  const envConfig = dotenv.parse(fs.readFileSync(envPath))
  for (const k in envConfig) {
    process.env[k] = envConfig[k]
  }
  console.log(".env file loaded successfully")
} catch (error) {
  console.error("Error loading .env file:", error)
}

// Log all environment variables
console.log("Environment variables:")
console.log(JSON.stringify(process.env, null, 2))

import express from "express"
import cors from "cors"
import { sequelize } from "./models/index.js"
import authRoutes from "./routes/auth.js"
import blogRoutes from "./routes/blog.js"
import userRoutes from "./routes/user.js"
import commentRoutes from "./routes/comment.js"
import applyRoutes from "./routes/apply.js"
import adminRoutes from "./routes/admin.js"

const app = express()

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
)
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/blogs", blogRoutes)
app.use("/api/users", userRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/apply", applyRoutes)
app.use("/api/admin", adminRoutes)

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

