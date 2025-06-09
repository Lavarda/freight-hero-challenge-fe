import { z } from "zod"

export const truckFormSchema = z.object({
  licensePlate: z.string().min(2, {
    message: "License Plate must be at least 2 characters.",
  }),
  model: z.string().min(2, {
    message: "Model must be at least 2 characters.",
  }),
  year: z
    .number()
    .min(1900, {
      message: "Year must be 1900 or later.",
    })
    .max(new Date().getFullYear() + 1, {
      message: `Year cannot be later than ${new Date().getFullYear() + 1}.`,
    }),
  capacity: z
    .number()
    .min(1, {
      message: "Capacity must be greater than 0.",
    })
    .max(200000, {
      message: "Capacity cannot exceed 200,000 lbs.",
    }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  mileage: z
    .number()
    .min(0, {
      message: "Mileage cannot be negative.",
    })
    .max(2000000, {
      message: "Mileage cannot exceed 2,000,000 miles.",
    }),
  lastMaintenance: z.string().min(1, {
    message: "Last Maintenance date is required.",
  }),
  nextMaintenance: z.string().min(1, {
    message: "Next Maintenance date is required.",
  }),
  fuelType: z.enum(["diesel", "gasoline", "electric", "hybrid"], {
    required_error: "Fuel Type is required.",
  }),
})

export type TruckFormValues = z.infer<typeof truckFormSchema>