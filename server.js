const express = require("express")
const cors = require("cors")
const { sequelize } = require("./models")
const authRoutes = require("./routes/auth")
const blogRoutes = require("./routes/blog")
const userRoutes = require("./routes/user")
const commentRoutes = require("./routes/comment")

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
    await sequelize.sync()
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  } catch (error) {
    console.error("Unable to start the server:", error)
  }
}

startServer()

