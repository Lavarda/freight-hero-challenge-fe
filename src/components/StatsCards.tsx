import { Card, CardContent } from "@/components/ui/card"
import { Package, Clock, Truck, CheckCircle, Users, TruckIcon } from "lucide-react"

interface StatsCardsProps {
  stats: {
    totalLoads: number
    pickUpCount: number
    inRouteCount: number
    deliveredCount: number
    availableDrivers: number
    availableTrucks: number
  }
}

export const StatsCards = (props: StatsCardsProps) => {
  const { stats } = props
  const statsData = [
    {
      title: "Total Loads",
      value: stats.totalLoads,
      icon: Package,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Pick Up",
      value: stats.pickUpCount,
      icon: Clock,
      iconColor: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "In Route",
      value: stats.inRouteCount,
      icon: Truck,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Delivered",
      value: stats.deliveredCount,
      icon: CheckCircle,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Available Drivers",
      value: stats.availableDrivers,
      icon: Users,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Available Trucks",
      value: stats.availableTrucks,
      icon: TruckIcon,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-6 md:mb-8">
      {statsData.map((stat, index) => (
        <Card key={index} className="border-0 shadow-sm">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs md:text-sm font-medium text-gray-600 mb-1 truncate">{stat.title}</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-lg ${stat.bgColor} flex-shrink-0`}>
                <stat.icon className={`h-4 w-4 md:h-5 md:w-5 ${stat.iconColor}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
