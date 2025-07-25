"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Heart, User, Stethoscope, Loader2 } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("patient")
  const router = useRouter()
  const { register } = useAuth()

  const [patientData, setPatientData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    password: "",
    confirmPassword: "",
  })

  const [doctorData, setDoctorData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    licenseNumber: "",
    specialty: "",
    experience: "",
    clinic: "",
    password: "",
    confirmPassword: "",
  })

  const handlePatientChange = (field: string, value: string) => {
    setPatientData((prev) => ({ ...prev, [field]: value }))
  }

  const handleDoctorChange = (field: string, value: string) => {
    setDoctorData((prev) => ({ ...prev, [field]: value }))
  }

  const validateForm = (data: any, role: string) => {
    if (!data.firstName || !data.lastName || !data.email || !data.password) {
      return "Please fill in all required fields"
    }

    if (data.password !== data.confirmPassword) {
      return "Passwords do not match"
    }

    if (data.password.length < 6) {
      return "Password must be at least 6 characters long"
    }

    if (role === "doctor" && (!data.licenseNumber || !data.specialty)) {
      return "License number and specialty are required for doctors"
    }

    return null
  }

  const handleSubmit = async (role: string) => {
    setLoading(true)
    setError("")

    const data = role === "patient" ? patientData : doctorData
    const validationError = validateForm(data, role)

    if (validationError) {
      setError(validationError)
      setLoading(false)
      return
    }

    const { confirmPassword, ...submitData } = data
    const userData = { ...submitData, role }

    const success = await register(userData)

    if (success) {
      // Redirect based on role
      switch (role) {
        case "patient":
          router.push("/dashboard/patient")
          break
        case "doctor":
          router.push("/dashboard/doctor")
          break
      }
    } else {
      setError("Registration failed. Please try again.")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">HealthCare+</span>
          </Link>
          <p className="text-gray-600">Create your account to get started</p>
        </div>

        <Card className="border-blue-100 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-blue-900">Create Account</CardTitle>
            <CardDescription>Choose your role and fill in your details</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-4 border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="patient" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Patient Registration
                </TabsTrigger>
                <TabsTrigger value="doctor" className="flex items-center gap-2">
                  <Stethoscope className="h-4 w-4" />
                  Doctor Registration
                </TabsTrigger>
              </TabsList>

              <TabsContent value="patient" className="space-y-4 mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient-first-name">First Name *</Label>
                    <Input
                      id="patient-first-name"
                      placeholder="Arjun"
                      value={patientData.firstName}
                      onChange={(e) => handlePatientChange("firstName", e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patient-last-name">Last Name *</Label>
                    <Input
                      id="patient-last-name"
                      placeholder="Sharma"
                      value={patientData.lastName}
                      onChange={(e) => handlePatientChange("lastName", e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patient-email">Email *</Label>
                  <Input
                    id="patient-email"
                    type="email"
                    placeholder="arjun.sharma@gmail.com"
                    value={patientData.email}
                    onChange={(e) => handlePatientChange("email", e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patient-phone">Phone Number</Label>
                  <Input
                    id="patient-phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={patientData.phone}
                    onChange={(e) => handlePatientChange("phone", e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient-dob">Date of Birth</Label>
                    <Input
                      id="patient-dob"
                      type="date"
                      value={patientData.dateOfBirth}
                      onChange={(e) => handlePatientChange("dateOfBirth", e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patient-gender">Gender</Label>
                    <Select value={patientData.gender} onValueChange={(value) => handlePatientChange("gender", value)}>
                      <SelectTrigger id="patient-gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patient-address">Address</Label>
                  <Textarea
                    id="patient-address"
                    placeholder="Alkapuri, Vadodara, Gujarat"
                    value={patientData.address}
                    onChange={(e) => handlePatientChange("address", e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patient-password">Password *</Label>
                  <Input
                    id="patient-password"
                    type="password"
                    placeholder="Minimum 6 characters"
                    value={patientData.password}
                    onChange={(e) => handlePatientChange("password", e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patient-confirm-password">Confirm Password *</Label>
                  <Input
                    id="patient-confirm-password"
                    type="password"
                    placeholder="Confirm your password"
                    value={patientData.confirmPassword}
                    onChange={(e) => handlePatientChange("confirmPassword", e.target.value)}
                    disabled={loading}
                  />
                </div>
                <Button
                  onClick={() => handleSubmit("patient")}
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Patient Account"
                  )}
                </Button>
              </TabsContent>

              <TabsContent value="doctor" className="space-y-4 mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="doctor-first-name">First Name *</Label>
                    <Input
                      id="doctor-first-name"
                      placeholder="Dr. Rajesh"
                      value={doctorData.firstName}
                      onChange={(e) => handleDoctorChange("firstName", e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doctor-last-name">Last Name *</Label>
                    <Input
                      id="doctor-last-name"
                      placeholder="Patel"
                      value={doctorData.lastName}
                      onChange={(e) => handleDoctorChange("lastName", e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doctor-email">Email *</Label>
                  <Input
                    id="doctor-email"
                    type="email"
                    placeholder="dr.rajesh.patel@gmail.com"
                    value={doctorData.email}
                    onChange={(e) => handleDoctorChange("email", e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doctor-phone">Phone Number</Label>
                  <Input
                    id="doctor-phone"
                    type="tel"
                    placeholder="+91 98765 12345"
                    value={doctorData.phone}
                    onChange={(e) => handleDoctorChange("phone", e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="doctor-license">Medical License *</Label>
                    <Input
                      id="doctor-license"
                      placeholder="MCI-123456"
                      value={doctorData.licenseNumber}
                      onChange={(e) => handleDoctorChange("licenseNumber", e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doctor-specialty">Specialty *</Label>
                    <Select
                      value={doctorData.specialty}
                      onValueChange={(value) => handleDoctorChange("specialty", value)}
                    >
                      <SelectTrigger id="doctor-specialty">
                        <SelectValue placeholder="Select specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cardiology">Cardiology</SelectItem>
                        <SelectItem value="dermatology">Dermatology</SelectItem>
                        <SelectItem value="endocrinology">Endocrinology</SelectItem>
                        <SelectItem value="family-medicine">Family Medicine</SelectItem>
                        <SelectItem value="neurology">Neurology</SelectItem>
                        <SelectItem value="orthopedics">Orthopedics</SelectItem>
                        <SelectItem value="pediatrics">Pediatrics</SelectItem>
                        <SelectItem value="psychiatry">Psychiatry</SelectItem>
                        <SelectItem value="ayurveda">Ayurveda</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doctor-clinic">Clinic/Hospital</Label>
                  <Input
                    id="doctor-clinic"
                    placeholder="Vadodara Medical Center"
                    value={doctorData.clinic}
                    onChange={(e) => handleDoctorChange("clinic", e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doctor-experience">Years of Experience</Label>
                  <Input
                    id="doctor-experience"
                    type="number"
                    placeholder="5"
                    value={doctorData.experience}
                    onChange={(e) => handleDoctorChange("experience", e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doctor-password">Password *</Label>
                  <Input
                    id="doctor-password"
                    type="password"
                    placeholder="Minimum 6 characters"
                    value={doctorData.password}
                    onChange={(e) => handleDoctorChange("password", e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doctor-confirm-password">Confirm Password *</Label>
                  <Input
                    id="doctor-confirm-password"
                    type="password"
                    placeholder="Confirm your password"
                    value={doctorData.confirmPassword}
                    onChange={(e) => handleDoctorChange("confirmPassword", e.target.value)}
                    disabled={loading}
                  />
                </div>
                <Button
                  onClick={() => handleSubmit("doctor")}
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Doctor Account"
                  )}
                </Button>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <span className="text-sm text-gray-600">Already have an account? </span>
              <Link href="/login" className="text-sm text-blue-600 hover:underline">
                Sign in here
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
