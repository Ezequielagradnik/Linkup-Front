import express from "express"
import cors from "cors"
import { sequelize } from "./models/index.js"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/user.js"
import applicationRoutes from "./routes/apply.js"
import adminRoutes from "./routes/admin.js"

const app = express()

console.log("Starting server initialization")

// Enable CORS for all routes
app.use(
  cors({
    origin: ["https://linkup-eta.vercel.app", "http://localhost:3000"],
    credentials: true,
  }),
)
console.log("CORS middleware configured")

// Middleware for parsing JSON bodies
app.use(express.json())
console.log("JSON body parser middleware configured")

// Debug middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`)
  console.log("Headers:", JSON.stringify(req.headers, null, 2))
  if (req.body) console.log("Body:", JSON.stringify(req.body, null, 2))
  next()
})
console.log("Debug middleware configured")

// Health check route
app.get("/", (req, res) => {
  console.log("Health check route accessed")
  res.json({ status: "ok", message: "LinkUp API is running" })
})

// Mount API routes
console.log("Mounting routes...")
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/apply", applicationRoutes)
app.use("/api/admin", adminRoutes)
console.log("Routes mounted successfully")

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
  console.error("Global error handler caught an error:")
  console.error(err)
  res.status(500).json({
    error: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  })
})

const PORT = process.env.PORT || 5000

async function startServer() {
  try {
    console.log("Attempting to connect to the database...")
    await sequelize.authenticate()
    console.log("Database connected successfully.")

    console.log("Synchronizing database models...")
    await sequelize.sync()
    console.log("Database synchronized successfully.")

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
  console.log("Starting server in development mode")
  startServer()
} else {
  console.log("Server initialized for production mode")
}

