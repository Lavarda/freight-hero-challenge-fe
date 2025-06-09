"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, MapPin, Phone, Mail, MoreHorizontal, Trash2, Edit } from "lucide-react"
import { DeleteConfirmationModal } from "@/components/DeleteConfirmationModal"
import type { Driver } from "@/types"
import { useToast } from "@/hooks/UseToastService"
import { createStatusBadge, renderStars } from "@/utils/helpers"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface DriverCardProps {
  driver: Driver
  onDelete: (id: number) => void
  onUpdate: (driver: Driver) => void
  onEdit: (driver: Driver) => void
}

export const DriverCard = (props: DriverCardProps) => {
  const { driver, onDelete, onEdit } = props
  const toast = useToast()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleDelete = () => {
    onDelete(driver.id)
    setShowDeleteModal(false)

    toast.success("Driver Deleted Successfully!", {
      description: `Driver ${driver.name} has been removed from the fleet.`,
    })
  }

  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-full">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{driver.name}</h3>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <MapPin className="h-3 w-3" />
                  {driver.location}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {createStatusBadge(driver.status, "driver")}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    onClick={() => onEdit(driver)}
                    className="cursor-pointer hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Driver
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setShowDeleteModal(true)}
                    className="cursor-pointer text-red-600 hover:bg-gray-100 hover:text-red-600 focus:bg-gray-100 focus:text-red-600"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Driver
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Rating</span>
              <div className="flex items-center gap-1">
                {renderStars(driver.rating)}
                <span className="text-sm font-medium ml-1">{driver.rating}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Completed Loads</span>
              <span className="font-medium">{driver.completedLoads}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="h-4 w-4" />
              {driver.phone}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail className="h-4 w-4" />
              {driver.email}
            </div>

            <div className="border-t pt-3 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">License No.</span>
                <span className="font-mono">{driver.licenseNumber}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">License Expires</span>
                <span>{driver.licenseExpiry}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        loadId={driver.id}
        title="Delete Driver"
        message={`Are you sure you want to delete driver ${driver.name}? This action cannot be undone.`}
      />
    </>
  )
}
