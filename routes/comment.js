const express = require("express")
const { Comment, User } = require("../models")
const authenticateToken = require("../middleware/auth")

const router = express.Router()

// Get comments for a specific blog post
router.get("/blog/:blogId", async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { BlogId: req.params.blogId },
      include: [{ model: User, attributes: ["username"] }],
      order: [["createdAt", "DESC"]],
    })
    res.json(comments)
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error: error.message })
  }
})

// Add a new comment
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { content, blogId } = req.body
    const comment = await Comment.create({
      content,
      UserId: req.user.id,
      BlogId: blogId,
    })
    const commentWithUser = await Comment.findOne({
      where: { id: comment.id },
      include: [{ model: User, attributes: ["username"] }],
    })
    res.status(201).json(commentWithUser)
  } catch (error) {
    res.status(500).json({ message: "Error creating comment", error: error.message })
  }
})

// Delete a comment
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id)
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" })
    }
    if (comment.UserId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this comment" })
    }
    await comment.destroy()
    res.json({ message: "Comment deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment", error: error.message })
  }
})

module.exports = router

