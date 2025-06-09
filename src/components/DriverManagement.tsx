"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DriverCard } from "@/components/DriverCard"
import { CreateDriverModal } from "@/components/CreateDriverModal"
import { Plus } from "lucide-react"
export type { Driver } from "@/types"
import type { Driver } from "@/types"

interface DriverManagementProps {
  drivers: Driver[]
  onCreateDriver: (driver: Omit<Driver, "id">) => void
  onDeleteDriver: (id: number) => void
  onUpdateDriver: (driver: Driver) => void
  onEditDriver: (driver: Driver) => void
}

export const DriverManagement = (props: DriverManagementProps) => {
  const { drivers, onCreateDriver, onDeleteDriver, onUpdateDriver, onEditDriver } = props
  const [showCreateModal, setShowCreateModal] = useState(false)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Driver Management</h2>
          <p className="text-gray-600">Manage your fleet drivers</p>
        </div>
        <Button
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus className="h-4 w-4" />
          Add Driver
        </Button>
      </div>

      {drivers.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-xl mb-2">👨‍💼</div>
          <p className="text-gray-600 mb-4">No drivers found</p>
          <Button className="bg-green-600 hover:bg-green-700" onClick={() => setShowCreateModal(true)}>
            Add Your First Driver
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drivers.map((driver) => (
            <DriverCard
              key={driver.id}
              driver={driver}
              onDelete={onDeleteDriver}
              onUpdate={onUpdateDriver}
              onEdit={onEditDriver}
            />
          ))}
        </div>
      )}

      <CreateDriverModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} onSubmit={onCreateDriver} />
    </div>
  )
}
