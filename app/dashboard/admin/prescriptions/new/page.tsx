import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Save, Plus, Trash2, FileText } from "lucide-react"
import { AdminNavigation } from "@/components/admin-navigation"
import { ChatbotWidget } from "@/components/chatbot-widget"

export default function NewPrescriptionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <AdminNavigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Digital Prescription</h1>
            <p className="text-gray-600">Generate a new prescription for a patient</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Patient Selection */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-blue-900">Patient Information</CardTitle>
              <CardDescription>Select patient and basic details</CardDescription>
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

              <div className="p-4 border border-blue-100 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Arjun Sharma</h4>
                    <p className="text-sm text-gray-500">ID: PAT-20241205</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                  <div>
                    <span className="text-gray-500">Age:</span> 32 years
                  </div>
                  <div>
                    <span className="text-gray-500">Gender:</span> Male
                  </div>
                  <div>
                    <span className="text-gray-500">Blood Group:</span> B+
                  </div>
                  <div>
                    <span className="text-gray-500">Weight:</span> 72 kg
                  </div>
                </div>

                <div className="mt-4">
                  <span className="text-sm text-gray-500">Allergies:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <Badge variant="outline" className="border-red-200 text-red-700">
                      Peanuts
                    </Badge>
                    <Badge variant="outline" className="border-red-200 text-red-700">
                      Penicillin
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prescription-date">Prescription Date</Label>
                <div className="relative">
                  <Input id="prescription-date" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
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
                <Label htmlFor="diagnosis">Diagnosis</Label>
                <Textarea
                  id="diagnosis"
                  placeholder="Enter primary diagnosis..."
                  defaultValue="Type 2 Diabetes Mellitus, Essential Hypertension"
                />
              </div>
            </CardContent>
          </Card>

          {/* Prescription Details */}
          <Card className="border-blue-100 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-blue-900">Prescription Details</CardTitle>
              <CardDescription>Add medications and instructions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Medication 1 */}
                <div className="p-4 border border-blue-100 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="space-y-4 w-full">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="med-name-1">Medication Name</Label>
                          <Input id="med-name-1" defaultValue="Metformin" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="med-dosage-1">Dosage</Label>
                          <Input id="med-dosage-1" defaultValue="500mg" />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="med-frequency-1">Frequency</Label>
                          <Select defaultValue="twice">
                            <SelectTrigger id="med-frequency-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="once">Once daily</SelectItem>
                              <SelectItem value="twice">Twice daily</SelectItem>
                              <SelectItem value="thrice">Thrice daily</SelectItem>
                              <SelectItem value="four">Four times daily</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="med-timing-1">Timing</Label>
                          <Select defaultValue="after-meals">
                            <SelectTrigger id="med-timing-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="before-meals">Before meals</SelectItem>
                              <SelectItem value="after-meals">After meals</SelectItem>
                              <SelectItem value="with-meals">With meals</SelectItem>
                              <SelectItem value="bedtime">At bedtime</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="med-duration-1">Duration</Label>
                          <div className="flex space-x-2">
                            <Input id="med-duration-1" defaultValue="30" />
                            <Select defaultValue="days">
                              <SelectTrigger className="w-24">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="days">Days</SelectItem>
                                <SelectItem value="weeks">Weeks</SelectItem>
                                <SelectItem value="months">Months</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="med-instructions-1">Special Instructions</Label>
                        <Textarea
                          id="med-instructions-1"
                          placeholder="Any special instructions..."
                          defaultValue="Take with food to minimize gastrointestinal side effects."
                        />
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50 ml-2">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Medication 2 */}
                <div className="p-4 border border-blue-100 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="space-y-4 w-full">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="med-name-2">Medication Name</Label>
                          <Input id="med-name-2" defaultValue="Lisinopril" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="med-dosage-2">Dosage</Label>
                          <Input id="med-dosage-2" defaultValue="10mg" />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="med-frequency-2">Frequency</Label>
                          <Select defaultValue="once">
                            <SelectTrigger id="med-frequency-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="once">Once daily</SelectItem>
                              <SelectItem value="twice">Twice daily</SelectItem>
                              <SelectItem value="thrice">Thrice daily</SelectItem>
                              <SelectItem value="four">Four times daily</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="med-timing-2">Timing</Label>
                          <Select defaultValue="morning">
                            <SelectTrigger id="med-timing-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="morning">Morning</SelectItem>
                              <SelectItem value="before-meals">Before meals</SelectItem>
                              <SelectItem value="after-meals">After meals</SelectItem>
                              <SelectItem value="bedtime">At bedtime</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="med-duration-2">Duration</Label>
                          <div className="flex space-x-2">
                            <Input id="med-duration-2" defaultValue="30" />
                            <Select defaultValue="days">
                              <SelectTrigger className="w-24">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="days">Days</SelectItem>
                                <SelectItem value="weeks">Weeks</SelectItem>
                                <SelectItem value="months">Months</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="med-instructions-2">Special Instructions</Label>
                        <Textarea
                          id="med-instructions-2"
                          placeholder="Any special instructions..."
                          defaultValue="Take in the morning. May cause dizziness initially."
                        />
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50 ml-2">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Add Medication Button */}
                <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Medication
                </Button>

                {/* General Instructions */}
                <div className="space-y-2 pt-4">
                  <Label htmlFor="general-instructions">General Instructions</Label>
                  <Textarea
                    id="general-instructions"
                    placeholder="General instructions for the patient..."
                    defaultValue="Maintain a low-sodium diet. Monitor blood glucose daily. Stay hydrated and exercise regularly."
                    rows={4}
                  />
                </div>

                {/* Follow-up */}
                <div className="space-y-2">
                  <Label htmlFor="follow-up">Follow-up Date</Label>
                  <div className="relative">
                    <Input id="follow-up" type="date" />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-blue-600"
                    >
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Save className="h-4 w-4 mr-2" />
                    Save Prescription
                  </Button>
                  <Button variant="outline" className="flex-1 border-green-200 text-green-600 hover:bg-green-50">
                    <FileText className="h-4 w-4 mr-2" />
                    Preview & Print
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <ChatbotWidget />
    </div>
  )
}
