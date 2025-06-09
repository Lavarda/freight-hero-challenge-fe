"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { TruckCard } from "@/components/TruckCard"
import { CreateTruckModal } from "@/components/CreateTruckModal"
import { Plus, CheckCircle, Wrench, AlertTriangle } from "lucide-react"
import type { Truck } from "@/types"

interface TruckManagementProps {
  trucks: Truck[]
  onCreateTruck: (truck: Omit<Truck, "id">) => void
  onDeleteTruck: (id: number) => void
  onEditTruck: (truck: Truck) => void
  onUpdateTruck: (truck: Truck) => void
}

export const TruckManagement = (props: TruckManagementProps) => {
  const { trucks, onCreateTruck, onDeleteTruck, onEditTruck, onUpdateTruck } = props
  const [showCreateModal, setShowCreateModal] = useState(false)

  const getStatusCounts = () => {
    const available = trucks.filter((truck) => truck.status === "available").length
    const inUse = trucks.filter((truck) => truck.status === "in-use").length
    const maintenance = trucks.filter((truck) => truck.status === "maintenance").length
    const outOfService = trucks.filter((truck) => truck.status === "out-of-service").length

    return { available, inUse, maintenance, outOfService }
  }

  const statusCounts = getStatusCounts()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Fleet Management</h2>
          <p className="text-gray-600">Manage your truck fleet</p>
        </div>
        <Button
          className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus className="h-4 w-4" />
          Add Truck
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Available</p>
              <p className="text-2xl font-bold text-gray-900">{statusCounts.available}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg"></div>
            <div>
              <p className="text-sm font-medium text-gray-600">In Use</p>
              <p className="text-2xl font-bold text-gray-900">{statusCounts.inUse}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Wrench className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Maintenance</p>
              <p className="text-2xl font-bold text-gray-900">{statusCounts.maintenance}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Out of Service</p>
              <p className="text-2xl font-bold text-gray-900">{statusCounts.outOfService}</p>
            </div>
          </div>
        </div>
      </div>

      {trucks.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-xl mb-2">🚛</div>
          <p className="text-gray-600 mb-4">No trucks found</p>
          <Button className="bg-orange-600 hover:bg-orange-700" onClick={() => setShowCreateModal(true)}>
            Add Your First Truck
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trucks.map((truck) => (
            <TruckCard
              key={truck.id}
              truck={truck}
              onDelete={onDeleteTruck}
              onEdit={onEditTruck}
              onUpdate={onUpdateTruck}
            />
          ))}
        </div>
      )}

      <CreateTruckModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} onSubmit={onCreateTruck} />
    </div>
  )
}
