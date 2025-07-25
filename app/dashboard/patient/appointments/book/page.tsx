import { PatientNavigation } from "@/components/patient-navigation"
import { ChatbotWidget } from "@/components/chatbot-widget"
import { AppointmentBooking } from "@/components/appointment-booking"

export default function BookAppointmentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <PatientNavigation />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book New Appointment</h1>
          <p className="text-gray-600">Schedule an appointment with your preferred doctor</p>
        </div>

        <AppointmentBooking />
      </main>

      <ChatbotWidget />
    </div>
  );
}
