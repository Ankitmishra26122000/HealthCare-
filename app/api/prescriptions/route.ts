import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Prescription from "@/models/Prescription"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const user = await verifyToken(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const query: any = {}

    if (user.role === "patient") {
      query.patient = user.userId
    } else if (user.role === "doctor") {
      query.doctor = user.userId
    }

    const prescriptions = await Prescription.find(query)
      .populate("patient", "firstName lastName email")
      .populate("doctor", "firstName lastName specialty")
      .sort({ createdAt: -1 })

    return NextResponse.json({ prescriptions })
  } catch (error: any) {
    console.error("Get prescriptions error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const user = await verifyToken(request)
    if (!user || (user.role !== "doctor" && user.role !== "admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    const prescription = new Prescription({
      ...body,
      doctor: user.userId,
    })

    await prescription.save()

    const populatedPrescription = await Prescription.findById(prescription._id)
      .populate("patient", "firstName lastName email")
      .populate("doctor", "firstName lastName specialty")

    return NextResponse.json(
      { message: "Prescription created successfully", prescription: populatedPrescription },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("Create prescription error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
