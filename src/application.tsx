import { createBrowserRouter, RouterProvider } from "react-router"
import { createRoot } from "react-dom/client"
import { StrictMode } from "react"
import { Toaster } from "@/components/ui/sonner"

import { Main } from "./screens/Home"

import "./application.css"

const main = document.getElementById("main")
const root = createRoot(main!)

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
])

root.render(
  <StrictMode>
    <RouterProvider router={browserRouter} />
    <Toaster />
  </StrictMode>,
)
