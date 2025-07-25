import mongoose, { type Document, Schema } from "mongoose"

export interface IMedicalRecord extends Document {
  _id: string
  patient: mongoose.Types.ObjectId
  doctor: mongoose.Types.ObjectId
  type: "lab-result" | "imaging" | "consultation-notes" | "vaccination" | "procedure"
  title: string
  description?: string
  results?: any
  attachments?: string[]
  date: Date
  status: "normal" | "abnormal" | "pending" | "completed"
  category: string
  createdAt: Date
  updatedAt: Date
}

const MedicalRecordSchema = new Schema<IMedicalRecord>(
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
    type: {
      type: String,
      enum: ["lab-result", "imaging", "consultation-notes", "vaccination", "procedure"],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    results: Schema.Types.Mixed,
    attachments: [String],
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["normal", "abnormal", "pending", "completed"],
      default: "pending",
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.MedicalRecord || mongoose.model<IMedicalRecord>("MedicalRecord", MedicalRecordSchema)
