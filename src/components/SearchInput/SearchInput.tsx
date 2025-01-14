import { useState } from "react"
import { SearchIcon } from "../../assets/icons/SearchIcon"
import { SettingsIcon } from "../../assets/icons/SettingsIcons"
import useHouseStore from "../../store/houseStore"
import { Button } from "../Button"
import { HouseTypeDropdown } from "./components/HouseTypeDropdown"
import { Input } from "./components/Input"
import { AdvancedSearch } from "./components/AdvancedSearch"


export const SearchInput = () => {

  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false)


  const updateFilters = useHouseStore(store => store.updateFilters)
  const locationQuery = useHouseStore(store => store.filters.locationQuery)
  const searchQuery = useHouseStore(store => store.filters.searchQuery)
 
  

  return (
    <div className="w-[1290px] h-[92px] mt-[20px] bg-white rounded-full flex  items-center flex-col relative">
      <div className="flex  items-center mb-5 px-[40px] py-[20px]">
      <div className="flex flex-col border-r-2 px-3 mr-4">
        <p className="text-gray-700 text-sm">Type</p>
        <HouseTypeDropdown />
      </div>
      <div className="flex flex-col border-r-2 px-3 mr-6">
        <p className="text-gray-700 text-sm">Location</p>
      <Input value={locationQuery} onChange={(e) => updateFilters({locationQuery: e.target.value})} placeholder="Search Location" />
      </div>
      <div className="flex flex-col mr-6">
        <p className="text-gray-700 text-sm">Keyword</p>
        <Input value={searchQuery} onChange={(e) => {
          updateFilters({searchQuery: e.target.value})
  
          }} 
          placeholder="Search Keyword" />
      </div>
      <div className="flex gap-3">
        <Button onClick={() => setIsAdvancedSearchOpen(!isAdvancedSearchOpen)} rightIcon={<SettingsIcon viewBox="0 0 64 64"/>} transparent  text="Search Advanced" />
        <Button rightIcon={<SearchIcon strokeColor="white" viewBox="0 0 26 26" />} text="Search" />
      </div>

      </div>
      {isAdvancedSearchOpen && <AdvancedSearch isOpen={isAdvancedSearchOpen} />}
    </div>
  )
}

export default SearchInput