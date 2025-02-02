import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const applicationData = await req.json()

    console.log('NEXT_PUBLIC_BACKEND_URL:', process.env.NEXT_PUBLIC_BACKEND_URL);
    console.log('applicationData:', applicationData);

    if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
      throw new Error('NEXT_PUBLIC_BACKEND_URL is not defined');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applicationData),
    })

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response text:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json()
    console.log('Response data:', data);
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error submitting application:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}