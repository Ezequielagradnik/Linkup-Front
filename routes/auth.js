const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { User } = require("../models")

const router = express.Router()

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ username, email, password: hashedPassword })
    res.status(201).json({ message: "User registered successfully", userId: user.id })
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message })
  }
})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" })
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "your-secret-key", { expiresIn: "1h" })
    res.json({ message: "Login successful", token })
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message })
  }
})

module.exports = router

