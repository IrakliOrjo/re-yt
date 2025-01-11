import { FC } from "react"
import useHouseStore from "../../../../../store/houseStore"

interface ISelectOptionProps {
  houseType: 'House' | 'Apartment' | 'All'
}

export const SelectOption:FC <ISelectOptionProps> = ({ houseType}) => {

  const setType = useHouseStore(store => store.setType)

  return (
    <p onClick={() => setType(houseType)} className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-300" >{houseType}</p>
  )
}

