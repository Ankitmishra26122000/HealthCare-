import mongoose, { type Document, Schema } from "mongoose"

export interface IMedication {
  name: string
  dosage: string
  frequency: string
  timing: string
  duration: string
  instructions?: string
}

export interface IPrescription extends Document {
  _id: string
  patient: mongoose.Types.ObjectId
  doctor: mongoose.Types.ObjectId
  prescriptionId: string
  diagnosis: string
  medications: IMedication[]
  generalInstructions?: string
  followUpDate?: Date
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const MedicationSchema = new Schema<IMedication>({
  name: {
    type: String,
    required: true,
  },
  dosage: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
  },
  timing: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  instructions: String,
})

const PrescriptionSchema = new Schema<IPrescription>(
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
    prescriptionId: {
      type: String,
      unique: true,
      required: true,
    },
    diagnosis: {
      type: String,
      required: true,
    },
    medications: [MedicationSchema],
    generalInstructions: String,
    followUpDate: Date,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

// Generate prescription ID before saving
PrescriptionSchema.pre("save", function (next) {
  if (!this.prescriptionId) {
    this.prescriptionId = `RX-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  }
  next()
})

export default mongoose.models.Prescription || mongoose.model<IPrescription>("Prescription", PrescriptionSchema)
