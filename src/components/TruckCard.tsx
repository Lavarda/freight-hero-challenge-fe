"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Truck, MapPin, Gauge, Calendar, Fuel, User, MoreHorizontal, Trash2, Edit, Clock } from "lucide-react"
import { DeleteConfirmationModal } from "@/components/DeleteConfirmationModal"
import type { Truck as TruckType } from "@/types"
import { useToast } from "@/hooks/UseToastService"
import { createStatusBadge, formatCapacity, formatMileage, getFuelTypeColor } from "@/utils/helpers"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface TruckCardProps {
  truck: TruckType
  onDelete: (id: number) => void
  onEdit: (truck: TruckType) => void
  onUpdate: (truck: TruckType) => void
}

export const TruckCard = (props: TruckCardProps) => {
  const { truck, onDelete, onEdit } = props
  const toast = useToast()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleDelete = () => {
    onDelete(truck.id)
    setShowDeleteModal(false)

    toast.success("Truck Deleted Successfully!", {
      description: `Truck ${truck.licensePlate} has been removed from the fleet.`,
    })
  }

  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-50 rounded-full">
                <Truck className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{truck.licensePlate}</h3>
                <p className="text-sm text-gray-600">
                  {truck.model} ({truck.year})
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {createStatusBadge(truck.status, "truck")}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    onClick={() => onEdit(truck)}
                    className="cursor-pointer hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Truck
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setShowDeleteModal(true)}
                    className="cursor-pointer text-red-600 hover:bg-gray-100 hover:text-red-600 focus:bg-gray-100 focus:text-red-600"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Truck
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-50 rounded">
                  <Gauge className="h-3 w-3 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Capacity</p>
                  <p className="font-medium text-sm">{formatCapacity(truck.capacity)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-green-50 rounded">
                  <MapPin className="h-3 w-3 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="font-medium text-sm">{truck.location}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-purple-50 rounded">
                  <User className="h-3 w-3 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Driver</p>
                  <p className="font-medium text-sm">{truck.driver || "Unassigned"}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-gray-50 rounded">
                  <Gauge className="h-3 w-3 text-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Mileage</p>
                  <p className="font-medium text-sm">{formatMileage(truck.mileage)}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded ${getFuelTypeColor(truck.fuelType)}`}>
                <Fuel className="h-3 w-3" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Fuel Type</p>
                <p className="font-medium text-sm capitalize">{truck.fuelType}</p>
              </div>
            </div>

            <div className="border-t pt-3 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Last Service
                </span>
                <span className="font-medium">{truck.lastMaintenance}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Next Service
                </span>
                <span className="font-medium">{truck.nextMaintenance}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        loadId={truck.id}
        title="Delete Truck"
        message={`Are you sure you want to delete truck ${truck.licensePlate}? This action cannot be undone.`}
      />
    </>
  )
}
