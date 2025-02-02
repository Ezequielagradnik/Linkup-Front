import express from "express"
import bcrypt from "bcryptjs"
import { Application } from "../models/index.js"
import { sendApplicationEmail } from "../utils/email.js"

const router = express.Router()

// Explicit route handler for POST /api/apply
router.post("/", async (req, res) => {
  console.log("Application route handler called")
  console.log("Request body:", req.body)

  try {
    const applicationData = req.body

    // Log each step
    console.log("1. Starting application submission process")
    console.log("Application data received:", applicationData)

    console.log("2. Hashing password")
    const hashedPassword = await bcrypt.hash(applicationData.password, 10)
    applicationData.password = hashedPassword

    console.log("3. Creating application in database")
    const application = await Application.create(applicationData)
    console.log("4. Application created successfully:", application.id)

    console.log("5. Sending confirmation email")
    await sendApplicationEmail(application)
    console.log("6. Confirmation email sent")

    res.status(201).json({
      message: "Application submitted successfully",
      applicationId: application.id,
    })
  } catch (error) {
    console.error("Error in application submission:", error)
    console.error("Stack trace:", error.stack)

    if (error.name === "SequelizeValidationError") {
      res.status(400).json({
        message: "Validation error",
        errors: error.errors.map((err) => ({
          field: err.path,
          message: err.message,
        })),
      })
    } else if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({ message: "Email already in use" })
    } else {
      res.status(500).json({
        message: "Error submitting application",
        error: error.message,
      })
    }
  }
})

// Test route
router.get("/test", (req, res) => {
  res.json({ message: "Application route is working" })
})

export default router

