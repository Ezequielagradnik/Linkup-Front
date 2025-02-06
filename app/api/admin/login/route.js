import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const { email, password } = await req.json()

    console.log("Admin login attempt:", email)

    const backendUrl = process.env.BACKEND_URL || "https://linkup-backend.vercel.app"
    console.log("Backend URL:", backendUrl)

    const response = await fetch(`${backendUrl}/api/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    const contentType = response.headers.get("content-type")
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json()
      if (!response.ok) {
        console.error("Backend error:", data)
        return NextResponse.json({ error: data.message }, { status: response.status })
      }
      console.log("Admin login successful")
      return NextResponse.json(data)
    } else {
      const text = await response.text()
      console.error("Unexpected response:", text)
      return NextResponse.json({ error: "Unexpected server response" }, { status: 500 })
    }
  } catch (error) {
    console.error("Admin login error:", error)
    return NextResponse.json({ error: "An error occurred during admin login", details: error.message }, { status: 500 })
  }
}

