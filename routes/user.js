const express = require("express")
const { User } = require("../models")
const authenticateToken = require("../middleware/auth")

const router = express.Router()

router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, { attributes: { exclude: ["password"] } })
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile", error: error.message })
  }
})

module.exports = router

