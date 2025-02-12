import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { jwtDecode } from "jwt-decode"

export async function GET(req) {
  try {
    const headersList = await headers()
    const token = headersList.get("authorization")?.split(" ")[1]

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decodedToken = jwtDecode(token)
    if (!decodedToken.isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/admin/applications`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json({ error: errorData.message }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching applications:", error)
    return NextResponse.json({ error: "An error occurred while fetching applications" }, { status: 500 })
  }
}

