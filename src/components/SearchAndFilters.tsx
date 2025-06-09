"use client"
import { useState, useRef } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Download, Upload, X, Menu } from "lucide-react"
import { LOAD_STATUSES, FILTER_OPTIONS, capitalized } from "@/constants"
import { Input } from "@/components/ui/input"

interface SearchAndFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  onStatusFilter: (status: string) => void
  onClientFilter: (client: string) => void
  onCarrierFilter: (carrier: string) => void
  statusFilter: string
  clientFilter: string
  carrierFilter: string
  clients: string[]
  carriers: string[]
  onExportCSV: () => void
  onImportCSV: (loads: any[]) => void
}

export const SearchAndFilters = (props: SearchAndFiltersProps) => {
  const {
    searchTerm,
    onSearchChange,
    onStatusFilter,
    onClientFilter,
    onCarrierFilter,
    statusFilter,
    clientFilter,
    carrierFilter,
    clients,
    carriers,
    onExportCSV,
    onImportCSV,
  } = props

  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const statuses = [LOAD_STATUSES.ALL, LOAD_STATUSES.PICK_UP, LOAD_STATUSES.IN_ROUTE, LOAD_STATUSES.DELIVERED]

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      alert("Please select a valid CSV file")
      return
    }

    try {
      const text = await file.text()
      const lines = text.split("\n").filter((line) => line.trim())

      if (lines.length < 2) {
        alert("CSV file must contain at least a header row and one data row")
        return
      }

      const parseCSVLine = (line: string): string[] => {
        const result = []
        let current = ""
        let inQuotes = false

        for (let i = 0; i < line.length; i++) {
          const char = line[i]

          if (char === '"') {
            inQuotes = !inQuotes
          } else if (char === "," && !inQuotes) {
            result.push(current.trim())
            current = ""
          } else {
            current += char
          }
        }

        result.push(current.trim())
        return result
      }

      const headers = parseCSVLine(lines[0]).map((h) => h.toLowerCase().replace(/"/g, ""))

      const headerMap = {
        id: ["id", "load_id", "loadid"],
        status: ["status", "load_status"],
        origin: ["origin", "from", "pickup", "source"],
        destination: ["destination", "to", "delivery", "dest"],
        client_name: ["client", "client_name", "customer", "customer_name"],
        carrier_name: ["carrier", "carrier_name", "transport", "transporter"],
      }

      const getColumnIndex = (fieldMappings: string[]) => {
        for (const mapping of fieldMappings) {
          const index = headers.findIndex((h) => h.includes(mapping))
          if (index !== -1) return index
        }
        return -1
      }

      const columnIndices = {
        id: getColumnIndex(headerMap.id),
        status: getColumnIndex(headerMap.status),
        origin: getColumnIndex(headerMap.origin),
        destination: getColumnIndex(headerMap.destination),
        client_name: getColumnIndex(headerMap.client_name),
        carrier_name: getColumnIndex(headerMap.carrier_name),
      }

      const missingColumns = Object.entries(columnIndices)
        .filter(([_, index]) => index === -1)
        .map(([field, _]) => field)

      if (missingColumns.length > 0) {
        alert(
          `Missing required columns: ${missingColumns.join(", ")}. Expected: ID, Status, Origin, Destination, Client, Carrier`,
        )
        return
      }

      const loads = []
      for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i])

        if (values.length >= Math.max(...Object.values(columnIndices)) + 1) {
          const load = {
            id: Number.parseInt(values[columnIndices.id]) || Math.floor(Math.random() * 1000000),
            status: values[columnIndices.status].toLowerCase().replace(/"/g, ""),
            origin: values[columnIndices.origin].replace(/"/g, ""),
            destination: values[columnIndices.destination].replace(/"/g, ""),
            client_name: values[columnIndices.client_name].replace(/"/g, ""),
            carrier_name: values[columnIndices.carrier_name].replace(/"/g, ""),
          }

          if (load.origin && load.destination && load.client_name && load.carrier_name) {
            loads.push(load)
          }
        }
      }

      if (loads.length === 0) {
        alert("No valid load data found in the CSV file")
        return
      }

      onImportCSV(loads)

      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    } catch (error) {
      console.error("Error parsing CSV file:", error)
      alert("Error reading CSV file. Please check the file format.")
    }
  }

  return (
    <div className="bg-white rounded-lg border p-3 md:p-4 mb-4 md:mb-6">
      <div className="block md:hidden space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search loads..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSearchChange("")}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 hover:bg-gray-100"
            >
              <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </Button>
          )}
        </div>

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <Menu className="h-4 w-4" />
            Filters
          </Button>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={handleImportClick}>
              <Upload className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={onExportCSV}>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {showMobileFilters && (
          <div className="space-y-2 pt-2 border-t">
            <div className="grid grid-cols-1 gap-2">
              <Select value={statusFilter} onValueChange={onStatusFilter}>
                <SelectTrigger className="w-full">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <SelectValue placeholder="Select status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {capitalized(status)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={clientFilter} onValueChange={onClientFilter}>
                <SelectTrigger className="w-full">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <SelectValue placeholder="Select client" />
                  </div>
                </SelectTrigger>
                <SelectContent className="max-h-48">
                  <SelectItem value={FILTER_OPTIONS.ALL_CLIENTS}>{FILTER_OPTIONS.ALL_CLIENTS}</SelectItem>
                  {clients.map((client) => (
                    <SelectItem key={client} value={client}>
                      {client}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={carrierFilter} onValueChange={onCarrierFilter}>
                <SelectTrigger className="w-full">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <SelectValue placeholder="Select carrier" />
                  </div>
                </SelectTrigger>
                <SelectContent className="max-h-48">
                  <SelectItem value={FILTER_OPTIONS.ALL_CARRIERS}>{FILTER_OPTIONS.ALL_CARRIERS}</SelectItem>
                  {carriers.map((carrier) => (
                    <SelectItem key={carrier} value={carrier}>
                      {carrier}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      <div className="hidden md:flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search loads..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSearchChange("")}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 hover:bg-gray-100"
              >
                <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Select value={statusFilter} onValueChange={onStatusFilter}>
              <SelectTrigger className="w-48">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <SelectValue placeholder="Select status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {capitalized(status)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={clientFilter} onValueChange={onClientFilter}>
              <SelectTrigger className="w-48">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <SelectValue placeholder="Select client" />
                </div>
              </SelectTrigger>
              <SelectContent className="max-h-48">
                <SelectItem value={FILTER_OPTIONS.ALL_CLIENTS}>{FILTER_OPTIONS.ALL_CLIENTS}</SelectItem>
                {clients.map((client) => (
                  <SelectItem key={client} value={client}>
                    {client}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={carrierFilter} onValueChange={onCarrierFilter}>
              <SelectTrigger className="w-48">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <SelectValue placeholder="Select carrier" />
                </div>
              </SelectTrigger>
              <SelectContent className="max-h-48">
                <SelectItem value={FILTER_OPTIONS.ALL_CARRIERS}>{FILTER_OPTIONS.ALL_CARRIERS}</SelectItem>
                {carriers.map((carrier) => (
                  <SelectItem key={carrier} value={carrier}>
                    {carrier}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={handleImportClick}>
            <Upload className="h-4 w-4" />
            Import CSV
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={onExportCSV}>
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <input ref={fileInputRef} type="file" accept=".csv" onChange={handleFileChange} style={{ display: "none" }} />
    </div>
  )
}
