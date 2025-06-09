"use client"
import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Info } from "lucide-react"
import type { Truck } from "@/types"
import { useToast } from "@/hooks/UseToastService"
import { truckFormSchema, TruckFormValues } from "@/schemas/truck"

interface CreateTruckModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (truck: Omit<Truck, "id">) => void
  initialTruck?: Omit<Truck, "id">
}

const FUEL_OPTIONS = [
  { value: "diesel", label: "Diesel" },
  { value: "gasoline", label: "Gasoline" },
  { value: "electric", label: "Electric" },
  { value: "hybrid", label: "Hybrid" },
]

export const CreateTruckModal = ({ isOpen, onClose, onSubmit, initialTruck }: CreateTruckModalProps) => {
  const isEditing = Boolean(initialTruck)
  const toast = useToast()

  const form = useForm<TruckFormValues>({
    resolver: zodResolver(truckFormSchema),
    defaultValues: initialTruck
      ? {
          licensePlate: initialTruck.licensePlate || "",
          model: initialTruck.model || "",
          year: initialTruck.year || new Date().getFullYear(),
          capacity: initialTruck.capacity || 0,
          location: initialTruck.location || "",
          mileage: initialTruck.mileage || 0,
          lastMaintenance: initialTruck.lastMaintenance || "",
          nextMaintenance: initialTruck.nextMaintenance || "",
          fuelType: initialTruck.fuelType || "diesel",
        }
      : {
          licensePlate: "",
          model: "",
          year: new Date().getFullYear(),
          capacity: 0,
          location: "",
          mileage: 0,
          lastMaintenance: "",
          nextMaintenance: "",
          fuelType: "diesel",
        },
  })

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form

  useEffect(() => {
    if (isOpen) {
      const formValues: TruckFormValues = initialTruck
        ? {
            licensePlate: initialTruck.licensePlate || "",
            model: initialTruck.model || "",
            year: initialTruck.year || new Date().getFullYear(),
            capacity: initialTruck.capacity || 0,
            location: initialTruck.location || "",
            mileage: initialTruck.mileage || 0,
            lastMaintenance: initialTruck.lastMaintenance || "",
            nextMaintenance: initialTruck.nextMaintenance || "",
            fuelType: (initialTruck.fuelType as "diesel" | "gasoline" | "electric" | "hybrid") || "diesel",
          }
        : {
            licensePlate: "",
            model: "",
            year: new Date().getFullYear(),
            capacity: 0,
            location: "",
            mileage: 0,
            lastMaintenance: "",
            nextMaintenance: "",
            fuelType: "diesel",
          }

      setTimeout(() => {
        return reset(formValues)
      }, 0)
    }
  }, [isOpen, initialTruck, reset])

  const onSubmitForm = async (values: TruckFormValues) => {
    try {
      await new Promise((r) => setTimeout(r, 500))

      onSubmit({
        ...values,
        status: isEditing ? (initialTruck?.status ?? "available") : "available",
      })
      toast.success(isEditing ? "Truck Updated Successfully!" : "Truck Created Successfully!", {
        description: isEditing
          ? `Truck ${values.licensePlate} has been updated.`
          : `Truck ${values.licensePlate} has been added to the fleet.`,
      })
      handleClose()
    } catch (err) {
      console.error(err)
      toast.error(isEditing ? "Failed To Update Truck" : "Failed To Create Truck", {
        description: "An unexpected error occurred. Please try again.",
      })
    }
  }

  const handleClose = () => {
    if (isSubmitting) {
      toast.error("Operation In Progress", {
        description: "Please wait for the current operation to complete.",
      })
      return
    }
    reset()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-50 rounded-full">
              <Info className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <DialogTitle>{isEditing ? "Edit Truck" : "Add New Truck"}</DialogTitle>
              <DialogDescription>
                {isEditing
                  ? "Update truck details. All fields are required."
                  : "Add a new truck to your fleet. All fields are required."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="licensePlate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>License Plate *</FormLabel>
                    <FormControl>
                      <Input placeholder="ABC-1234" disabled={isSubmitting} className="text-sm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Freightliner Cascadia"
                        disabled={isSubmitting}
                        className="text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1900}
                        max={new Date().getFullYear() + 1}
                        disabled={isSubmitting}
                        className="text-sm"
                        {...field}
                        onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capacity (lbs) *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="80000"
                        disabled={isSubmitting}
                        className="text-sm"
                        {...field}
                        onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Location *</FormLabel>
                    <FormControl>
                      <Input placeholder="Los Angeles, CA" disabled={isSubmitting} className="text-sm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mileage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mileage *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="150000"
                        disabled={isSubmitting}
                        className="text-sm"
                        {...field}
                        onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="fuelType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fuel Type *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} disabled={isSubmitting}>
                    <FormControl>
                      <SelectTrigger className="w-full text-sm">
                        <SelectValue placeholder="Select fuel" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {FUEL_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="lastMaintenance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Maintenance *</FormLabel>
                    <FormControl>
                      <Input type="date" disabled={isSubmitting} className="text-sm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nextMaintenance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Next Maintenance *</FormLabel>
                    <FormControl>
                      <Input type="date" disabled={isSubmitting} className="text-sm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-start space-x-2">
              <Info className="h-5 w-5 text-orange-600 mt-1 flex-shrink-0" />
              <p className="text-sm text-orange-800">
                New trucks start with 'available' status. Ensure all maintenance dates are accurate for proper fleet
                management.
              </p>
            </div>

            <DialogFooter className="flex justify-end space-x-3 pt-6">
              <Button type="button" variant="outline" size="sm" onClick={handleClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button size="sm" type="submit" disabled={isSubmitting}>
                {isSubmitting ? (isEditing ? "Updating..." : "Adding...") : isEditing ? "Update Truck" : "Add Truck"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateTruckModal
