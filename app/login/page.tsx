"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Heart, User, Stethoscope, Shield, Loader2 } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("patient")
  const router = useRouter()
  const { login } = useAuth()

  const [formData, setFormData] = useState({
    patient: { email: "", password: "" },
    doctor: { email: "", password: "" },
    admin: { email: "", password: "" },
  })

  const handleInputChange = (role: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [role]: { ...prev[role as keyof typeof prev], [field]: value },
    }))
  }

  const handleSubmit = async (role: string) => {
    setLoading(true)
    setError("")

    const { email, password } = formData[role as keyof typeof formData]

    if (!email || !password) {
      setError("Please fill in all fields")
      setLoading(false)
      return
    }

    const success = await login(email, password, role)

    if (success) {
      // Redirect based on role
      switch (role) {
        case "patient":
          router.push("/dashboard/patient")
          break
        case "doctor":
          router.push("/dashboard/doctor")
          break
        case "admin":
          router.push("/dashboard/admin")
          break
      }
    } else {
      setError("Invalid credentials. Please try again.")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">HealthCare+</span>
          </Link>
          <p className="text-gray-600">Welcome back to your health dashboard</p>
        </div>

        <Card className="border-blue-100 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-blue-900">Sign In</CardTitle>
            <CardDescription>Choose your role and sign in to continue</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-4 border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="patient" className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  Patient
                </TabsTrigger>
                <TabsTrigger value="doctor" className="flex items-center gap-1">
                  <Stethoscope className="h-4 w-4" />
                  Doctor
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-1">
                  <Shield className="h-4 w-4" />
                  Admin
                </TabsTrigger>
              </TabsList>

              {["patient", "doctor", "admin"].map((role) => (
                <TabsContent key={role} value={role} className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor={`${role}-email`}>Email</Label>
                    <Input
                      id={`${role}-email`}
                      type="email"
                      placeholder={`${role}@healthcare.com`}
                      value={formData[role as keyof typeof formData].email}
                      onChange={(e) => handleInputChange(role, "email", e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`${role}-password`}>Password</Label>
                    <Input
                      id={`${role}-password`}
                      type="password"
                      placeholder="••••••"
                      value={formData[role as keyof typeof formData].password}
                      onChange={(e) => handleInputChange(role, "password", e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <Button
                    onClick={() => handleSubmit(role)}
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      `Sign In as ${role.charAt(0).toUpperCase() + role.slice(1)}`
                    )}
                  </Button>
                </TabsContent>
              ))}
            </Tabs>

            <div className="mt-6 text-center">
              <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                Forgot your password?
              </Link>
            </div>

            <div className="mt-4 text-center">
              <span className="text-sm text-gray-600">Don't have an account? </span>
              <Link href="/register" className="text-sm text-blue-600 hover:underline">
                Sign up here
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
