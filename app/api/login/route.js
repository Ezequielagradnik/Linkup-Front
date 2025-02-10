import { NextResponse } from "next/server"

export async function POST(req) {
  console.log("Login request received")
  try {
    const { email, password } = await req.json()
    console.log("Login attempt for email:", email)

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

    if (!response.ok) {
      const errorText = await response.text()
      console.log("Error response body:", errorText)
      let errorData
      try {
        errorData = JSON.parse(errorText)
      } catch (e) {
        console.log("Failed to parse error response as JSON")
      }
      throw new Error(errorData?.error || errorText || "error puto")
    }

    const responseText = await response.text()
    console.log("Response body:", responseText)
    
    let data
    try {
      data = JSON.parse(responseText)
    } catch (e) {
      console.log("Failed to parse response as JSON")
      throw new Error("Invalid response from server")
    }

    console.log("Parsed response data:", data)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Login error:", error)
    console.error("Error stack:", error.stack)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}