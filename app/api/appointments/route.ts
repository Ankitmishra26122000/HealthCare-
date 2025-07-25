import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Appointment from "@/models/Appointment"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const user = await verifyToken(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const date = searchParams.get("date")

    const query: any = {}

    if (user.role === "patient") {
      query.patient = user.userId
    } else if (user.role === "doctor") {
      query.doctor = user.userId
    }

    if (status) query.status = status
    if (date) {
      const startDate = new Date(date)
      const endDate = new Date(date)
      endDate.setDate(endDate.getDate() + 1)
      query.date = { $gte: startDate, $lt: endDate }
    }

    const appointments = await Appointment.find(query)
      .populate("patient", "firstName lastName email phone")
      .populate("doctor", "firstName lastName specialty")
      .sort({ date: 1, time: 1 })

    return NextResponse.json({ appointments })
  } catch (error: any) {
    console.error("Get appointments error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const user = await verifyToken(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    const appointment = new Appointment({
      ...body,
      patient: user.role === "patient" ? user.userId : body.patient,
    })

    await appointment.save()

    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate("patient", "firstName lastName email phone")
      .populate("doctor", "firstName lastName specialty")

    return NextResponse.json(
      { message: "Appointment created successfully", appointment: populatedAppointment },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("Create appointment error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
