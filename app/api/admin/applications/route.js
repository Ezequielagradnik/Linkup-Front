import { NextResponse } from "next/server"
import { headers } from "next/headers"

export async function GET(req) {
  try {
    const headersList = headers()
    const token = headersList.get("authorization")?.split(" ")[1]

    if (!token) {
      console.log("No token provided in the request")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("Attempting to fetch applications from backend")
    console.log("Backend URL:", process.env.BACKEND_URL)

    const response = await fetch(`${process.env.BACKEND_URL}/api/admin/applications`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    console.log("Backend response status:", response.status)

    if (!response.ok) {
      const errorData = await response.text()
      console.error("Backend error response:", errorData)
      return NextResponse.json({ error: `Backend error: ${errorData}` }, { status: response.status })
    }

    const data = await response.json()
    console.log("Successfully fetched applications")
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in /api/admin/applications:", error)
    return NextResponse.json(
      { error: "An error occurred while fetching applications", details: error.message },
      { status: 500 },
    )
  }
}

