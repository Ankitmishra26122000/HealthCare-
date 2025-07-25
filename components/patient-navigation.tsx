import { Button } from "@/components/ui/button"
import { Heart, Calendar, FileText, User, Bell, LogOut } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function PatientNavigation() {
  return (
    <nav className="bg-white shadow-sm border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/dashboard/patient" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">HealthCare+</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link href="/dashboard/patient" className="text-blue-600 hover:text-blue-700 font-medium">
              Dashboard
            </Link>
            <Link
              href="/dashboard/patient/appointments"
              className="text-gray-600 hover:text-blue-600 flex items-center space-x-1"
            >
              <Calendar className="h-4 w-4" />
              <span>Appointments</span>
            </Link>
            <Link
              href="/dashboard/patient/records"
              className="text-gray-600 hover:text-blue-600 flex items-center space-x-1"
            >
              <FileText className="h-4 w-4" />
              <span>Records</span>
            </Link>
            <Link
              href="/dashboard/patient/prescriptions"
              className="text-gray-600 hover:text-blue-600 flex items-center space-x-1"
            >
              <Heart className="h-4 w-4" />
              <span>Prescriptions</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
              <Bell className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <Link href="/login">
                  <DropdownMenuItem className="text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
