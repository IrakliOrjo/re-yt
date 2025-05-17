import { useState } from "react"
import { SearchIcon } from "../../assets/icons/SearchIcon"
import useHouseStore from "../../store/houseStore"
import { Button } from "../Button"
import { HouseTypeDropdown } from "./components/HouseTypeDropdown"
import { Input } from "./components/Input"
import { AdvancedSearch } from "./components/AdvancedSearch"
import { Settings } from "lucide-react"


export const SearchInput = () => {

  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false)


  const updateFilters = useHouseStore(store => store.updateFilters)
  const locationQuery = useHouseStore(store => store.filters.locationQuery)
  const searchQuery = useHouseStore(store => store.filters.searchQuery)
  const searchPropertiesAPI = useHouseStore(state => state.searchPropertiesAPI)
  const type = useHouseStore(store => store.filters.type)

  const handleSearch = () => {
    searchPropertiesAPI()
  }

 
  const handleTypeChange = (newType: 'house' | 'appartment' | 'all') => {
    updateFilters({type: newType})
  }

  return (
    <div className="lg:h-[92px] mt-[20px] bg-white lg:rounded-3xl 2xl:rounded-full py-4
    flex items-center flex-col relative rounded-2xl w-full max-w-[45rem] lg:max-w-[1280px]">
      <div className="flex flex-col lg:flex-row gap-6 items-center mb-5 xl:px-[40px] md:border-none
      w-full px-4">
      <div className="flex flex-col  xl:border-r-2 px-3 xl:mr-4 w-full gap-2">
        <p className="text-gray-400 text-sm font-[500]">Type</p>
        <HouseTypeDropdown
          selectedType={type}
          onChange={handleTypeChange}
          />
      </div>
      <div className="flex flex-col xl:border-r-2 px-3 xl:mr-6 w-full gap-2">
        <p className="text-gray-400 text-sm font-[500]">Location</p>
      <Input value={locationQuery} 
      onChange={(e) => updateFilters({locationQuery: e.target.value})} 
      placeholder="Search Location" />
      </div>
      <div className="flex flex-col xl:mr-6 gap-2 px-3 w-full ">
        <p className="text-gray-400 text-sm font-[500]">Keyword</p>
        <Input value={searchQuery} onChange={(e) => {
          updateFilters({searchQuery: e.target.value})
  
          }} 
          placeholder="Search Keyword" />
      </div>
      <div className="flex gap-3 items-center justify-center w-full lg:w-auto">
        <Button 
        onClick={() => setIsAdvancedSearchOpen(!isAdvancedSearchOpen)} 
        rightIcon={<Settings />} 
        transparent  
        text="Search Advanced" 
        className="min-w-[14rem]"
        />
        <Button rightIcon={<SearchIcon strokeColor="white" viewBox="0 0 26 26" />} text="Search" onClick={handleSearch} />
      </div>

      </div>
      {isAdvancedSearchOpen && <AdvancedSearch isOpen={isAdvancedSearchOpen} />}
    </div>
  )
}

export default SearchInput