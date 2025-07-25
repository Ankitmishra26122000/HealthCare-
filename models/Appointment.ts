import mongoose, { type Document, Schema } from "mongoose"

export interface IAppointment extends Document {
  _id: string
  patient: mongoose.Types.ObjectId
  doctor: mongoose.Types.ObjectId
  date: Date
  time: string
  duration: number
  type: "consultation" | "follow-up" | "check-up" | "emergency" | "procedure"
  mode: "in-person" | "video" | "phone"
  status: "scheduled" | "confirmed" | "completed" | "cancelled" | "no-show"
  reason: string
  notes?: string
  location?: string
  createdAt: Date
  updatedAt: Date
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 30, // minutes
    },
    type: {
      type: String,
      enum: ["consultation", "follow-up", "check-up", "emergency", "procedure"],
      required: true,
    },
    mode: {
      type: String,
      enum: ["in-person", "video", "phone"],
      default: "in-person",
    },
    status: {
      type: String,
      enum: ["scheduled", "confirmed", "completed", "cancelled", "no-show"],
      default: "scheduled",
    },
    reason: {
      type: String,
      required: true,
    },
    notes: String,
    location: String,
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Appointment || mongoose.model<IAppointment>("Appointment", AppointmentSchema)
