import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, Users, MapPin, Save, Check } from "lucide-react"
import { AdminNavigation } from "@/components/admin-navigation"
import { ChatbotWidget } from "@/components/chatbot-widget"

export default function ScheduleAppointmentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <AdminNavigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Schedule Appointment</h1>
            <p className="text-gray-600">Create and manage patient appointments</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            Save Appointment
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Appointment Details */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-900">Appointment Details</CardTitle>
                <CardDescription>Enter the appointment information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="appointment-type">Appointment Type</Label>
                    <Select defaultValue="consultation">
                      <SelectTrigger id="appointment-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consultation">Consultation</SelectItem>
                        <SelectItem value="follow-up">Follow-up</SelectItem>
                        <SelectItem value="check-up">Regular Check-up</SelectItem>
                        <SelectItem value="procedure">Medical Procedure</SelectItem>
                        <SelectItem value="emergency">Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="appointment-mode">Mode</Label>
                    <Select defaultValue="in-person">
                      <SelectTrigger id="appointment-mode">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in-person">In-Person</SelectItem>
                        <SelectItem value="video">Video Consultation</SelectItem>
                        <SelectItem value="phone">Phone Consultation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="appointment-date">Date</Label>
                    <div className="relative">
                      <Input id="appointment-date" type="date" />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-blue-600"
                      >
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="appointment-time">Time</Label>
                    <div className="relative">
                      <Input id="appointment-time" type="time" />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-blue-600"
                      >
                        <Clock className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="appointment-duration">Duration</Label>
                  <Select defaultValue="30">
                    <SelectTrigger id="appointment-duration">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="90">1.5 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="appointment-location">Location</Label>
                  <div className="relative">
                    <Input id="appointment-location" defaultValue="Room 205, Cardiology Wing" />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-blue-600"
                    >
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="appointment-reason">Reason for Visit</Label>
                  <Textarea
                    id="appointment-reason"
                    placeholder="Brief description of the appointment reason..."
                    defaultValue="Follow-up for diabetes management and blood pressure monitoring."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="appointment-notes">Additional Notes</Label>
                  <Textarea
                    id="appointment-notes"
                    placeholder="Any special instructions or notes..."
                    defaultValue="Patient should bring recent lab results and blood pressure readings from home monitoring."
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-900">Notification Settings</CardTitle>
                <CardDescription>Configure appointment reminders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="notify-email" className="rounded text-blue-600" defaultChecked />
                    <Label htmlFor="notify-email">Send email notification to patient</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="notify-sms" className="rounded text-blue-600" defaultChecked />
                    <Label htmlFor="notify-sms">Send SMS reminder to patient</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="notify-doctor" className="rounded text-blue-600" defaultChecked />
                    <Label htmlFor="notify-doctor">Notify doctor about the appointment</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="reminder-24h" className="rounded text-blue-600" defaultChecked />
                    <Label htmlFor="reminder-24h">Send 24-hour reminder</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Patient and Doctor Selection */}
          <div className="space-y-8">
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-900">Patient Selection</CardTitle>
                <CardDescription>Select the patient for this appointment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="patient-search">Search Patient</Label>
                  <div className="relative">
                    <Input id="patient-search" placeholder="Search by name or ID..." />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-blue-600"
                    >
                      <User className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="p-4 border border-blue-100 rounded-lg bg-blue-50">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Rahul Sharma</h4>
                      <p className="text-sm text-gray-500">ID: PAT-20241205</p>
                    </div>
                    <Badge className="ml-auto bg-blue-600">Selected</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                    <div>
                      <span className="text-gray-500">Age:</span> 32 years
                    </div>
                    <div>
                      <span className="text-gray-500">Gender:</span> Male
                    </div>
                    <div>
                      <span className="text-gray-500">Phone:</span> +91 98765 43210
                    </div>
                    <div>
                      <span className="text-gray-500">Email:</span> rahul@example.com
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-900">Doctor Selection</CardTitle>
                <CardDescription>Assign a doctor for this appointment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="doctor-search">Search Doctor</Label>
                  <div className="relative">
                    <Input id="doctor-search" placeholder="Search by name or specialty..." />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-blue-600"
                    >
                      <Users className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="doctor-specialty">Filter by Specialty</Label>
                  <Select defaultValue="cardiology">
                    <SelectTrigger id="doctor-specialty">
                      <SelectValue />
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
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-4 border border-blue-100 rounded-lg bg-blue-50">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Dr. Sarah Johnson</h4>
                      <p className="text-sm text-gray-500">Cardiology</p>
                    </div>
                    <Badge className="ml-auto bg-blue-600">Selected</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                    <div>
                      <span className="text-gray-500">Experience:</span> 12 years
                    </div>
                    <div>
                      <span className="text-gray-500">Rating:</span> 4.9/5
                    </div>
                    <div>
                      <span className="text-gray-500">Availability:</span>{" "}
                      <span className="text-green-600">Available</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Next Slot:</span> Today, 2:30 PM
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Dr. Michael Chen</h4>
                      <p className="text-sm text-gray-500">Cardiology</p>
                    </div>
                    <Button size="sm" variant="outline" className="ml-auto">
                      <Check className="h-4 w-4 mr-1" />
                      Select
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                    <div>
                      <span className="text-gray-500">Experience:</span> 8 years
                    </div>
                    <div>
                      <span className="text-gray-500">Rating:</span> 4.7/5
                    </div>
                    <div>
                      <span className="text-gray-500">Availability:</span>{" "}
                      <span className="text-green-600">Available</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Next Slot:</span> Today, 4:00 PM
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <ChatbotWidget />
    </div>
  );
}
