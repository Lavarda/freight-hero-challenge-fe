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
import { useToast } from "@/hooks/UseToastService"
import type { Load } from "@/types"
import { LOAD_STATUSES } from "@/constants"
import { loadFormSchema, LoadFormValues } from "@/schemas/load"

interface CreateLoadModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (load: Omit<Load, "id">) => void
  initialLoad?: Omit<Load, "id">
}

export const CreateLoadModal = ({ isOpen, onClose, onSubmit, initialLoad }: CreateLoadModalProps) => {
  const isEditing = Boolean(initialLoad)
  const toast = useToast()

  const form = useForm<LoadFormValues>({
    resolver: zodResolver(loadFormSchema),
    defaultValues: initialLoad
      ? {
          status: initialLoad.status || LOAD_STATUSES.PICK_UP,
          origin: initialLoad.origin || "",
          destination: initialLoad.destination || "",
          client_name: initialLoad.client_name || "",
          carrier_name: initialLoad.carrier_name || "",
        }
      : {
          status: LOAD_STATUSES.PICK_UP,
          origin: "",
          destination: "",
          client_name: "",
          carrier_name: "",
        },
  })

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form

  useEffect(() => {
    if (isOpen) {
      const formValues = initialLoad
        ? {
            status: initialLoad.status || LOAD_STATUSES.PICK_UP,
            origin: initialLoad.origin || "",
            destination: initialLoad.destination || "",
            client_name: initialLoad.client_name || "",
            carrier_name: initialLoad.carrier_name || "",
          }
        : {
            status: LOAD_STATUSES.PICK_UP,
            origin: "",
            destination: "",
            client_name: "",
            carrier_name: "",
          }

      setTimeout(() => {
        reset(formValues)
      }, 0)
    }
  }, [isOpen, initialLoad, reset])

  const onSubmitForm = async (values: LoadFormValues) => {
    try {
      await new Promise((r) => setTimeout(r, 1500))

      onSubmit(values)
      toast.success(isEditing ? "Load Updated Successfully!" : "Load Created Successfully!", {
        description: isEditing
          ? `Load from ${values.origin} to ${values.destination} was updated.`
          : `Load from ${values.origin} to ${values.destination} has been added.`,
      })
      handleClose()
    } catch (err) {
      toast.error(isEditing ? "Failed To Update Load" : "Failed To Create Load", {
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
      <DialogContent className="sm:max-w-xl max-w-sm">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <Info className="h-5 w-5 text-blue-600" />
            <div>
              <DialogTitle>{isEditing ? "Edit Load" : "Create New Load"}</DialogTitle>
              <DialogDescription>
                {isEditing
                  ? "Update the load details below. All fields are required."
                  : "Add a new load to the system. All fields are required."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="origin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Origin *</FormLabel>
                    <FormControl>
                      <Input placeholder="Los Angeles, CA" disabled={isSubmitting} className="text-sm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination *</FormLabel>
                    <FormControl>
                      <Input placeholder="Las Vegas, NV" disabled={isSubmitting} className="text-sm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="client_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" disabled={isSubmitting} className="text-sm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="carrier_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Carrier Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Express Logistics" disabled={isSubmitting} className="text-sm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} disabled={isSubmitting}>
                      <FormControl>
                        <SelectTrigger className="w-full text-sm">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={LOAD_STATUSES.PICK_UP}>Pick Up</SelectItem>
                        <SelectItem value={LOAD_STATUSES.IN_ROUTE}>In Route</SelectItem>
                        <SelectItem value={LOAD_STATUSES.DELIVERED}>Delivered</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
              <Info className="h-5 w-5 text-blue-600 mt-1" />
              <p className="text-sm text-blue-800">
                New loads default to "Pick Up" status. Ensure origin and destination are different.
              </p>
            </div>

            <DialogFooter className="flex justify-end space-x-2">
              <Button variant="outline" size="sm" type="button" onClick={handleClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button size="sm" type="submit" disabled={isSubmitting}>
                {isSubmitting ? (isEditing ? "Updating..." : "Creating...") : isEditing ? "Update Load" : "Create Load"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
