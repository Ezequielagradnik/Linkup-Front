import { NextResponse } from "next/server"
import { headers } from "next/headers"

export async function PUT(req, { params }) {
  try {
    const { id } = params
    const { status } = await req.json()
    const headersList = headers()
    const token = headersList.get("authorization")?.split(" ")[1]

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/admin/applications/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    })

    if (!response.ok) {
      throw new Error("Failed to update application status")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error updating application status:", error)
    return NextResponse.json({ error: "An error occurred while updating the application status" }, { status: 500 })
  }
}

