import { NextResponse } from "next/server"

export async function GET(req) {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/admin/applications`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Server response:", errorText)
      return NextResponse.json({ error: "Error fetching applications" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching applications:", error)
    return NextResponse.json({ error: "An error occurred while fetching applications" }, { status: 500 })
  }
}

