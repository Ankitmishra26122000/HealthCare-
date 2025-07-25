import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"

export async function GET() {
  try {
    console.log("🧪 Testing database connection...")

    // Test connection
    await connectDB()
    console.log("✅ Database connected successfully")

    // Test model
    const userCount = await User.countDocuments()
    console.log(`📊 Total users in database: ${userCount}`)

    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      userCount,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("❌ Database test failed:", error)

    return NextResponse.json(
      {
        success: false,
        error: error.message,
        details: {
          name: error.name,
          code: error.code,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 500 },
    )
  }
}
