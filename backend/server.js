import express from "express"
import cors from "cors"
import { sequelize } from "./models/index.js"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/user.js"
import applicationRoutes from "./routes/apply.js"
import adminRoutes from "./routes/admin.js"

const app = express()

console.log("Starting server initialization")

app.use(
  cors({
    origin: ["https://linkup-eta.vercel.app", "http://localhost:3000"],
    credentials: true,
  }),
)
console.log("CORS middleware configured")

app.use(express.json())
console.log("JSON body parser middleware configured")

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`)
  console.log("Headers:", JSON.stringify(req.headers, null, 2))
  if (req.body) console.log("Body:", JSON.stringify(req.body, null, 2))
  next()
})
console.log("Debug middleware configured")

app.get("/", (req, res) => {
  console.log("Health check route accessed")
  res.json({ status: "ok", message: "LinkUp API is running" })
})

console.log("Mounting routes...")
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/apply", applicationRoutes)
app.use("/api/admin", adminRoutes)
console.log("Routes mounted successfully")

app.use((req, res) => {
  console.log(`404: ${req.method} ${req.originalUrl} not found`)
  res.status(404).json({
    error: `Route not found`,
    method: req.method,
    path: req.originalUrl,
  })
})

app.use((err, req, res, next) => {
  console.error("Global error handler caught an error:", err)
  res.status(500).json({
    error: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  })
})

const PORT = process.env.PORT || 5000

async function startServer() {
  try {
    await sequelize.authenticate()
    console.log("Database connected successfully.")

    await sequelize.sync()
    console.log("Database synchronized successfully.")

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error("Unable to start the server:", error)
    process.exit(1)
  }
}

if (process.env.NODE_ENV !== "production") {
  startServer()
} else {
  console.log("Server initialized for production mode")
}

export default app

