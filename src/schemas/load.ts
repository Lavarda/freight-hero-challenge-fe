import { z } from "zod"

export const loadFormSchema = z
  .object({
    status: z.string().min(1, {
      message: "Status is required.",
    }),
    origin: z.string().min(2, {
      message: "Origin must be at least 2 characters.",
    }),
    destination: z.string().min(2, {
      message: "Destination must be at least 2 characters.",
    }),
    client_name: z.string().min(2, {
      message: "Client Name must be at least 2 characters.",
    }),
    carrier_name: z.string().min(2, {
      message: "Carrier Name must be at least 2 characters.",
    }),
  })
  .refine((data) => data.origin !== data.destination, {
    message: "Origin and destination must be different.",
    path: ["destination"],
  })

export type LoadFormValues = z.infer<typeof loadFormSchema>