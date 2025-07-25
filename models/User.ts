import mongoose, { type Document, Schema } from "mongoose"
import bcrypt from "bcryptjs"

export interface IUser extends Document {
  _id: string
  email: string
  password: string
  role: "patient" | "doctor" | "admin"
  firstName: string
  lastName: string
  phone?: string
  dateOfBirth?: Date
  gender?: "male" | "female" | "other"
  address?: string

  // Doctor specific fields
  licenseNumber?: string
  specialty?: string
  experience?: number
  clinic?: string

  // Patient specific fields
  bloodGroup?: string
  height?: number
  weight?: number
  allergies?: string[]
  emergencyContact?: {
    name: string
    phone: string
    relationship: string
  }

  isVerified: boolean
  createdAt: Date
  updatedAt: Date

  comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    role: {
      type: String,
      enum: {
        values: ["patient", "doctor", "admin"],
        message: "Role must be either patient, doctor, or admin",
      },
      required: [true, "Role is required"],
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      maxlength: [50, "First name cannot exceed 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      maxlength: [50, "Last name cannot exceed 50 characters"],
    },
    phone: {
      type: String,
      trim: true,
      match: [/^[+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number"],
    },
    dateOfBirth: {
      type: Date,
      validate: {
        validator: (date: Date) => date < new Date(),
        message: "Date of birth must be in the past",
      },
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: "Gender must be male, female, or other",
      },
    },
    address: {
      type: String,
      maxlength: [200, "Address cannot exceed 200 characters"],
    },

    // Doctor specific fields
    licenseNumber: {
      type: String,
      validate: {
        validator: function (this: IUser, value: string) {
          if (this.role === "doctor") {
            return !!value && value.length > 0
          }
          return true
        },
        message: "License number is required for doctors",
      },
    },
    specialty: {
      type: String,
      validate: {
        validator: function (this: IUser, value: string) {
          if (this.role === "doctor") {
            return !!value && value.length > 0
          }
          return true
        },
        message: "Specialty is required for doctors",
      },
    },
    experience: {
      type: Number,
      min: [0, "Experience cannot be negative"],
      max: [70, "Experience cannot exceed 70 years"],
    },
    clinic: String,

    // Patient specific fields
    bloodGroup: {
      type: String,
      enum: {
        values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        message: "Invalid blood group",
      },
    },
    height: {
      type: Number,
      min: [50, "Height must be at least 50 cm"],
      max: [300, "Height cannot exceed 300 cm"],
    },
    weight: {
      type: Number,
      min: [1, "Weight must be at least 1 kg"],
      max: [500, "Weight cannot exceed 500 kg"],
    },
    allergies: [String],
    emergencyContact: {
      name: String,
      phone: String,
      relationship: String,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

// Indexes for better performance
UserSchema.index({ email: 1, role: 1 })
UserSchema.index({ role: 1 })

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  try {
    console.log("🔐 Hashing password for user:", this.email)
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error: any) {
    console.error("❌ Password hashing error:", error)
    next(error)
  }
})

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password)
  } catch (error) {
    console.error("❌ Password comparison error:", error)
    return false
  }
}

// Prevent model re-compilation
export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema)
