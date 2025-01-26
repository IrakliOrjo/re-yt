import { FC, useEffect, useState } from "react"
import { AmountInput } from "./components";
import useHouseStore from "../../../../store/houseStore";
import { SelectInput } from "./components/SelectInput/SelectInput";
import { SearchCheckbox } from "./components/CheckBox"; 
import { AMENITIES } from "./consts";

interface IAdvancedSearchProps {
    isOpen: boolean
}

export const AdvancedSearch:FC <IAdvancedSearchProps> = ({isOpen}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      setIsVisible(isOpen);
    }, [isOpen]);

    const minPrice = useHouseStore(store => store.filters.minPrice);
    const maxPrice = useHouseStore(store => store.filters.maxPrice);
    const minArea = useHouseStore(store => store.filters.minArea);
    const maxArea = useHouseStore(store => store.filters.maxArea);
    const toggleAmenity = useHouseStore(store => store.toggleAmenity);
    const updateFilters = useHouseStore(store => store.updateFilters);


  return (
    <div 
        className={`xl:h-[388px] xl:top-24 top-[25.5rem] w-full absolute bg-white rounded-xl shadow-xl 
          transition-all duration-500 flex flex-col px-4 py-6 z-10
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'} `}
         >

        <div className="flex flex-col xl:flex-row xl:gap-24 gap-4">
            <div className="flex flex-col">
                <p className="font-[500] text-[16px]">Full price</p>
                <div className="flex gap-6">
                <AmountInput value={minPrice} onChange={(e) => updateFilters({minPrice: e.target.value})} placeholder="From" width={150} />
                <AmountInput value={maxPrice} onChange={(e) => updateFilters({maxPrice: e.target.value})} placeholder="To" width={150} />
                </div>
            </div>
            <div className="flex flex-col">
                <p className="font-[500] text-[16px]">Area Sqmt</p>
                <div className="flex gap-6">
                <AmountInput value={minArea} onChange={(e) => updateFilters({minArea: e.target.value})} placeholder="From" width={150} />
                <AmountInput value={maxArea} onChange={(e) => updateFilters({maxArea: e.target.value})} placeholder="To" width={150} />
                </div>
            </div>
        </div>        
        <div className="flex flex-col xl:flex-row gap-4 mt-4">
          <div className="flex flex-col">
                <p className="font-[500] text-[16px] mb-2">Rooms</p>
                <div className="flex gap-6">
                <SelectInput itemName="Room" />
               
                </div>
          </div>
          <div className="flex flex-col">
                <p className="font-[500] text-[16px] mb-2">Bathrooms</p>
                <div className="flex gap-6">
                <SelectInput itemName="Bathroom" />
               
                </div>
          </div>
        </div>   
        <div className="grid grid-cols-2 xl:grid-cols-6 mt-3">
          {AMENITIES.map((amenity) => (<SearchCheckbox onClick={() => toggleAmenity(amenity)} key={amenity} amenitie={amenity} />))}
          
        </div>
    </div>
  )
}

