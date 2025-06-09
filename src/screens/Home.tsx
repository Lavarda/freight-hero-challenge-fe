"use client"
import { useEffect, useState } from "react"
import { DashboardHeader } from "@/components/DashboardHeader"
import { StatsCards } from "@/components/StatsCards"
import { SearchAndFilters } from "@/components/SearchAndFilters"
import { LoadCard } from "@/components/LoadCard"
import { CreateLoadModal } from "@/components/CreateLoadModal"
import { LoadDetailsModal } from "@/components/LoadDetailsModals"
import { DriverManagement, type Driver } from "@/components/DriverManagement"
import { TruckManagement } from "@/components/TruckManagement"

import { useToast } from "@/hooks/UseToastService"
import type { Truck, Load } from "@/types"
import { LOAD_STATUSES, DRIVER_STATUSES, TRUCK_STATUSES, FILTER_OPTIONS } from "@/constants"
import { filterLoads, getUniqueClients, getUniqueCarriers } from "@/utils/search"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import CreateTruckModal from "@/components/CreateTruckModal"
import { CreateDriverModal } from "@/components/CreateDriverModal"

export const Main = () => {
  const BASE_URL = window.location.origin + import.meta.env.BASE_URL;
  const toast = useToast()
  const [loads, setLoads] = useState<Load[]>([])
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [trucks, setTrucks] = useState<Truck[]>([])
  const [filteredLoads, setFilteredLoads] = useState<Load[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState(LOAD_STATUSES.ALL)
  const [clientFilter, setClientFilter] = useState(FILTER_OPTIONS.ALL_CLIENTS)
  const [carrierFilter, setCarrierFilter] = useState(FILTER_OPTIONS.ALL_CARRIERS)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedLoad, setSelectedLoad] = useState<Load | null>(null)

  const [showEditDriverModal, setShowEditDriverModal] = useState(false)
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null)
  const [showEditTruckModal, setShowEditTruckModal] = useState(false)
  const [selectedTruck, setSelectedTruck] = useState<Truck | null>(null)

  useEffect(() => {
    const fetchLoads = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`${BASE_URL}/loads-mock.json`)
        if (!response.ok) {
          throw new Error("Failed to fetch loads data")
        }

        const data = await response.json()
        setLoads(data.loads)
      
        toast.success("Loads Loaded Successfully!", {
          description: `${data.loads.length} loads loaded.`,
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchLoads()
  }, [])

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`${BASE_URL}/drivers-mock.json`)
        if (!response.ok) {
          throw new Error("Failed to fetch loads data")
        }

        const data = await response.json()
        setDrivers(data.drivers)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchDrivers()
  }, [])

  useEffect(() => {
    const fetchTrucks = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`${BASE_URL}/trucks-mock.json`)
        if (!response.ok) {
          throw new Error("Failed to fetch loads data")
        }

        const data = await response.json()
        setTrucks(data.trucks)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchTrucks()
  }, [])

  useEffect(() => {
    const filtered = filterLoads(loads, searchTerm, statusFilter, clientFilter, carrierFilter)
    setFilteredLoads(filtered)
  }, [loads, searchTerm, statusFilter, clientFilter, carrierFilter])

  const getStatsCounts = () => {
    const totalLoads = loads.length
    const pickUpCount = loads.filter((load) => load.status.toLowerCase() === LOAD_STATUSES.PICK_UP).length
    const inRouteCount = loads.filter((load) => load.status.toLowerCase() === LOAD_STATUSES.IN_ROUTE).length
    const deliveredCount = loads.filter((load) => load.status.toLowerCase() === LOAD_STATUSES.DELIVERED).length
    const availableDrivers = drivers.filter((driver) => driver.status === DRIVER_STATUSES.AVAILABLE).length
    const availableTrucks = trucks.filter((truck) => truck.status === TRUCK_STATUSES.AVAILABLE).length

    return {
      totalLoads,
      pickUpCount,
      inRouteCount,
      deliveredCount,
      availableDrivers,
      availableTrucks,
    }
  }

  const handleDeleteLoad = (id: number) => {
    setLoads((prevLoads) => prevLoads.filter((load) => load.id !== id))
  }

  const handleCreateLoad = (newLoadData: Omit<Load, "id">) => {
    const newLoad: Load = {
      ...newLoadData,
      id: Math.max(...loads.map((load) => load.id), 0) + 1,
    }
    setLoads((prevLoads) => [newLoad, ...prevLoads])
  }

  const handleUpdateLoad = (updatedLoad: Load) => {
    setLoads((prevLoads) => prevLoads.map((load) => (load.id === updatedLoad.id ? updatedLoad : load)))
  }

  const handleCreateDriver = (newDriverData: Omit<Driver, "id">) => {
    const newDriver: Driver = {
      ...newDriverData,
      id: Math.max(...drivers.map((driver) => driver.id), 0) + 1,
    }
    setDrivers((prevDrivers) => [...prevDrivers, newDriver])
  }

  const handleDeleteDriver = (id: number) => {
    setDrivers((prevDrivers) => prevDrivers.filter((driver) => driver.id !== id))
  }

  const handleUpdateDriver = (updatedDriver: Driver) => {
    setDrivers((prevDrivers) => prevDrivers.map((driver) => (driver.id === updatedDriver.id ? updatedDriver : driver)))
  }

  const handleViewDetails = (load: Load) => {
    setSelectedLoad(load)
    setShowDetailsModal(true)
  }

  const handleEditLoad = (load: Load) => {
    setSelectedLoad(load)
    setShowEditModal(true)
    setShowDetailsModal(false)
  }

  const handleExportCSV = () => {
    setTimeout(() => {
      const csvContent = [
        ["ID", "Status", "Origin", "Destination", "Client", "Carrier"],
        ...filteredLoads.map((load) => [
          load.id.toString(),
          load.status,
          load.origin,
          load.destination,
          load.client_name,
          load.carrier_name,
        ]),
      ]
        .map((row) => row.map((field) => `"${field}"`).join(","))
        .join("\n")

      const blob = new Blob([csvContent], { type: "text/csv" })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = "loads-export.csv"
      link.click()
      window.URL.revokeObjectURL(url)

      toast.success("CSV Exported Successfully!", {
        description: `${filteredLoads.length} loads exported to CSV file.`,
      })
    }, 500)
  }

  const handleImportCSV = (importedLoads: any[]) => {
    try {
      const validLoads: Load[] = importedLoads.map((load) => {  
        let newId = Math.floor(Math.random() * 1000000)

        return {
          id: newId,
          status: load.status,
          origin: load.origin,
          destination: load.destination,
          client_name: load.client_name,
          carrier_name: load.carrier_name,
        }
      })
      setLoads((prevLoads) => [...prevLoads, ...validLoads])
      toast.success("CSV Imported Successfully!", {
        description: `${validLoads.length} loads imported from CSV file.`,
      })
    } catch (error) {
      toast.error("Failed To Import CSV", {
        description: "An error occurred while importing the CSV file.",
      })
    }
  }

  const handleCreateTruck = (newTruckData: Omit<Truck, "id">) => {
    const newTruck: Truck = {
      ...newTruckData,
      id: Math.max(...trucks.map((truck) => truck.id), 0) + 1,
    }
    setTrucks((prevTrucks) => [...prevTrucks, newTruck])
  }

  const handleDeleteTruck = (id: number) => {
    setTrucks((prevTrucks) => prevTrucks.filter((truck) => truck.id !== id))
  }

  const handleEditTruck = (truck: Truck) => {
    setSelectedTruck(truck)
    setShowEditTruckModal(true)
  }

  const handleEditDriver = (driver: Driver) => {
    setSelectedDriver(driver)
    setShowEditDriverModal(true)
  }

  const stats = getStatsCounts()

  const handleUpdateTruck = (updatedTruck: Truck) => {
    setTrucks((prevTrucks) => prevTrucks.map((truck) => (truck.id === updatedTruck.id ? updatedTruck : truck)))

    toast.success("Truck Updated Successfully!", {
      description: `Truck ${updatedTruck.licensePlate} has been updated.`,
    })
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-2">⚠️ Error Loading Data</div>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <DashboardHeader totalLoads={stats.totalLoads} onCreateLoad={() => setShowCreateModal(true)} />
        <StatsCards stats={stats} />

        <Tabs defaultValue="loads" className="space-y-4">
          <TabsList>
            <TabsTrigger value="loads">Loads ({filteredLoads.length})</TabsTrigger>
            <TabsTrigger value="drivers">Drivers ({drivers.length})</TabsTrigger>
            <TabsTrigger value="trucks">Trucks ({trucks.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="loads" className="space-y-4">
            <SearchAndFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onStatusFilter={setStatusFilter}
              onClientFilter={setClientFilter}
              onCarrierFilter={setCarrierFilter}
              statusFilter={statusFilter}
              clientFilter={clientFilter}
              carrierFilter={carrierFilter}
              clients={getUniqueClients(loads)}
              carriers={getUniqueCarriers(loads)}
              onExportCSV={handleExportCSV}
              onImportCSV={handleImportCSV}
            />

            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="text-gray-600 mt-4">Loading freight data...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredLoads.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-xl mb-2">📦</div>
                    <p className="text-gray-600">
                      {loads.length === 0 ? "No loads found" : "No loads match your current filters"}
                    </p>
                  </div>
                ) : (
                  filteredLoads.map((load) => (
                    <LoadCard
                      key={load.id}
                      load={load}
                      onDelete={handleDeleteLoad}
                      onViewDetails={handleViewDetails}
                      onEdit={handleEditLoad}
                    />
                  ))
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="drivers" className="space-y-4">
            <DriverManagement
              drivers={drivers}
              onCreateDriver={handleCreateDriver}
              onDeleteDriver={handleDeleteDriver}
              onUpdateDriver={handleUpdateDriver}
              onEditDriver={handleEditDriver}
            />
          </TabsContent>

          <TabsContent value="trucks" className="space-y-4">
            <TruckManagement
              trucks={trucks}
              onCreateTruck={handleCreateTruck}
              onDeleteTruck={handleDeleteTruck}
              onEditTruck={handleEditTruck}
              onUpdateTruck={handleUpdateTruck}
            />
          </TabsContent>
        </Tabs>
      </div>

      <CreateLoadModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} onSubmit={handleCreateLoad} />

      <LoadDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        load={selectedLoad}
        onEdit={handleEditLoad}
      />

      <CreateDriverModal
        isOpen={showEditDriverModal}
        onClose={() => setShowEditDriverModal(false)}
        initialDriver={selectedDriver!}
        onSubmit={(updatedDriver) => handleUpdateDriver(updatedDriver)}
      />

      <CreateLoadModal
        isOpen={showEditModal}
        initialLoad={selectedLoad ?? undefined}
        onClose={() => {
          setShowEditModal(false);
          setSelectedLoad(null);
        }}
        onSubmit={(data) => {
          if (selectedLoad) {
            handleUpdateLoad({ ...selectedLoad, ...data });
          }
        }}
      />

      <CreateTruckModal
        isOpen={showEditTruckModal}
        onClose={() => setShowEditTruckModal(false)}
        initialTruck={selectedTruck ? (({ id, ...rest }) => rest)(selectedTruck) : undefined}
        onSubmit={(truckData) => {
          if (selectedTruck) {
            handleUpdateTruck({ ...selectedTruck, ...truckData });
          } else {
            handleCreateTruck(truckData);
          }
        }}
      />
    </div>
  )
}

export default Main
