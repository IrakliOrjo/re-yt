import { FC } from "react"
import useHouseStore from "../../../../../store/houseStore"

interface ISelectOptionProps {
  houseType: 'house' | 'appartment' | 'all'
}

export const SelectOption:FC <ISelectOptionProps> = ({ houseType}) => {

  const updateFilters = useHouseStore(store => store.updateFilters);

  return (
    <p onClick={() => updateFilters({type: houseType})} 
    className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:text-blue-500
    " 
    >{houseType}</p>
  )
}

