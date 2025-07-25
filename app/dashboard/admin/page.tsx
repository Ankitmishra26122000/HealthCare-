import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, UserCheck, Building, TrendingUp, AlertTriangle, Settings, Database, Shield } from "lucide-react"
import Link from "next/link"
import { AdminNavigation } from "@/components/admin-navigation"
import { ChatbotWidget } from "@/components/chatbot-widget"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function AdminDashboard() {
  const systemStats = [
    { label: "Total Users", value: "1,247", change: "+12%", icon: Users, color: "blue" },
    { label: "Active Doctors", value: "89", change: "+5%", icon: UserCheck, color: "green" },
    { label: "Registered Clinics", value: "23", change: "+2%", icon: Building, color: "purple" },
    { label: "System Uptime", value: "99.9%", change: "0%", icon: TrendingUp, color: "orange" },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "User Registration",
      description: "New patient registered: Arjun Sharma",
      timestamp: "2 minutes ago",
      status: "success",
    },
    {
      id: 2,
      type: "Doctor Verification",
      description: "Dr. Rajesh Patel verified",
      timestamp: "15 minutes ago",
      status: "success",
    },
    {
      id: 3,
      type: "System Alert",
      description: "High server load detected",
      timestamp: "1 hour ago",
      status: "warning",
    },
    {
      id: 4,
      type: "Clinic Registration",
      description: "New clinic pending approval",
      timestamp: "2 hours ago",
      status: "pending",
    },
  ]

  const pendingApprovals = [
    {
      id: 1,
      type: "Doctor",
      name: "Dr. Anand Mehta",
      specialty: "Cardiology",
      submitted: "2024-12-10",
    },
    {
      id: 2,
      type: "Clinic",
      name: "Akota Medical Center",
      location: "Akota, Vadodara",
      submitted: "2024-12-09",
    },
    {
      id: 3,
      type: "Doctor",
      name: "Dr. Priya Desai",
      specialty: "Pediatrics",
      submitted: "2024-12-08",
    },
  ]

  const hospitalStats = {
    patientCount: {
      total: 1247,
      inpatient: 124,
      outpatient: 1123,
      change: "+3.2%",
    },
    doctorStats: {
      total: 89,
      onDuty: 42,
      specialties: 14,
      topSpecialty: "Cardiology",
    },
    appointmentStats: {
      today: 156,
      completed: 87,
      upcoming: 69,
      cancellation: "4.3%",
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <AdminNavigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">System overview and management controls</p>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {systemStats.map((stat, index) => {
            const Icon = stat.icon
            const colorClasses = {
              blue: "border-blue-100 text-blue-600",
              green: "border-green-100 text-green-600",
              purple: "border-purple-100 text-purple-600",
              orange: "border-orange-100 text-orange-600",
            }

            return (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <Card
                    className={`${colorClasses[stat.color as keyof typeof colorClasses]} cursor-pointer hover:shadow-md transition-shadow`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`text-sm font-medium text-${stat.color}-600`}>{stat.label}</p>
                          <p className={`text-2xl font-bold text-${stat.color}-900`}>{stat.value}</p>
                          <p className="text-xs text-gray-500">{stat.change} from last month</p>
                        </div>
                        <Icon className={`h-8 w-8 text-${stat.color}-600`} />
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{stat.label} Details</DialogTitle>
                    <DialogDescription>Detailed statistics and information</DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">{stat.value}</h3>
                      <Badge className={`bg-${stat.color}-600`}>{stat.change} from last month</Badge>
                    </div>
                    <div className="space-y-4">
                      <p>This is detailed information about {stat.label.toLowerCase()} in the system.</p>
                      <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center">
                        <p className="text-gray-500">Detailed chart would appear here</p>
                      </div>
                      <p className="text-sm text-gray-600">
                        Additional metrics and analytics related to {stat.label.toLowerCase()} would be displayed here,
                        allowing administrators to gain deeper insights into system performance and usage patterns.
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )
          })}
        </div>

        {/* Hospital Statistics Tabs */}
        <Card className="mb-8 border-blue-100">
          <CardHeader>
            <CardTitle className="text-blue-900">Hospital Statistics</CardTitle>
            <CardDescription>Key metrics and performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="patients">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="patients">Patients</TabsTrigger>
                <TabsTrigger value="doctors">Doctors</TabsTrigger>
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
              </TabsList>

              <TabsContent value="patients" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <p className="text-sm text-blue-600 mb-1">Total Patients</p>
                    <p className="text-3xl font-bold text-blue-900">{hospitalStats.patientCount.total}</p>
                    <div className="flex items-center mt-2 text-sm">
                      <span className="text-green-600">{hospitalStats.patientCount.change}</span>
                      <span className="text-gray-500 ml-2">from last month</span>
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <p className="text-sm text-blue-600 mb-1">Inpatients</p>
                    <p className="text-3xl font-bold text-blue-900">{hospitalStats.patientCount.inpatient}</p>
                    <div className="flex items-center mt-2 text-sm">
                      <span className="text-gray-500">Currently admitted</span>
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <p className="text-sm text-blue-600 mb-1">Outpatients</p>
                    <p className="text-3xl font-bold text-blue-900">{hospitalStats.patientCount.outpatient}</p>
                    <div className="flex items-center mt-2 text-sm">
                      <span className="text-gray-500">Regular checkups</span>
                    </div>
                  </div>
                </div>
                <div className="h-64 bg-blue-50 rounded-lg border border-blue-100 flex items-center justify-center">
                  <p className="text-blue-600">Patient statistics chart will appear here</p>
                </div>
              </TabsContent>

              <TabsContent value="doctors" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                    <p className="text-sm text-green-600 mb-1">Total Doctors</p>
                    <p className="text-3xl font-bold text-green-900">{hospitalStats.doctorStats.total}</p>
                    <div className="flex items-center mt-2 text-sm">
                      <span className="text-gray-500">Registered practitioners</span>
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                    <p className="text-sm text-green-600 mb-1">On Duty Today</p>
                    <p className="text-3xl font-bold text-green-900">{hospitalStats.doctorStats.onDuty}</p>
                    <div className="flex items-center mt-2 text-sm">
                      <span className="text-gray-500">Currently working</span>
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                    <p className="text-sm text-green-600 mb-1">Specialties</p>
                    <p className="text-3xl font-bold text-green-900">{hospitalStats.doctorStats.specialties}</p>
                    <div className="flex items-center mt-2 text-sm">
                      <span className="text-gray-500">Top: {hospitalStats.doctorStats.topSpecialty}</span>
                    </div>
                  </div>
                </div>
                <div className="h-64 bg-green-50 rounded-lg border border-green-100 flex items-center justify-center">
                  <p className="text-green-600">Doctor distribution chart will appear here</p>
                </div>
              </TabsContent>

              <TabsContent value="appointments" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                    <p className="text-sm text-purple-600 mb-1">Today's Appointments</p>
                    <p className="text-3xl font-bold text-purple-900">{hospitalStats.appointmentStats.today}</p>
                    <div className="flex items-center mt-2 text-sm">
                      <span className="text-gray-500">Total scheduled</span>
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                    <p className="text-sm text-purple-600 mb-1">Completed</p>
                    <p className="text-3xl font-bold text-purple-900">{hospitalStats.appointmentStats.completed}</p>
                    <div className="flex items-center mt-2 text-sm">
                      <span className="text-gray-500">Appointments done</span>
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                    <p className="text-sm text-purple-600 mb-1">Upcoming</p>
                    <p className="text-3xl font-bold text-purple-900">{hospitalStats.appointmentStats.upcoming}</p>
                    <div className="flex items-center mt-2 text-sm">
                      <span className="text-gray-500">
                        Cancellation rate: {hospitalStats.appointmentStats.cancellation}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="h-64 bg-purple-50 rounded-lg border border-purple-100 flex items-center justify-center">
                  <p className="text-purple-600">Appointment timeline chart will appear here</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-blue-900">Recent System Activities</CardTitle>
              <CardDescription>Latest events and system notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        activity.status === "success"
                          ? "bg-green-500"
                          : activity.status === "warning"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                      }`}
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-blue-900">{activity.type}</h4>
                      <p className="text-sm text-blue-700">{activity.description}</p>
                      <p className="text-xs text-gray-500">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Approvals */}
          <Card className="border-purple-100">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-purple-900">Pending Approvals</CardTitle>
                <Badge variant="outline" className="border-purple-200 text-purple-700">
                  {pendingApprovals.length} pending
                </Badge>
              </div>
              <CardDescription>Items requiring admin approval</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingApprovals.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-purple-900">{item.name}</h4>
                      <p className="text-sm text-purple-600">
                        {item.type === "Doctor" ? item.specialty : item.location}
                      </p>
                      <p className="text-sm text-gray-600">Submitted: {item.submitted}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Approve
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Approve {item.type}</DialogTitle>
                            <DialogDescription>You are about to approve {item.name}</DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <p className="mb-4">
                              Please confirm that you want to approve this {item.type.toLowerCase()}:
                            </p>
                            <div className="bg-green-50 p-4 rounded-md border border-green-100 mb-4">
                              <p>
                                <strong>Name:</strong> {item.name}
                              </p>
                              <p>
                                <strong>{item.type === "Doctor" ? "Specialty" : "Location"}:</strong>{" "}
                                {item.type === "Doctor" ? item.specialty : item.location}
                              </p>
                              <p>
                                <strong>Submitted:</strong> {item.submitted}
                              </p>
                            </div>
                            <div className="flex justify-end gap-3">
                              <Button variant="outline">Cancel</Button>
                              <Button className="bg-green-600 hover:bg-green-700">Confirm Approval</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Management */}
        <Card className="mt-8 border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">System Management</CardTitle>
            <CardDescription>Administrative tools and system controls</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/dashboard/admin/users">
                <Button
                  variant="outline"
                  className="w-full h-20 flex-col border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  <Users className="h-6 w-6 mb-2" />
                  User Management
                </Button>
              </Link>
              <Link href="/dashboard/admin/security">
                <Button
                  variant="outline"
                  className="w-full h-20 flex-col border-green-200 text-green-700 hover:bg-green-50"
                >
                  <Shield className="h-6 w-6 mb-2" />
                  Security Settings
                </Button>
              </Link>
              <Link href="/dashboard/admin/database">
                <Button
                  variant="outline"
                  className="w-full h-20 flex-col border-purple-200 text-purple-700 hover:bg-purple-50"
                >
                  <Database className="h-6 w-6 mb-2" />
                  Database Management
                </Button>
              </Link>
              <Link href="/dashboard/admin/settings">
                <Button
                  variant="outline"
                  className="w-full h-20 flex-col border-orange-200 text-orange-700 hover:bg-orange-50"
                >
                  <Settings className="h-6 w-6 mb-2" />
                  System Settings
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card className="mt-8 border-red-100">
          <CardHeader>
            <CardTitle className="text-red-900 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              System Alerts
            </CardTitle>
            <CardDescription>Critical system notifications and warnings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div>
                  <h4 className="font-semibold text-yellow-800">High Server Load</h4>
                  <p className="text-sm text-yellow-700">CPU usage at 85% - consider scaling</p>
                </div>
                <Button size="sm" variant="outline" className="border-yellow-300 text-yellow-700">
                  Investigate
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div>
                  <h4 className="font-semibold text-blue-800">Backup Completed</h4>
                  <p className="text-sm text-blue-700">Daily backup completed successfully</p>
                </div>
                <Button size="sm" variant="outline" className="border-blue-300 text-blue-700">
                  View Details
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
