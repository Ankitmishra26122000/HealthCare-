import { Button } from "@/components/ui/button"
import { Heart, Users, Settings, Bell, LogOut, User, FileText, Calendar } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AdminNavigation() {
  return (
    <nav className="bg-white shadow-sm border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/dashboard/admin" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-purple-600" />
            <span className="text-xl font-bold text-gray-900">HealthCare+</span>
            <span className="text-sm text-purple-600 font-medium">Admin Portal</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link href="/dashboard/admin" className="text-purple-600 hover:text-purple-700 font-medium">
              Dashboard
            </Link>
            <Link
              href="/dashboard/admin/patient-insights"
              className="text-gray-600 hover:text-purple-600 flex items-center space-x-1"
            >
              <Users className="h-4 w-4" />
              <span>Patient Insights</span>
            </Link>
            <Link
              href="/dashboard/admin/prescriptions/new"
              className="text-gray-600 hover:text-purple-600 flex items-center space-x-1"
            >
              <FileText className="h-4 w-4" />
              <span>Prescriptions</span>
            </Link>
            <Link
              href="/dashboard/admin/appointments/schedule"
              className="text-gray-600 hover:text-purple-600 flex items-center space-x-1"
            >
              <Calendar className="h-4 w-4" />
              <span>Schedule</span>
            </Link>
            <Link
              href="/dashboard/admin/settings"
              className="text-gray-600 hover:text-purple-600 flex items-center space-x-1"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-purple-600">
              <Bell className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-purple-600">
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
