export const LOAD_STATUSES = {
  PICK_UP: "pick up",
  IN_ROUTE: "in route",
  DELIVERED: "delivered",
  ALL: "All Status",
}

export const DRIVER_STATUSES = {
  AVAILABLE: "available",
  BUSY: "busy",
  OFFLINE: "offline",
}

export const TRUCK_STATUSES = {
  AVAILABLE: "available",
  IN_USE: "in-use",
  MAINTENANCE: "maintenance",
  OUT_OF_SERVICE: "out-of-service",
}

export const FUEL_TYPES = {
  DIESEL: "diesel",
  GASOLINE: "gasoline",
  ELECTRIC: "electric",
  HYBRID: "hybrid",
}

export const TOAST_DURATIONS = {
  SHORT: 3000,
  MEDIUM: 4000,
  LONG: 6000,
}

export const STATUS_COLORS = {
  GREEN: {
    BG: "bg-green-100",
    TEXT: "text-green-800",
    ICON: "text-green-600",
    HOVER: "hover:bg-green-100",
  },
  BLUE: {
    BG: "bg-blue-100",
    TEXT: "text-blue-800",
    ICON: "text-blue-600",
    HOVER: "hover:bg-blue-100",
  },
  YELLOW: {
    BG: "bg-yellow-100",
    TEXT: "text-yellow-800",
    ICON: "text-yellow-600",
    HOVER: "hover:bg-yellow-100",
  },
  ORANGE: {
    BG: "bg-orange-100",
    TEXT: "text-orange-800",
    ICON: "text-orange-600",
    HOVER: "hover:bg-orange-100",
  },
  RED: {
    BG: "bg-red-100",
    TEXT: "text-red-800",
    ICON: "text-red-600",
    HOVER: "hover:bg-red-100",
  },
  GRAY: {
    BG: "bg-gray-100",
    TEXT: "text-gray-800",
    ICON: "text-gray-600",
    HOVER: "hover:bg-gray-100",
  },
}

export const FILTER_OPTIONS = {
  ALL_CLIENTS: "All Clients",
  ALL_CARRIERS: "All Carriers",
}

export const capitalized = (status: string): string => {
  if (!status) return ""
  return status
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
}
