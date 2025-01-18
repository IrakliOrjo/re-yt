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
    direction: 'next' | 'prev'

}

export const usePagination =  (
    items: ILocation[],
    itemsPerPage: number = 6
  ): IPaginationReturn  => {
  const [ currentPage, setCurrentPage ] = useState(1)
  const [ displayedItems, setDisplayedItems ] = useState<ILocation[]>([])
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const totalPages = Math.ceil(items.length / itemsPerPage)

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const newItems  = items.slice(startIndex, endIndex)

    if(displayedItems.length > 0){
      const numNewItems = newItems.length;
      const remainingItems = direction === 'next' ? displayedItems.slice(numNewItems) : displayedItems.slice(0, -numNewItems);
      const updatedItems = direction === 'next'
        ? [...remainingItems, ...newItems].slice(0, 6)
        : [...newItems, ...remainingItems].slice(0, 6);
    
      setDisplayedItems(updatedItems);
      return updatedItems;
  } else {
      const initialItems = newItems.slice(0, 6);
      setDisplayedItems(initialItems);
      return initialItems;
    }
    
  },[items, currentPage, itemsPerPage])

  const nextPage = () => {
    if (currentPage < totalPages) {
      setDirection('next');
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setDirection('prev');
      setCurrentPage(prev => prev - 1);
    }
  };

  const goToPage = (pageNumber: number) => {
    const page = Math.max(1, Math.min(pageNumber, totalPages));
    setDirection(page > currentPage ? 'next' : 'prev');
    setCurrentPage(page);
  };

  const resetPagination = () => {
    setCurrentPage(1);
    setDirection('next');
  };

  return {
    currentPage,
    totalPages,
    nextPage,
    paginatedData,
    prevPage,
    goToPage,
    resetPagination,
    direction
  }

}

 