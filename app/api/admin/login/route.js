import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const { email, password } = await req.json()

    console.log("Admin login attempt:", email)

    const response = await fetch(`${process.env.BACKEND_URL}/api/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Backend error:", errorData)
      return NextResponse.json({ error: errorData.message }, { status: response.status })
    }

    const data = await response.json()
    console.log("Admin login successful")
    return NextResponse.json(data)
  } catch (error) {
    console.error("Admin login error:", error)
    return NextResponse.json({ error: "An error occurred during admin login" }, { status: 500 })
  }
}

