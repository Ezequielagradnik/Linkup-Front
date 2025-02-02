import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const applicationData = await req.json()

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applicationData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error submitting application:", error)
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 })
  }
}

