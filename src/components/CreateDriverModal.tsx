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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Info } from "lucide-react"
import { useToast } from "@/hooks/UseToastService"
import type { Driver } from "@/types"
import { driverFormSchema, DriverFormValues } from "@/schemas/driver"

interface CreateDriverModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (driver: Driver) => void
  initialDriver?: Driver
}

export const CreateDriverModal = ({ isOpen, onClose, onSubmit, initialDriver }: CreateDriverModalProps) => {
  const isEditing = Boolean(initialDriver)
  const toast = useToast()

  const form = useForm<DriverFormValues>({
    resolver: zodResolver(driverFormSchema),
    defaultValues: initialDriver
      ? {
          name: initialDriver.name || "",
          location: initialDriver.location || "",
          phone: initialDriver.phone || "",
          email: initialDriver.email || "",
          licenseNumber: initialDriver.licenseNumber || "",
          licenseExpiry: initialDriver.licenseExpiry || "",
        }
      : {
          name: "",
          location: "",
          phone: "",
          email: "",
          licenseNumber: "",
          licenseExpiry: "",
        },
  })

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form

  useEffect(() => {
    if (isOpen) {
      const formValues = initialDriver
        ? {
            name: initialDriver.name || "",
            location: initialDriver.location || "",
            phone: initialDriver.phone || "",
            email: initialDriver.email || "",
            licenseNumber: initialDriver.licenseNumber || "",
            licenseExpiry: initialDriver.licenseExpiry || "",
          }
        : {
            name: "",
            location: "",
            phone: "",
            email: "",
            licenseNumber: "",
            licenseExpiry: "",
          }

      setTimeout(() => {
        reset(formValues)
      }, 0)
    }
  }, [isOpen, initialDriver, reset])

  const onSubmitForm = async (values: DriverFormValues) => {
    try {
      await new Promise((r) => setTimeout(r, 500))

      const driverPayload: Driver = isEditing
        ? { ...initialDriver!, ...values }
        : {
            ...values,
            id: 0,
            status: "available",
            rating: 4.0,
            completedLoads: 0,
          }

      onSubmit(driverPayload)
      toast.success(isEditing ? "Driver updated successfully!" : "Driver created successfully!", {
        description: isEditing
          ? `Driver ${values.name} has been updated.`
          : `Driver ${values.name} has been added to the fleet.`,
      })
      handleClose()
    } catch (err) {
      toast.error(isEditing ? "Failed to update driver" : "Failed to create driver", {
        description: "An unexpected error occurred. Please try again.",
      })
    }
  }

  const handleClose = () => {
    if (isSubmitting) {
      toast.error("Operation in progress.", { description: "Please wait for it to complete." })
      return
    }
    reset()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-lg max-w-full">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Driver" : "Add New Driver"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update driver information. All fields are required."
              : "Add a new driver to your fleet. All fields are required."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" disabled={isSubmitting} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Location *</FormLabel>
                  <FormControl>
                    <Input placeholder="Hamburg, Germany" disabled={isSubmitting} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+49 171 1234567" disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john.doe@example.com" disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="licenseNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>License Number *</FormLabel>
                    <FormControl>
                      <Input placeholder="DL123456789" disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="licenseExpiry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>License Expiry *</FormLabel>
                    <FormControl>
                      <Input type="date" disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-2">
              <Info className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
              <p className="text-sm text-blue-800">
                {isEditing
                  ? "Update driver information. Status and rating can only be changed by the system."
                  : "New drivers start with 'available' status and default rating. All fields are mandatory."}
              </p>
            </div>

            <DialogFooter className="flex justify-end space-x-2">
              <Button type="button" variant="outline" size="sm" onClick={handleClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button size="sm" type="submit" disabled={isSubmitting}>
                {isSubmitting ? (isEditing ? "Updating..." : "Adding...") : isEditing ? "Update Driver" : "Add Driver"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
