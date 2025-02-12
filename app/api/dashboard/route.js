import { NextResponse } from "next/server"

export async function GET(request) {
  try {
    const token = request.headers.get("Authorization")?.split(" ")[1]
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 })
    }

    const backendUrl = process.env.BACKEND_URL || "https://linkup-back.vercel.app"
    console.log("Backend URL:", backendUrl)
    console.log("Full endpoint:", `${backendUrl}/api/dashboard`)

    console.log("Sending request to backend...")
    const response = await fetch(`${backendUrl}/api/dashboard`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Error response from backend:", errorData)
      return NextResponse.json(
        { error: errorData.error || "Error fetching dashboard data" },
        { status: response.status },
      )
    }

    const dashboardData = await response.json()
    console.log("Dashboard data received:", JSON.stringify(dashboardData, null, 2))

    return NextResponse.json(dashboardData)
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

