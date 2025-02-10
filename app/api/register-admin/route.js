import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { User } from "@/backend/models"

export async function POST(req) {
  try {
    const { email, password } = await req.json()

    console.log("Received registration request for email:", email)

    // Check if the email matches the admin email
    if (email !== process.env.ADMIN_EMAIL) {
      console.log("Unauthorized registration attempt")
      return NextResponse.json({ error: "Unauthorized to register as admin" }, { status: 403 })
    }

    // Check if admin already exists
    const existingAdmin = await User.findOne({ where: { email, isAdmin: true } })
    if (existingAdmin) {
      console.log("Admin user already exists")
      return NextResponse.json({ error: "Admin user already exists" }, { status: 400 })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create the admin user
    const adminUser = await User.create({
      email,
      password: hashedPassword,
      isAdmin: true,
    })

    console.log("Admin user created successfully")
    return NextResponse.json({ message: "Admin user created successfully" }, { status: 201 })
  } catch (error) {
    console.error("Admin registration error:", error)
    return NextResponse.json({ error: "Error during admin registration", details: error.message }, { status: 500 })
  }
}

