import type { Load } from "@/types"
import { LOAD_STATUSES, FILTER_OPTIONS } from "@/constants"

export const filterLoads = (
  loads: Load[],
  searchTerm: string,
  statusFilter: string,
  clientFilter: string,
  carrierFilter: string,
): Load[] => {
  let filtered = loads

  if (searchTerm) {
    filtered = filtered.filter(
      (load) =>
        load.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        load.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        load.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
        load.carrier_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        load.id.toString().includes(searchTerm),
    )
  }

  if (statusFilter !== LOAD_STATUSES.ALL) {
    filtered = filtered.filter((load) => load.status.toLowerCase() === statusFilter.toLowerCase())
  }

  if (clientFilter !== FILTER_OPTIONS.ALL_CLIENTS) {
    filtered = filtered.filter((load) => load.client_name === clientFilter)
  }

  if (carrierFilter !== FILTER_OPTIONS.ALL_CARRIERS) {
    filtered = filtered.filter((load) => load.carrier_name === carrierFilter)
  }

  return filtered
}

export const getUniqueClients = (loads: Load[]): string[] => {
  return Array.from(new Set(loads.map((load) => load.client_name))).sort()
}

export const getUniqueCarriers = (loads: Load[]): string[] => {
  return Array.from(new Set(loads.map((load) => load.carrier_name))).sort()
}
