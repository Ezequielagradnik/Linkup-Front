import { NextResponse } from "next/server"

export async function POST(req) {
  console.log("POST request received in frontend apply route handler")
  try {
    const applicationData = await req.json()
    console.log("Raw application data:", JSON.stringify(applicationData, null, 2))

    const backendUrl = process.env.BACKEND_URL || "https://linkup-backend.vercel.app"
    const endpoint = `${backendUrl}/api/apply`

    console.log("Backend URL:", backendUrl)
    console.log("Full endpoint:", endpoint)

    console.log("Sending request to backend...")
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applicationData),
    })

    console.log("Response status:", response.status)
    console.log("Response headers:", Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Error response:", errorText)
      return NextResponse.json({ error: `Failed to submit application: ${errorText}` }, { status: response.status })
    }

    const data = await response.json()
    console.log("Success response:", data)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in apply route handler:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your application" },
      { status: 500 },
    )
  }
}

