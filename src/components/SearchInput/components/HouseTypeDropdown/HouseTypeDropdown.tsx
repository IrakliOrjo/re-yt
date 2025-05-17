import { FC, useState } from "react"
import { HouseType } from "../../../../types/houses"

interface HouseTypeDropdownProps {
  selectedType: HouseType
  onChange: (type: HouseType) => void
}

export const HouseTypeDropdown:FC<HouseTypeDropdownProps > = ({selectedType, onChange}) => {
  const [isOpen, setIsOpen] = useState(false)


  
  const options = [
    {value:'all', label:'All types'},
    {value:'house', label:'House'},
    {value:'appartment', label:'Apartment'},
  ]

  const handleSelect = (type: HouseType) => {
    onChange(type)
    setIsOpen(false)
  }


  return (
    <div className="relative inline-block text-left border py-1 xl:p-0 lg:border-none 
    rounded-full w-full ">
  <div className="">
    <button
      onClick={() => setIsOpen(!isOpen)} 
      className="inline-flex justify-between gap-x-1.5 rounded-md w-full px-4 lg:px-2 xl:px-0
       py-2 text-md text-gray-900 xl:shadow-none 
        ">
      {options.find(opt => opt.value === selectedType)?.label ?? 'Select Type'}
      <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
        <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
 
 {isOpen && (
  <div 
    className="absolute z-10 w-full mt-1 bg-white border border-gray-300 
    rounded-md shadow-lg">
    {options.map((option) => (
      <div
        key={option.value}
        className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${selectedType === option.value ? 'bg-blue-50' : ''}`}
        onClick={() => handleSelect(option.value as HouseType)}
        >
        {option.label}
      </div>
    ))}
  </div>
 )}
</div>
  )
}

