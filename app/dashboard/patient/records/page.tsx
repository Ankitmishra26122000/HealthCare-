import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { FileText, Download, Search, Filter, Eye, Calendar } from "lucide-react"
import { PatientNavigation } from "@/components/patient-navigation"
import { ChatbotWidget } from "@/components/chatbot-widget"

export default function PatientRecords() {
  const healthRecords = [
    {
      id: 1,
      type: "Lab Results",
      title: "Complete Blood Count",
      doctor: "Dr. Sarah Johnson",
      date: "2024-12-10",
      status: "Normal",
      category: "Laboratory",
    },
    {
      id: 2,
      type: "Prescription",
      title: "Hypertension Medication",
      doctor: "Dr. Sarah Johnson",
      date: "2024-12-10",
      status: "Active",
      category: "Medication",
    },
    {
      id: 3,
      type: "Imaging",
      title: "Chest X-Ray",
      doctor: "Dr. Michael Chen",
      date: "2024-12-08",
      status: "Normal",
      category: "Radiology",
    },
    {
      id: 4,
      type: "Consultation Notes",
      title: "Cardiology Follow-up",
      doctor: "Dr. Sarah Johnson",
      date: "2024-12-05",
      status: "Completed",
      category: "Consultation",
    },
    {
      id: 5,
      type: "Vaccination",
      title: "Annual Flu Shot",
      doctor: "Dr. Emily Rodriguez",
      date: "2024-11-15",
      status: "Completed",
      category: "Immunization",
    },
    {
      id: 6,
      type: "Lab Results",
      title: "Lipid Panel",
      doctor: "Dr. Sarah Johnson",
      date: "2024-11-10",
      status: "Elevated",
      category: "Laboratory",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "normal":
      case "completed":
        return "border-green-200 text-green-700 bg-green-50"
      case "active":
        return "border-blue-200 text-blue-700 bg-blue-50"
      case "elevated":
      case "abnormal":
        return "border-yellow-200 text-yellow-700 bg-yellow-50"
      default:
        return "border-gray-200 text-gray-700 bg-gray-50"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "laboratory":
        return "border-purple-200 text-purple-700"
      case "medication":
        return "border-blue-200 text-blue-700"
      case "radiology":
        return "border-green-200 text-green-700"
      case "consultation":
        return "border-orange-200 text-orange-700"
      case "immunization":
        return "border-pink-200 text-pink-700"
      default:
        return "border-gray-200 text-gray-700"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <PatientNavigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Records</h1>
          <p className="text-gray-600">Access and manage your medical records securely</p>
        </div>

        {/* Search and Filter */}
        <Card className="mb-8 border-blue-100">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search records by type, doctor, or date..." className="pl-10" />
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" className="border-green-200 text-green-600 hover:bg-green-50">
                  <Calendar className="h-4 w-4 mr-2" />
                  Date Range
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Records Grid */}
        <div className="grid gap-6">
          {healthRecords.map((record) => (
            <Card key={record.id} className="border-blue-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-blue-900">{record.title}</h3>
                      <Badge variant="outline" className={getCategoryColor(record.category)}>
                        {record.category}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(record.status)}>
                        {record.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                      <div>
                        <span className="font-medium">Type:</span> {record.type}
                      </div>
                      <div>
                        <span className="font-medium">Doctor:</span> {record.doctor}
                      </div>
                      <div>
                        <span className="font-medium">Date:</span> {record.date}
                      </div>
                    </div>

                    {record.type === "Lab Results" && (
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm text-blue-700">
                          <span className="font-medium">Summary:</span> All values within normal range. Continue current
                          treatment plan.
                        </p>
                      </div>
                    )}

                    {record.type === "Prescription" && (
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-sm text-green-700">
                          <span className="font-medium">Medication:</span> Lisinopril 10mg, once daily. Refills
                          remaining: 2
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <Button size="sm" variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="border-green-200 text-green-600 hover:bg-green-50">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <Card className="border-purple-100">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-900 mb-2">24</div>
              <div className="text-sm text-purple-600">Total Records</div>
            </CardContent>
          </Card>
          <Card className="border-blue-100">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-900 mb-2">8</div>
              <div className="text-sm text-blue-600">Lab Results</div>
            </CardContent>
          </Card>
          <Card className="border-green-100">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-900 mb-2">6</div>
              <div className="text-sm text-green-600">Prescriptions</div>
            </CardContent>
          </Card>
          <Card className="border-orange-100">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-orange-900 mb-2">10</div>
              <div className="text-sm text-orange-600">Consultations</div>
            </CardContent>
          </Card>
        </div>
      </main>

      <ChatbotWidget />
    </div>
  )
}
