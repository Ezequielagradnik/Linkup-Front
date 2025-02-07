import { NextResponse } from "next/server"

export async function PUT(req, { params }) {
  try {
    const { id } = params
    const { status } = await req.json()

    const response = await fetch(`${process.env.BACKEND_URL}/api/admin/applications/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json({ error: errorData.message }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error updating application status:", error)
    return NextResponse.json({ error: "An error occurred while updating the application status" }, { status: 500 })
  }
}

