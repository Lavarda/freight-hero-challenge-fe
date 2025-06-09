"use client"
import { Button } from "@/components/ui/button"
import { RefreshCw, Plus } from "lucide-react"

interface DashboardHeaderProps {
  totalLoads: number
  onCreateLoad: () => void
}

export const DashboardHeader = (props: DashboardHeaderProps) => {
  const { totalLoads, onCreateLoad } = props
  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b p-4 mb-8">
      <div className="flex h-12 w-full items-center gap-3 md:gap-6 px-2 md:px-4">
        <img src="/logo.png" alt="Freight Hero" className="h-7 md:h-20 w-auto flex-shrink-0" />

        <div className="flex-1 min-w-0">
          <h1 className="text-lg md:text-2xl font-bold text-gray-900 truncate">
            <span className="hidden sm:inline">Load Management Dashboard</span>
            <span className="sm:hidden">Dashboard</span>
          </h1>
          <p className="text-xs md:text-sm text-gray-600">
            <span className="hidden md:inline">Manage your freight operations efficiently • </span>
            {totalLoads} total loads
          </p>
        </div>

        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4" />
            <span className="hidden md:inline">Refresh All</span>
            <span className="md:hidden">Refresh</span>
          </Button>
          <Button size="sm" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700" onClick={onCreateLoad}>
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Create Load</span>
            <span className="sm:hidden">Create</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
