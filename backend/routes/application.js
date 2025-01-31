import express from "express"
import bcrypt from "bcryptjs"
import { Application } from "../models/index.js"
import { sendApplicationEmail } from "../utils/email.js"

const router = express.Router()

router.post("/", async (req, res) => {
  console.log("Received application data:", JSON.stringify(req.body, null, 2))
  try {
    const applicationData = req.body

    // Hash the password
    const hashedPassword = await bcrypt.hash(applicationData.password, 10)
    applicationData.password = hashedPassword

    // Create the application
    const application = await Application.create(applicationData)

    console.log("Saved application data:", JSON.stringify(application, null, 2))

    // Send confirmation email with all application data
    await sendApplicationEmail(application)

    res.status(201).json({ message: "Application submitted successfully", applicationId: application.id })
  } catch (error) {
    console.error("Error submitting application:", error)

    if (error.name === "SequelizeValidationError") {
      // Handle validation errors
      const validationErrors = error.errors.map((err) => ({
        field: err.path,
        message: err.message,
      }))
      res.status(400).json({ message: "Validation error", errors: validationErrors })
    } else if (error.name === "SequelizeUniqueConstraintError") {
      // Handle unique constraint errors (e.g., duplicate email)
      res.status(400).json({ message: "Email already in use" })
    } else {
      // Handle other types of errors
      res.status(500).json({ message: "Error submitting application", error: error.message })
    }
  }
})

export default router

