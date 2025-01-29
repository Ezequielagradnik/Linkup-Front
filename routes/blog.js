import express from "express"
import { Blog, User } from "../models/index.js"
import authenticateToken from "../middleware/auth.js"

const router = express.Router()

router.post("/", authenticateToken, async (req, res) => {
  try {
    const { title, content } = req.body
    const blog = await Blog.create({ title, content, UserId: req.user.id })
    res.status(201).json(blog)
  } catch (error) {
    res.status(500).json({ message: "Error creating blog", error: error.message })
  }
})

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.findAll({ include: [{ model: User, attributes: ["username"] }] })
    res.json(blogs)
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error: error.message })
  }
})

router.get("/latest", async (req, res) => {
  try {
    const latestBlog = await Blog.findOne({
      order: [["createdAt", "DESC"]],
      include: [{ model: User, attributes: ["username"] }],
    })
    res.json(latestBlog)
  } catch (error) {
    res.status(500).json({ message: "Error fetching latest blog", error: error.message })
  }
})

module.exports = router

