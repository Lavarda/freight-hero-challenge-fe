import { CheckCircle, Clock, Truck, Wrench, AlertTriangle, Star } from "lucide-react"
import { LOAD_STATUSES, DRIVER_STATUSES, TRUCK_STATUSES, STATUS_COLORS, capitalized } from "@/constants"

export const createStatusBadge = (status: string, type: "load" | "driver" | "truck") => {
  const normalizedStatus = status.toLowerCase()

  if (type === "load") {
    switch (normalizedStatus) {
      case LOAD_STATUSES.DELIVERED:
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS.GREEN.BG} ${STATUS_COLORS.GREEN.TEXT}`}
          >
            <CheckCircle className="h-3 w-3 mr-1" />
            {capitalized(status)}
          </span>
        )
      case LOAD_STATUSES.IN_ROUTE:
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS.BLUE.BG} ${STATUS_COLORS.BLUE.TEXT}`}
          >
            <Truck className="h-3 w-3 mr-1" />
            {capitalized(status)}
          </span>
        )
      case LOAD_STATUSES.PICK_UP:
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS.YELLOW.BG} ${STATUS_COLORS.YELLOW.TEXT}`}
          >
            <Clock className="h-3 w-3 mr-1" />
            {capitalized(status)}
          </span>
        )
      default:
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS.GRAY.BG} ${STATUS_COLORS.GRAY.TEXT}`}
          >
            {capitalized(status)}
          </span>
        )
    }
  }

  if (type === "driver") {
    switch (normalizedStatus) {
      case DRIVER_STATUSES.AVAILABLE:
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS.GREEN.BG} ${STATUS_COLORS.GREEN.TEXT}`}
          >
            {capitalized(status)}
          </span>
        )
      case DRIVER_STATUSES.BUSY:
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS.YELLOW.BG} ${STATUS_COLORS.YELLOW.TEXT}`}
          >
            {capitalized(status)}
          </span>
        )
      case DRIVER_STATUSES.OFFLINE:
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS.RED.BG} ${STATUS_COLORS.RED.TEXT}`}
          >
            {capitalized(status)}
          </span>
        )
      default:
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS.GRAY.BG} ${STATUS_COLORS.GRAY.TEXT}`}
          >
            {capitalized(status)}
          </span>
        )
    }
  }

  if (type === "truck") {
    switch (normalizedStatus) {
      case TRUCK_STATUSES.AVAILABLE:
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS.GREEN.BG} ${STATUS_COLORS.GREEN.TEXT}`}
          >
            <CheckCircle className="h-3 w-3 mr-1" />
            {capitalized(status)}
          </span>
        )
      case TRUCK_STATUSES.IN_USE:
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS.BLUE.BG} ${STATUS_COLORS.BLUE.TEXT}`}
          >
            <Truck className="h-3 w-3 mr-1" />
            {capitalized(status)}
          </span>
        )
      case TRUCK_STATUSES.MAINTENANCE:
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS.YELLOW.BG} ${STATUS_COLORS.YELLOW.TEXT}`}
          >
            <Wrench className="h-3 w-3 mr-1" />
            {capitalized(status)}
          </span>
        )
      case TRUCK_STATUSES.OUT_OF_SERVICE:
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS.RED.BG} ${STATUS_COLORS.RED.TEXT}`}
          >
            <AlertTriangle className="h-3 w-3 mr-1" />
            {capitalized(status)}
          </span>
        )
      default:
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS.GRAY.BG} ${STATUS_COLORS.GRAY.TEXT}`}
          >
            {capitalized(status)}
          </span>
        )
    }
  }

  
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS.GRAY.BG} ${STATUS_COLORS.GRAY.TEXT}`}
    >
      {capitalized(status)}
    </span>
  )
}

export const formatCapacity = (capacity: number): string => {
  return `${capacity.toLocaleString()} lbs`
}

export const formatMileage = (mileage: number): string => {
  return `${mileage.toLocaleString()} mi`
}

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error("Failed to copy:", err)
    return false
  }
}

export const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star key={i} className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
  ))
}

export const getFuelTypeColor = (fuelType: string): string => {
  switch (fuelType.toLowerCase()) {
    case "electric":
      return `${STATUS_COLORS.GREEN.ICON} ${STATUS_COLORS.GREEN.BG}`
    case "hybrid":
      return `${STATUS_COLORS.BLUE.ICON} ${STATUS_COLORS.BLUE.BG}`
    case "diesel":
      return `${STATUS_COLORS.ORANGE.ICON} ${STATUS_COLORS.ORANGE.BG}`
    case "gasoline":
      return "text-purple-600 bg-purple-50"
    default:
      return `${STATUS_COLORS.GRAY.ICON} ${STATUS_COLORS.GRAY.BG}`
  }
}