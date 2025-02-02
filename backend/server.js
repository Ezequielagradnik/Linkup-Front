import express from "express"
import cors from "cors"
import { sequelize } from "./models/index.js"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/user.js"
import applicationRoutes from "./routes/apply.js"
import adminRoutes from "./routes/admin.js"

const app = express()

// Enable CORS for all routes
app.use(
  cors({
    origin: ["https://linkup-eta.vercel.app", "http://localhost:3000"],
    credentials: true,
  }),
)

// Middleware for parsing JSON bodies
app.use(express.json())

// Debug middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`)
  console.log("Headers:", JSON.stringify(req.headers, null, 2))
  if (req.body) console.log("Body:", JSON.stringify(req.body, null, 2))
  next()
})

// Health check route
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "LinkUp API is running" })
})

// Mount API routes
console.log("Mounting routes...")
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/apply", applicationRoutes)
app.use("/api/admin", adminRoutes)

// Test route for applications
app.post("/api/apply-test", (req, res) => {
  console.log("Test application route hit")
  res.json({ message: "Test application endpoint working" })
})

// Debug 404 handler
app.use((req, res) => {
  console.log(`404: ${req.method} ${req.originalUrl} not found`)
  res.status(404).json({
    error: `Route not found`,
    method: req.method,
    path: req.originalUrl,
    availableRoutes: [
      "POST /api/apply",
      "GET /api/admin/applications",
      "POST /api/auth/login",
      "GET /api/users/profile",
    ],
  })
})

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err)
  res.status(500).json({
    error: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  })
})

const PORT = process.env.PORT || 5000

async function startServer() {
  try {
    await sequelize.authenticate()
    console.log("Database connected.")

    await sequelize.sync()
    console.log("Database synchronized.")

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
      console.log("Available routes:")
      console.log("- POST /api/apply")
      console.log("- GET /api/admin/applications")
      console.log("- POST /api/auth/login")
      console.log("- GET /api/users/profile")
    })
  } catch (error) {
    console.error("Unable to start the server:", error)
    process.exit(1)
  }
}

// Export for Vercel
export default app

// Start server if not running on Vercel
if (process.env.NODE_ENV !== "production") {
  startServer()
}

