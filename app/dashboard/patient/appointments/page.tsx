import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Plus, Filter } from "lucide-react";
import Link from "next/link";
import { PatientNavigation } from "@/components/patient-navigation";
import { ChatbotWidget } from "@/components/chatbot-widget";

export default function PatientAppointments() {
  const appointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "2024-12-15",
      time: "10:00 AM",
      location: "Room 205, Cardiology Wing",
      type: "Follow-up",
      status: "confirmed",
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "Dermatology",
      date: "2024-12-20",
      time: "2:30 PM",
      location: "Room 102, Dermatology Clinic",
      type: "Consultation",
      status: "confirmed",
    },
    {
      id: 3,
      doctor: "Dr. Emily Rodriguez",
      specialty: "General Medicine",
      date: "2024-12-25",
      time: "11:15 AM",
      location: "Room 301, General Wing",
      type: "Annual Check-up",
      status: "pending",
    },
  ];

  const pastAppointments = [
    {
      id: 4,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "2024-12-05",
      time: "10:00 AM",
      type: "Consultation",
      status: "completed",
    },
    {
      id: 5,
      doctor: "Dr. Robert Wilson",
      specialty: "Orthopedics",
      date: "2024-11-28",
      time: "3:00 PM",
      type: "Follow-up",
      status: "completed",
    },
    {
      id: 6,
      doctor: "Dr. Priya Swaminarayan",
      specialty: "Orthopedics",
      date: "2024-11-28",
      time: "3:00 PM",
      type: "Follow-up",
      status: "completed",
    },
    {
      id: 8,
      doctor: "Dr. Ankit Mishra",
      specialty: "Orthopedics",
      date: "2024-11-28",
      time: "3:00 PM",
      type: "Follow-up",
      status: "completed",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <PatientNavigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Appointments</h1>
            <p className="text-gray-600">Manage your upcoming and past appointments</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Link href="/dashboard/patient/appointments/book">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Book Appointment
              </Button>
            </Link>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <Card className="mb-8 border-blue-100">
          <CardHeader>
            <CardTitle className="text-blue-900">Upcoming Appointments</CardTitle>
            <CardDescription>Your scheduled medical appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="p-6 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-lg font-semibold text-blue-900">{appointment.doctor}</h3>
                        <Badge variant="outline" className="border-blue-200 text-blue-700">
                          {appointment.specialty}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={
                            appointment.status === "confirmed"
                              ? "border-green-200 text-green-700 bg-green-50"
                              : "border-yellow-200 text-yellow-700 bg-yellow-50"
                          }
                        >
                          {appointment.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-blue-600" />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-blue-600" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-blue-600" />
                          <span>{appointment.location}</span>
                        </div>
                      </div>

                      <p className="text-sm text-blue-700 mt-2">Appointment Type: {appointment.type}</p>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                        Reschedule
                      </Button>
                      <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Past Appointments */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Past Appointments</CardTitle>
            <CardDescription>Your appointment history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pastAppointments.map((appointment) => (
                <div key={appointment.id} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-gray-900">{appointment.doctor}</h4>
                        <Badge variant="outline" className="border-gray-300 text-gray-600">
                          {appointment.specialty}
                        </Badge>
                        <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50">
                          {appointment.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{appointment.date}</span>
                        <span>{appointment.time}</span>
                        <span>{appointment.type}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <ChatbotWidget />
    </div>
  );
}
