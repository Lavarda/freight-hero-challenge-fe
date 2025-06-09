"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Copy, MapPin, User, Building, Calendar, Truck, Clock, CheckCircle } from "lucide-react"
import type { Load } from "@/types"
import { LOAD_STATUSES, STATUS_COLORS, capitalized } from "@/constants"
import { createStatusBadge, copyToClipboard } from "@/utils/helpers"

interface LoadDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  load: Load | null
  onEdit: (load: Load) => void
}

export const LoadDetailsModal = (props: LoadDetailsModalProps) => {
  const { isOpen, onClose, load, onEdit } = props
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleCopyToClipboard = async (text: string, field: string) => {
    const success = await copyToClipboard(text)
    if (success) {
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    }
  }

  const handleClose = () => {
    setCopiedField(null)
    onClose()
  }

  const handleEdit = () => {
    if (load) {
      onEdit(load)
    }
  }

  if (!load) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-2xl max-w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <DialogTitle className="text-lg md:text-xl">Load Details #{load.id}</DialogTitle>
          </div>
          <DialogDescription>
            View detailed information about this load including route, client, and carrier details.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
            {createStatusBadge(load.status, "load")}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">ID:</span>
              <span className="font-mono text-sm">{load.id}</span>
              <button
                onClick={() => handleCopyToClipboard(load.id.toString(), "id")}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Copy className="h-3 w-3 text-gray-400" />
              </button>
              {copiedField === "id" && <span className="text-xs text-green-600">Copied!</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="border rounded-lg p-3 md:p-4">
              <div className="flex items-center gap-2 mb-3">
                <User className="h-4 w-4 text-gray-600" />
                <h4 className="font-medium text-gray-900">Client Information</h4>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Client Name</p>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm md:text-base">{load.client_name}</p>
                    <button
                      onClick={() => handleCopyToClipboard(load.client_name, "client")}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Copy className="h-3 w-3 text-gray-400" />
                    </button>
                    {copiedField === "client" && <span className="text-xs text-green-600">Copied!</span>}
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-3 md:p-4">
              <div className="flex items-center gap-2 mb-3">
                <Building className="h-4 w-4 text-gray-600" />
                <h4 className="font-medium text-gray-900">Carrier Information</h4>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Carrier Name</p>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm md:text-base">{load.carrier_name}</p>
                    <button
                      onClick={() => handleCopyToClipboard(load.carrier_name, "carrier")}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Copy className="h-3 w-3 text-gray-400" />
                    </button>
                    {copiedField === "carrier" && <span className="text-xs text-green-600">Copied!</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-3 md:p-4">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-4 w-4 text-gray-600" />
              <h4 className="font-medium text-gray-900">Route Information</h4>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 mb-2">Origin</p>
                <div className="flex items-center gap-2 p-2 md:p-3 bg-green-50 rounded-lg">
                  <MapPin className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <p className="font-medium flex-1 text-sm md:text-base">{load.origin}</p>
                  <button
                    onClick={() => handleCopyToClipboard(load.origin, "origin")}
                    className="p-1 hover:bg-green-100 rounded flex-shrink-0"
                  >
                    <Copy className="h-3 w-3 text-green-600" />
                  </button>
                  {copiedField === "origin" && <span className="text-xs text-green-600">Copied!</span>}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-2">Destination</p>
                <div className="flex items-center gap-2 p-2 md:p-3 bg-red-50 rounded-lg">
                  <MapPin className="h-4 w-4 text-red-600 flex-shrink-0" />
                  <p className="font-medium flex-1 text-sm md:text-base">{load.destination}</p>
                  <button
                    onClick={() => handleCopyToClipboard(load.destination, "destination")}
                    className="p-1 hover:bg-red-100 rounded flex-shrink-0"
                  >
                    <Copy className="h-3 w-3 text-red-600" />
                  </button>
                  {copiedField === "destination" && <span className="text-xs text-green-600">Copied!</span>}
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:block border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-4 w-4 text-gray-600" />
              <h4 className="font-medium text-gray-900">Status Information</h4>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 mb-2">Current Status</p>
                {createStatusBadge(load.status, "load")}
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-3">Status Descriptions:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Clock className={`h-4 w-4 ${STATUS_COLORS.ORANGE.ICON} mt-0.5`} />
                    <div>
                      <span className="font-medium">{capitalized(LOAD_STATUSES.PICK_UP)}:</span> Load is ready for
                      pickup by the carrier.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Truck className={`h-4 w-4 ${STATUS_COLORS.BLUE.ICON} mt-0.5`} />
                    <div>
                      <span className="font-medium">{capitalized(LOAD_STATUSES.IN_ROUTE)}:</span> Load is currently
                      being transported to the destination.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className={`h-4 w-4 ${STATUS_COLORS.GREEN.ICON} mt-0.5`} />
                    <div>
                      <span className="font-medium">{capitalized(LOAD_STATUSES.DELIVERED)}:</span> Load has been
                      successfully delivered to the destination.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row items-center gap-3 justify-end">
          <Button variant="outline" size="sm" onClick={handleClose} className="w-full sm:w-auto">
            Close
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto" onClick={handleEdit}>
            Edit Load
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
