import { useMemo, useState } from "react"
import { ILocation } from "../types/locations";

interface IPaginationReturn  {
    currentPage: number;
    totalPages: number
    paginatedData: ILocation[]
    nextPage: () => void
    prevPage: () => void
    goToPage: (pageNumber: number) => void
    resetPagination: () => void

}

export const usePagination =  (
    items: ILocation[],
    itemsPerPage: number = 6
  ): IPaginationReturn  => {
  const [ currentPage, setCurrentPage ] = useState(1)

  const totalPages = Math.ceil(items.length / itemsPerPage)

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    console.log('startIndex', startIndex)
    console.log('endIndex', endIndex)
    return items.slice(startIndex, endIndex)
  },[items, currentPage, itemsPerPage])

  const nextPage = () => {
    setCurrentPage((prev) => (prev < totalPages) ? prev + 1 : prev)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev > 1) ? prev - 1 : prev)
  }

  const goToPage = (pageNumber: number ) => {
    const page = Math.max(1, Math.min(pageNumber, totalPages))
    setCurrentPage(page)
  }

  const resetPagination = () => {
    setCurrentPage
  }

  return {
    currentPage,
    totalPages,
    nextPage,
    paginatedData,
    prevPage,
    goToPage,
    resetPagination
  }

}

 