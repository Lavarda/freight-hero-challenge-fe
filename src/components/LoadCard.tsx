"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Package, MapPin, Truck, Eye, MoreHorizontal, Trash2, Edit } from "lucide-react"
import { DeleteConfirmationModal } from "@/components/DeleteConfirmationModal"
import { useToast } from "@/hooks/UseToastService"
import type { Load } from "@/types/index"
import { createStatusBadge } from "@/utils/helpers"

interface LoadCardProps {
  load: Load
  onDelete: (id: number) => void
  onViewDetails: (load: Load) => void
  onEdit: (load: Load) => void
}

export const LoadCard = (props: LoadCardProps) => {
  const { load, onDelete, onViewDetails, onEdit } = props
  const toast = useToast()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      onDelete(load.id)
      toast.success("Load Deleted Successfully!", {
        description: `Load #${load.id} has been removed from the system.`,
      })
      setShowDeleteModal(false)
    } catch (error) {
      toast.error("Failed To Delete Load", {
        description: "An error occurred while deleting the load. Please try again.",
      })
      console.error("Error deleting load:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleViewDetails = () => {
    onViewDetails(load)
  }

  const handleEdit = () => {
    onEdit(load)
  }

  return (
    <>
      <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-4 md:p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="p-2 bg-blue-50 rounded-lg flex-shrink-0">
                <Package className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base md:text-lg font-semibold text-gray-900">#{load.id}</h3>
                <p className="text-sm text-gray-600 truncate">{load.client_name}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
              {createStatusBadge(load.status, "load")}

              <div className="flex md:hidden">
                <Button variant="outline" size="sm" className="px-2" onClick={handleViewDetails}>
                  <Eye className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="px-2 ml-1">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem
                      onClick={handleEdit}
                      className="cursor-pointer hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Load
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setShowDeleteModal(true)}
                      disabled={isDeleting}
                      className="cursor-pointer text-red-600 hover:bg-gray-100 hover:text-red-600 focus:bg-gray-100 focus:text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Load
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="hidden md:flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleViewDetails}>
                  <Eye className="h-4 w-4" />
                  Details
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem
                      onClick={handleEdit}
                      className="cursor-pointer hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Load
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setShowDeleteModal(true)}
                      disabled={isDeleting}
                      className="cursor-pointer text-red-600 hover:bg-gray-100 hover:text-red-600 focus:bg-gray-100 focus:text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Load
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-1.5 md:p-2 bg-green-50 rounded-lg flex-shrink-0">
                <MapPin className="h-3 w-3 md:h-4 md:w-4 text-green-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-500 uppercase tracking-wide">From</p>
                <p className="font-medium text-gray-900 text-sm md:text-base truncate">{load.origin}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-1.5 md:p-2 bg-red-50 rounded-lg flex-shrink-0">
                <MapPin className="h-3 w-3 md:h-4 md:w-4 text-red-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-500 uppercase tracking-wide">To</p>
                <p className="font-medium text-gray-900 text-sm md:text-base truncate">{load.destination}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:col-span-2 lg:col-span-1">
              <div className="p-1.5 md:p-2 bg-purple-50 rounded-lg flex-shrink-0">
                <Truck className="h-3 w-3 md:h-4 md:w-4 text-purple-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Carrier</p>
                <p className="font-medium text-gray-900 text-sm md:text-base truncate">{load.carrier_name}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        loadId={load.id}
        isLoading={isDeleting}
      />
    </>
  )
}
