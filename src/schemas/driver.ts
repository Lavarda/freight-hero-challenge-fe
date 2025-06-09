import { z } from "zod"

export const driverFormSchema = z.object({
  name: z.string().min(2, {
    message: "Full Name must be at least 2 characters.",
  }),
  location: z.string().min(2, {
    message: "Current Location must be at least 2 characters.",
  }),
  phone: z.string().min(10, {
    message: "Phone Number must be at least 10 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  licenseNumber: z.string().min(5, {
    message: "License Number must be at least 5 characters.",
  }),
  licenseExpiry: z.string().min(1, {
    message: "License Expiry is required.",
  }),
})

export type DriverFormValues = z.infer<typeof driverFormSchema>