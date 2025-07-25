export default function DoctorSchedulePage() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"]

  const appointments = [
    {
      id: 1,
      patient: "Arjun Sharma",
      day: "Monday",
      time: "9:00 AM",
      type: "Follow-up",
      status: "confirmed",
    },
    {
      id: 2,
      patient: "Priya Patel",
      day: "Monday",
      time: "11:00 AM",
      type: "Consultation",
      status: "confirmed",
    },
    {
      id: 3,
      patient: "Vikram Desai",
      day: "Tuesday",
      time: "10:00 AM",
      type: "Check-up",
      status: "pending",
    },
    {
      id: 4,
      patient: "Meera Joshi",
      day: "Wednesday",
      time: "3:30 PM",
      type: "Follow-up",
      status: "confirmed",
    },
    {
      id: 5,
      patient: "Ananya Mehta",
      day: "Thursday",
      time: "2:00 PM",
      type: "Consultation",
      status: "confirmed",
    },
    {
      id: 6,
      patient: "Rajesh Kumar",
      day: "Friday",
      time: "11:00 AM",
      type: "Check-up",
      status: "confirmed",
    },
    {
      id: 7,
      patient: "Kavita Singh",
      day: "Friday",
      time: "4:00 PM",
      type: "Follow-up",
      status: "pending",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <DoctorNavigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Weekly Schedule</h1>
            <p className="text-gray-600">Manage your appointments and availability</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="border-green-200 text-green-600 hover:bg-green-50">
              <Calendar className="h-4 w-4 mr-2" />
              Export Calendar
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Appointment
            </Button>
          </div>
        </div>

        {/* Weekly Schedule */}
        <Card className="mb-8 border-green-100">
          <CardHeader>
            <CardTitle className="text-green-900">December 12-18, 2024</CardTitle>
            <CardDescription>Your weekly appointment schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-4">
              {days.map((day) => (
                <div key={day} className="space-y-4">
                  <div className="text-center p-2 bg-green-100 rounded-md">
                    <h3 className="font-medium text-green-900">{day}</h3>
                  </div>
                  <div className="space-y-2">
                    {appointments
                      .filter((appointment) => appointment.day === day)
                      .map((appointment) => (
                        <div
                          key={appointment.id}
                          className={`p-2 rounded-md text-sm ${
                            appointment.status === "confirmed"
                              ? "bg-green-50 border border-green-200"
                              : "bg-yellow-50 border border-yellow-200"
                          }`}
                        >
                          <p className="font-medium">{appointment.time}</p>
                          <p className="truncate">{appointment.patient}</p>
                          <div className="flex justify-between items-center mt-1">
                            <Badge
                              variant="outline"
                              className={
                                appointment.status === "confirmed"
                                  ? "border-green-200 text-green-700 text-xs"
                                  : "border-yellow-200 text-yellow-700 text-xs"
                              }
                            >
                              {appointment.type}
                            </Badge>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    {appointments.filter((appointment) => appointment.day === day).length === 0 && (
                      <div className="p-2 rounded-md text-sm bg-gray-50 border border-gray-200 text-center text-gray-500">
                        No appointments
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Manage Availability */}
        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle className="text-blue-900">Manage Availability</CardTitle>
            <CardDescription>Set your available time slots</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Available Time Slots</h3>
                <div className="space-y-2">
                  {timeSlots.map((slot) => (
                    <div key={slot} className="flex items-center space-x-2">
                      <Checkbox id={`slot-${slot}`} defaultChecked />
                      <Label htmlFor={`slot-${slot}`}>{slot}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Working Days</h3>
                <div className="space-y-2">
                  {days.map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                      <Checkbox id={`day-${day}`} defaultChecked={day !== "Sunday"} />
                      <Label htmlFor={`day-${day}`}>{day}</Label>
                    </div>
                  ))}
                </div>
                <Button className="mt-6 bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Availability
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <ChatbotWidget />
    </div>
  )
}

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Calendar, Plus, MoreHorizontal, Save } from "lucide-react"
import { DoctorNavigation } from "@/components/doctor-navigation"
import { ChatbotWidget } from "@/components/chatbot-widget"
