"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, X, Check, AlertCircle, Calendar, FileText, Heart } from "lucide-react"

interface Notification {
  id: string
  type: "appointment" | "prescription" | "lab-result" | "reminder"
  title: string
  message: string
  timestamp: string
  read: boolean
  urgent: boolean
}

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "appointment",
      title: "Upcoming Appointment",
      message: "You have an appointment with Dr. Sarah Johnson tomorrow at 10:00 AM",
      timestamp: "2 hours ago",
      read: false,
      urgent: true,
    },
    {
      id: "2",
      type: "lab-result",
      title: "Lab Results Available",
      message: "Your blood test results are now available for review",
      timestamp: "1 day ago",
      read: false,
      urgent: false,
    },
    {
      id: "3",
      type: "prescription",
      title: "Prescription Refill Reminder",
      message: "Your Metformin prescription expires in 3 days. Time to refill!",
      timestamp: "2 days ago",
      read: true,
      urgent: false,
    },
    {
      id: "4",
      type: "reminder",
      title: "Health Check Reminder",
      message: "It's time for your monthly blood pressure check",
      timestamp: "3 days ago",
      read: true,
      urgent: false,
    },
  ])

  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    const count = notifications.filter((n) => !n.read).length
    setUnreadCount(count)
  }, [notifications])

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "appointment":
        return <Calendar className="h-5 w-5 text-blue-600" />
      case "prescription":
        return <Heart className="h-5 w-5 text-green-600" />
      case "lab-result":
        return <FileText className="h-5 w-5 text-purple-600" />
      case "reminder":
        return <Bell className="h-5 w-5 text-orange-600" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <Card className="border-blue-100">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-blue-900 flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notifications
              {unreadCount > 0 && <Badge className="ml-2 bg-red-600">{unreadCount}</Badge>}
            </CardTitle>
            <CardDescription>Stay updated with your health information</CardDescription>
          </div>
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
              className="border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              <Check className="h-4 w-4 mr-1" />
              Mark All Read
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No notifications at the moment</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border transition-all ${
                  notification.read
                    ? "border-gray-200 bg-gray-50"
                    : notification.urgent
                      ? "border-red-200 bg-red-50"
                      : "border-blue-200 bg-blue-50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getIcon(notification.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className={`font-semibold ${notification.read ? "text-gray-700" : "text-gray-900"}`}>
                          {notification.title}
                        </h4>
                        {notification.urgent && !notification.read && (
                          <Badge variant="destructive" className="text-xs">
                            Urgent
                          </Badge>
                        )}
                        {!notification.read && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                      </div>
                      <p className={`text-sm mt-1 ${notification.read ? "text-gray-500" : "text-gray-700"}`}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">{notification.timestamp}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-100"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteNotification(notification.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-100"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
