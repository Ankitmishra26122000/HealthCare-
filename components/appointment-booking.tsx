"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, CheckCircle } from "lucide-react"

interface Doctor {
  id: string
  name: string
  specialty: string
  rating: number
  nextAvailable: string
}

interface TimeSlot {
  time: string
  available: boolean
}

export function AppointmentBooking() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [appointmentType, setAppointmentType] = useState("")
  const [reason, setReason] = useState("")
  const [isBooking, setIsBooking] = useState(false)
  const [isBooked, setIsBooked] = useState(false)
  const [bookingId, setBookingId] = useState("")

  const doctors: Doctor[] = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      rating: 4.9,
      nextAvailable: "Today, 2:30 PM",
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      specialty: "Dermatology",
      rating: 4.7,
      nextAvailable: "Tomorrow, 10:00 AM",
    },
    {
      id: "3",
      name: "Dr. Priya Patel",
      specialty: "General Medicine",
      rating: 4.8,
      nextAvailable: "Today, 4:00 PM",
    },
  ]

  const timeSlots: TimeSlot[] = [
    { time: "9:00 AM", available: true },
    { time: "9:30 AM", available: false },
    { time: "10:00 AM", available: true },
    { time: "10:30 AM", available: true },
    { time: "11:00 AM", available: false },
    { time: "11:30 AM", available: true },
    { time: "2:00 PM", available: true },
    { time: "2:30 PM", available: true },
    { time: "3:00 PM", available: false },
    { time: "3:30 PM", available: true },
    { time: "4:00 PM", available: true },
    { time: "4:30 PM", available: true },
  ]

  const handleBookAppointment = async () => {
    if (!selectedDoctor || !selectedDate || !selectedTime || !appointmentType) {
      alert("Please fill in all required fields")
      return
    }

    setIsBooking(true)

    // Simulate booking process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const newBookingId = `APT-${Date.now()}`
    setBookingId(newBookingId)
    setIsBooking(false)
    setIsBooked(true)
  }

  const handleNewBooking = () => {
    setIsBooked(false)
    setSelectedDoctor(null)
    setSelectedDate("")
    setSelectedTime("")
    setAppointmentType("")
    setReason("")
    setBookingId("")
  }

  if (isBooked) {
    return (
      <Card className="border-green-100">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-900 mb-2">Appointment Booked Successfully!</h2>
          <p className="text-green-700 mb-6">Your appointment has been confirmed</p>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-sm text-green-600 font-medium">Booking ID</p>
                <p className="text-green-900 font-semibold">{bookingId}</p>
              </div>
              <div>
                <p className="text-sm text-green-600 font-medium">Doctor</p>
                <p className="text-green-900 font-semibold">{selectedDoctor?.name}</p>
              </div>
              <div>
                <p className="text-sm text-green-600 font-medium">Date & Time</p>
                <p className="text-green-900 font-semibold">
                  {selectedDate} at {selectedTime}
                </p>
              </div>
              <div>
                <p className="text-sm text-green-600 font-medium">Type</p>
                <p className="text-green-900 font-semibold">{appointmentType}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-sm text-green-700 mb-6">
            <p>✓ Confirmation email sent to your registered email</p>
            <p>✓ SMS reminder will be sent 24 hours before appointment</p>
            <p>✓ Doctor has been notified about your appointment</p>
          </div>

          <div className="flex gap-3 justify-center">
            <Button onClick={handleNewBooking} className="bg-blue-600 hover:bg-blue-700">
              Book Another Appointment
            </Button>
            <Button variant="outline" className="border-green-200 text-green-600 hover:bg-green-50">
              View My Appointments
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Doctor Selection */}
      <Card className="border-blue-100">
        <CardHeader>
          <CardTitle className="text-blue-900">Select Doctor</CardTitle>
          <CardDescription>Choose your preferred doctor</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedDoctor?.id === doctor.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300"
                }`}
                onClick={() => setSelectedDoctor(doctor)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-900">{doctor.name}</h4>
                    <p className="text-blue-600">{doctor.specialty}</p>
                    <p className="text-sm text-gray-500">Next available: {doctor.nextAvailable}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="border-yellow-200 text-yellow-700">
                      ⭐ {doctor.rating}
                    </Badge>
                    {selectedDoctor?.id === doctor.id && <Badge className="bg-blue-600 mt-2">Selected</Badge>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Date and Time Selection */}
      {selectedDoctor && (
        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle className="text-blue-900">Select Date & Time</CardTitle>
            <CardDescription>Choose your preferred appointment slot</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="appointment-date">Date</Label>
                <div className="relative">
                  <Input
                    id="appointment-date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="appointment-type">Appointment Type</Label>
                <Select value={appointmentType} onValueChange={setAppointmentType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consultation">Consultation</SelectItem>
                    <SelectItem value="follow-up">Follow-up</SelectItem>
                    <SelectItem value="check-up">Regular Check-up</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {selectedDate && (
              <div className="space-y-2">
                <Label>Available Time Slots</Label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot.time}
                      variant={selectedTime === slot.time ? "default" : "outline"}
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`${
                        selectedTime === slot.time
                          ? "bg-blue-600 hover:bg-blue-700"
                          : slot.available
                            ? "border-blue-200 text-blue-600 hover:bg-blue-50"
                            : "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      <Clock className="h-4 w-4 mr-1" />
                      {slot.time}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Appointment Details */}
      {selectedTime && (
        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle className="text-blue-900">Appointment Details</CardTitle>
            <CardDescription>Provide additional information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Visit</Label>
              <Textarea
                id="reason"
                placeholder="Briefly describe your symptoms or reason for the appointment..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Appointment Summary</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-blue-600">Doctor:</span> {selectedDoctor.name}
                </div>
                <div>
                  <span className="text-blue-600">Specialty:</span> {selectedDoctor.specialty}
                </div>
                <div>
                  <span className="text-blue-600">Date:</span> {selectedDate}
                </div>
                <div>
                  <span className="text-blue-600">Time:</span> {selectedTime}
                </div>
                <div>
                  <span className="text-blue-600">Type:</span> {appointmentType}
                </div>
                <div>
                  <span className="text-blue-600">Duration:</span> 30 minutes
                </div>
              </div>
            </div>

            <Button
              onClick={handleBookAppointment}
              disabled={isBooking}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {isBooking ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Booking Appointment...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Book Appointment
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
