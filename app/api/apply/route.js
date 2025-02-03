import { NextResponse } from "next/server"

export async function POST(req) {
  console.log("==== POST request received in /api/apply ====")
  console.log("Timestamp:", new Date().toISOString())
  console.log("Request headers:", JSON.stringify(req.headers, null, 2))

  try {
    const applicationData = await req.json()
    console.log("Application data:", JSON.stringify(applicationData, null, 2))

    const backendUrl = process.env.BACKEND_URL || "https://linkup-backend.vercel.app"
    console.log("Backend URL:", backendUrl)
    console.log("Full endpoint:", `${backendUrl}/api/apply`)

    console.log("Sending request to backend...")
    const response = await fetch(`${backendUrl}/api/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applicationData),
    })

    console.log("Response status:", response.status)
    console.log("Response headers:", JSON.stringify(Object.fromEntries(response.headers.entries()), null, 2))

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Backend error response:", errorText)
      console.error("Backend error status:", response.status)
      return NextResponse.json(
        { error: `Backend error: ${errorText}`, status: response.status },
        { status: response.status },
      )
    }

    const data = await response.json()
    console.log("Backend success response:", JSON.stringify(data, null, 2))
    return NextResponse.json(data)
  } catch (error) {
    console.error("==== Error in /api/apply ====")
    console.error("Error name:", error.name)
    console.error("Error message:", error.message)
    console.error("Error stack:", error.stack)
    return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 })
  } finally {
    console.log("==== /api/apply request processing completed ====")
  }
}

