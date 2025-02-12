import { NextResponse } from "next/server"

export async function POST(req) {
  console.log("Login request received")
  try {
    const { email, password } = await req.json()
    console.log("Login attempt for email:", email)

    if (!process.env.BACKEND_URL) {
      console.error("BACKEND_URL is not set")
      return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }

    console.log("BACKEND_URL:", process.env.BACKEND_URL)
    const url = `${process.env.BACKEND_URL}/api/login`
    console.log("Sending request to:", url)

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    console.log("Response status:", response.status)
    console.log("Response headers:", Object.fromEntries(response.headers))

    const responseText = await response.text()
    console.log("Response body:", responseText)

    if (!response.ok) {
      console.log("Error response body:", responseText)
      let errorData
      try {
        errorData = JSON.parse(responseText)
      } catch (e) {
        console.log("Failed to parse error response as JSON")
      }
      return NextResponse.json(
        { error: errorData?.error || responseText || "Unknown error occurred" },
        { status: response.status },
      )
    }

    let data
    try {
      data = JSON.parse(responseText)
    } catch (e) {
      console.log("Failed to parse response as JSON")
      return NextResponse.json({ error: "Invalid response from server" }, { status: 500 })
    }

    console.log("Parsed response data:", data)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Login error:", error)
    console.error("Error stack:", error.stack)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

