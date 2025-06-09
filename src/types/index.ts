export interface Load {
  id: number
  status: string
  origin: string
  destination: string
  client_name: string
  carrier_name: string
}

export interface Driver {
  id: number
  name: string
  location: string
  status: "available" | "busy" | "offline"
  rating: number
  completedLoads: number
  phone: string
  email: string
  licenseNumber: string
  licenseExpiry: string
}

export interface Toast {
  id: string
  type: "success" | "error"
  title: string
  message?: string
  duration?: number
}

export interface FormData {
  status: string
  origin: string
  destination: string
  client_name: string
  carrier_name: string
}

export interface FormErrors {
  status?: string
  origin?: string
  destination?: string
  client_name?: string
  carrier_name?: string
}
export interface DriverFormData {
  name: string
  location: string
  phone: string
  email: string
  licenseNumber: string
  licenseExpiry: string
}

export interface DriverFormErrors {
  name?: string
  location?: string
  phone?: string
  email?: string
  licenseNumber?: string
  licenseExpiry?: string
}

export interface TruckFormErrors {
  licensePlate?: string
  model?: string
  year?: string
  capacity?: string
  location?: string
  mileage?: string
  lastMaintenance?: string
  nextMaintenance?: string
  fuelType?: string
}

export interface Truck {
  id: number
  licensePlate: string
  model: string
  year: number
  capacity: number
  status: "available" | "in-use" | "maintenance" | "out-of-service"
  driver?: string
  location: string
  mileage: number
  lastMaintenance: string
  nextMaintenance: string
  fuelType: "diesel" | "gasoline" | "electric" | "hybrid"
}

export interface TruckFormData {
  licensePlate: string
  model: string
  year: number
  capacity: number
  location: string
  mileage: number
  lastMaintenance: string
  nextMaintenance: string
  fuelType: "diesel" | "gasoline" | "electric" | "hybrid"
}

export interface ToastOptions {
  description?: string
  duration?: number
  style?: React.CSSProperties
  className?: string 
}