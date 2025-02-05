import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const { email, password } = await req.json()

    const response = await fetch(`${process.env.BACKEND_URL}/api/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      throw new Error("Invalid credentials")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Admin login error:", error)
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 })
  }
}

