import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Heart, Save, FileText, User, AlertTriangle, TrendingUp } from "lucide-react"
import { AdminNavigation } from "@/components/admin-navigation"
import { ChatbotWidget } from "@/components/chatbot-widget"

export default function PatientInsightsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <AdminNavigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Health Insights</h1>
            <p className="text-gray-600">Edit and manage patient health data and insights</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Patient Info */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-blue-900">Patient Information</CardTitle>
              <CardDescription>Basic details and medical history</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Rahul Sharma</h3>
                  <p className="text-gray-500">ID: PAT-20241205</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-gray-500">Age</Label>
                  <p className="font-medium">32 years</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Gender</Label>
                  <p className="font-medium">Male</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Blood Group</Label>
                  <p className="font-medium">B+</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Height/Weight</Label>
                  <p className="font-medium">175 cm / 72 kg</p>
                </div>
              </div>

              <div className="pt-4">
                <Label className="text-xs text-gray-500">Medical History</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="border-blue-200 text-blue-700">
                    Hypertension
                  </Badge>
                  <Badge variant="outline" className="border-blue-200 text-blue-700">
                    Type 2 Diabetes
                  </Badge>
                  <Badge variant="outline" className="border-yellow-200 text-yellow-700">
                    Allergies: Peanuts
                  </Badge>
                </div>
              </div>

              <div className="pt-4">
                <Label className="text-xs text-gray-500">Emergency Contact</Label>
                <p className="font-medium">Neha Sharma (Wife)</p>
                <p className="text-sm text-gray-500">+91 87654 32109</p>
              </div>
            </CardContent>
          </Card>

          {/* Health Insights Editor */}
          <Card className="border-purple-100 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-purple-900">Health Insights</CardTitle>
              <CardDescription>Edit patient health data and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="vitals">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="vitals">Vitals</TabsTrigger>
                  <TabsTrigger value="lab-results">Lab Results</TabsTrigger>
                  <TabsTrigger value="medications">Medications</TabsTrigger>
                  <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                </TabsList>

                <TabsContent value="vitals" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="blood-pressure">Blood Pressure (mmHg)</Label>
                      <Input id="blood-pressure" defaultValue="138/85" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="heart-rate">Heart Rate (bpm)</Label>
                      <Input id="heart-rate" defaultValue="78" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="temperature">Temperature (°C)</Label>
                      <Input id="temperature" defaultValue="37.1" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="oxygen">Oxygen Saturation (%)</Label>
                      <Input id="oxygen" defaultValue="97" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="glucose">Blood Glucose (mg/dL)</Label>
                      <Input id="glucose" defaultValue="142" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bmi">BMI</Label>
                      <Input id="bmi" defaultValue="23.5" />
                    </div>
                  </div>

                  <div className="pt-4">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <Label className="text-yellow-600">Attention Required</Label>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-100 rounded-md p-3 mt-2">
                      <p className="text-sm text-yellow-800">
                        Blood pressure and glucose levels are slightly elevated. Consider adjusting medication and
                        recommending lifestyle changes.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="lab-results" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cholesterol">Total Cholesterol (mg/dL)</Label>
                      <Input id="cholesterol" defaultValue="210" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hdl">HDL (mg/dL)</Label>
                      <Input id="hdl" defaultValue="45" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ldl">LDL (mg/dL)</Label>
                      <Input id="ldl" defaultValue="130" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="triglycerides">Triglycerides (mg/dL)</Label>
                      <Input id="triglycerides" defaultValue="175" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hba1c">HbA1c (%)</Label>
                      <Input id="hba1c" defaultValue="7.2" />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="medications" className="space-y-4">
                  <div className="space-y-4">
                    <div className="p-4 border border-blue-100 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-blue-900">Metformin</h4>
                          <p className="text-sm text-gray-600">500mg, twice daily</p>
                          <p className="text-sm text-gray-500">For: Type 2 Diabetes</p>
                        </div>
                        <Select defaultValue="active">
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="discontinued">Discontinued</SelectItem>
                            <SelectItem value="on-hold">On Hold</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="p-4 border border-blue-100 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-blue-900">Lisinopril</h4>
                          <p className="text-sm text-gray-600">10mg, once daily</p>
                          <p className="text-sm text-gray-500">For: Hypertension</p>
                        </div>
                        <Select defaultValue="active">
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="discontinued">Discontinued</SelectItem>
                            <SelectItem value="on-hold">On Hold</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="p-4 border border-blue-100 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-blue-900">Atorvastatin</h4>
                          <p className="text-sm text-gray-600">20mg, once daily</p>
                          <p className="text-sm text-gray-500">For: High Cholesterol</p>
                        </div>
                        <Select defaultValue="active">
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="discontinued">Discontinued</SelectItem>
                            <SelectItem value="on-hold">On Hold</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button className="w-full" variant="outline">
                      + Add Medication
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="recommendations" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="diet">Dietary Recommendations</Label>
                    <Textarea
                      id="diet"
                      defaultValue="Low sodium, low carbohydrate diet. Increase intake of leafy vegetables and whole grains. Limit processed foods and sugary beverages."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="exercise">Exercise Recommendations</Label>
                    <Textarea
                      id="exercise"
                      defaultValue="30 minutes of moderate exercise (walking, swimming) 5 days a week. Include light strength training 2-3 times per week."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lifestyle">Lifestyle Modifications</Label>
                    <Textarea
                      id="lifestyle"
                      defaultValue="Reduce stress through meditation or yoga. Ensure 7-8 hours of sleep. Monitor blood glucose daily. Reduce alcohol consumption."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="followup">Follow-up Plan</Label>
                    <Textarea
                      id="followup"
                      defaultValue="Schedule follow-up appointment in 3 months. Lab tests to be repeated before next visit. Contact doctor if blood pressure exceeds 150/90 or if experiencing dizziness."
                      rows={3}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Health Trends */}
        <Card className="mt-8 border-blue-100">
          <CardHeader>
            <CardTitle className="text-blue-900">Health Trends</CardTitle>
            <CardDescription>Patient health metrics over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-blue-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                <p className="text-blue-800">Health trend visualization will appear here</p>
                <p className="text-sm text-blue-600">Showing blood pressure, glucose, and cholesterol trends</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card className="border-blue-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Blood Pressure</p>
                      <p className="text-xl font-bold text-blue-900">Improving</p>
                    </div>
                    <Heart className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-yellow-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-yellow-600">Blood Glucose</p>
                      <p className="text-xl font-bold text-yellow-900">Fluctuating</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">Cholesterol</p>
                      <p className="text-xl font-bold text-green-900">Stable</p>
                    </div>
                    <FileText className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>

      <ChatbotWidget />
    </div>
  );
}
