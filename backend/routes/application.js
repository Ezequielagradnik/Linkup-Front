import express from "express"
import bcrypt from "bcryptjs"
import { Application } from "../models/index.js"
import { sendApplicationEmail } from "../utils/email.js"

const router = express.Router()

router.post("/", async (req, res) => {
  try {
    const applicationData = req.body

    // Hash the password
    const hashedPassword = await bcrypt.hash(applicationData.password, 10)
    applicationData.password = hashedPassword

    // Create the application
    const application = await Application.create(applicationData)

    // Send confirmation email
    await sendApplicationEmail(applicationData.email)

    res.status(201).json({ message: "Application submitted successfully", applicationId: application.id })
  } catch (error) {
    res.status(500).json({ message: "Error submitting application", error: error.message })
  }
})

export default router

