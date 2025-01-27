import { useState } from "react"
import useHouseStore from "../../../../store/houseStore"
import { SelectOption } from "./components"

export const HouseTypeDropdown = () => {

  const [isOpen, setIsOpen] = useState(false)
 
  

  const type = useHouseStore(store => store.filters.type);

  return (
    <div className="relative inline-block text-left border py-1 xl:p-0 lg:border-none 
    rounded-full w-full ">
  <div className="">
    <button
      onClick={() => setIsOpen(!isOpen)} 
      className="inline-flex justify-between gap-x-1.5 rounded-md w-full px-4 lg:px-2 xl:px-0
       py-2 text-md text-gray-900 xl:shadow-none 
        ">
      {type}
      <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
        <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
 
  <div className={`absolute ${isOpen ? '' : 'hidden'} right-0 z-10 mt-2 xl:w-56 w-full 
  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none`} >
    <div onClick={() => setIsOpen(!isOpen)}  className="py-1" role="none">
 
      <SelectOption houseType={'All'} />
      <SelectOption  houseType={'House'} />
      <SelectOption houseType={'Apartment'} />
    </div>
  </div>
</div>
  )
}

