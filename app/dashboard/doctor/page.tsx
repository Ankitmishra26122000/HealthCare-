import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, FileText, Clock, TrendingUp, Plus, Search } from "lucide-react"
import Link from "next/link"
import { DoctorNavigation } from "@/components/doctor-navigation"
import { ChatbotWidget } from "@/components/chatbot-widget"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function DoctorDashboard() {
  const todayAppointments = [
    {
      id: 1,
      patient: "Arjun Sharma",
      time: "9:00 AM",
      type: "Follow-up",
      status: "confirmed",
    },
    {
      id: 2,
      patient: "Priya Patel",
      time: "10:30 AM",
      type: "Consultation",
      status: "confirmed",
    },
    {
      id: 3,
      patient: "Vikram Desai",
      time: "2:00 PM",
      type: "Check-up",
      status: "pending",
    },
    {
      id: 4,
      patient: "Meera Joshi",
      time: "3:30 PM",
      type: "Follow-up",
      status: "confirmed",
    },
  ]

  const recentPatients = [
    {
      id: 1,
      name: "Ananya Mehta",
      lastVisit: "2024-12-10",
      condition: "Hypertension",
      status: "Stable",
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      lastVisit: "2024-12-09",
      condition: "Diabetes",
      status: "Monitoring",
    },
    {
      id: 3,
      name: "Kavita Singh",
      lastVisit: "2024-12-08",
      condition: "Asthma",
      status: "Improved",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <DoctorNavigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Good morning, Dr. Mehta!</h1>
          <p className="text-gray-600">You have 4 appointments scheduled for today</p>
        </div>

        {/* Hospital Info Card */}
        <Card className="mb-8 border-blue-100 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
              <h2 className="text-xl font-bold mb-2">Vadodara Medical Center</h2>
              <p className="text-blue-100 mb-4">Alkapuri, Vadodara, Gujarat</p>
              <div className="space-y-2 text-sm">
                <p className="flex items-center">
                  <span className="w-24">Working Hours:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </p>
                <p className="flex items-center">
                  <span className="w-24">Your Room:</span>
                  <span>304, Cardiology Wing</span>
                </p>
                <p className="flex items-center">
                  <span className="w-24">Next Shift:</span>
                  <span>Tomorrow, 9:00 AM</span>
                </p>
              </div>
            </div>
            <div className="md:w-2/3 p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Today's Hospital Updates</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Badge className="mt-0.5 bg-blue-600">New</Badge>
                  <p className="text-sm text-gray-600">Staff meeting scheduled for 5:00 PM in Conference Room B</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge className="mt-0.5 bg-green-600">Update</Badge>
                  <p className="text-sm text-gray-600">
                    New MRI equipment has been installed in the Radiology department
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge className="mt-0.5 bg-purple-600">Reminder</Badge>
                  <p className="text-sm text-gray-600">Please submit your monthly patient reports by Friday</p>
                </div>
              </div>
              <div className="mt-4 flex space-x-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                      View All Updates
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Hospital Updates</DialogTitle>
                      <DialogDescription>
                        Latest announcements and updates from Vadodara Medical Center
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div className="border-b pb-3">
                        <h4 className="font-medium">Staff Meeting</h4>
                        <p className="text-sm text-gray-600">
                          Staff meeting scheduled for 5:00 PM in Conference Room B to discuss new treatment protocols.
                        </p>
                      </div>
                      <div className="border-b pb-3">
                        <h4 className="font-medium">New Equipment</h4>
                        <p className="text-sm text-gray-600">
                          New MRI equipment has been installed in the Radiology department. Training sessions will be
                          held next week.
                        </p>
                      </div>
                      <div className="border-b pb-3">
                        <h4 className="font-medium">Monthly Reports</h4>
                        <p className="text-sm text-gray-600">
                          Please submit your monthly patient reports by Friday. The new reporting system is now active.
                        </p>
                      </div>
                      <div className="border-b pb-3">
                        <h4 className="font-medium">Holiday Schedule</h4>
                        <p className="text-sm text-gray-600">
                          The hospital will operate with reduced staff during the upcoming Diwali holidays. Please
                          submit your availability.
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button className="bg-blue-600 hover:bg-blue-700">Contact Administration</Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Today's Appointments</p>
                  <p className="text-2xl font-bold text-green-900">4</p>
                </div>
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Patients</p>
                  <p className="text-2xl font-bold text-blue-900">156</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Pending Reviews</p>
                  <p className="text-2xl font-bold text-purple-900">8</p>
                </div>
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600">Avg. Consultation</p>
                  <p className="text-2xl font-bold text-orange-900">25m</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Today's Schedule */}
          <Card className="border-green-100">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-green-900">Today's Schedule</CardTitle>
                <Link href="/dashboard/doctor/appointments">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Slot
                  </Button>
                </Link>
              </div>
              <CardDescription>Your appointments for December 12, 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-green-900">{appointment.patient}</h4>
                      <p className="text-sm text-green-600">{appointment.type}</p>
                      <p className="text-sm text-gray-600">{appointment.time}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        appointment.status === "confirmed"
                          ? "border-green-200 text-green-700"
                          : "border-yellow-200 text-yellow-700"
                      }
                    >
                      {appointment.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Patients */}
          <Card className="border-blue-100">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-blue-900">Recent Patients</CardTitle>
                <Link href="/dashboard/doctor/patients">
                  <Button size="sm" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    <Search className="h-4 w-4 mr-2" />
                    Search All
                  </Button>
                </Link>
              </div>
              <CardDescription>Recently treated patients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPatients.map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-blue-900">{patient.name}</h4>
                      <p className="text-sm text-blue-600">{patient.condition}</p>
                      <p className="text-sm text-gray-600">Last visit: {patient.lastVisit}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        patient.status === "Stable"
                          ? "border-green-200 text-green-700"
                          : patient.status === "Improved"
                            ? "border-blue-200 text-blue-700"
                            : "border-yellow-200 text-yellow-700"
                      }
                    >
                      {patient.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8 border-purple-100">
          <CardHeader>
            <CardTitle className="text-purple-900">Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/dashboard/doctor/patients/new">
                <Button
                  variant="outline"
                  className="w-full h-20 flex-col border-green-200 text-green-700 hover:bg-green-50"
                >
                  <Users className="h-6 w-6 mb-2" />
                  Add Patient
                </Button>
              </Link>
              <Link href="/dashboard/doctor/prescriptions/new">
                <Button
                  variant="outline"
                  className="w-full h-20 flex-col border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  <FileText className="h-6 w-6 mb-2" />
                  Write Prescription
                </Button>
              </Link>
              <Link href="/dashboard/doctor/schedule">
                <Button
                  variant="outline"
                  className="w-full h-20 flex-col border-purple-200 text-purple-700 hover:bg-purple-50"
                >
                  <Calendar className="h-6 w-6 mb-2" />
                  Manage Schedule
                </Button>
              </Link>
              <Link href="/dashboard/doctor/analytics">
                <Button
                  variant="outline"
                  className="w-full h-20 flex-col border-orange-200 text-orange-700 hover:bg-orange-50"
                >
                  <TrendingUp className="h-6 w-6 mb-2" />
                  View Analytics
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>

      <ChatbotWidget />
    </div>
  );
}
