import { SearchIcon } from "../../assets/icons/SearchIcon"
import { SettingsIcon } from "../../assets/icons/SettingsIcons"
import useHouseStore from "../../store/houseStore"
import { Button } from "../Button"
import { HouseTypeDropdown } from "./components/HouseTypeDropdown"
import { Input } from "./components/Input"


export const SearchInput = () => {



  const locationQuery = useHouseStore(store => store.locationQuery)
  const titleQuery = useHouseStore(store => store.titleQuery)
  const setLocationSearchQuery = useHouseStore(store => store.setSearchLocation)
  const setTitleSearchQuery = useHouseStore(store => store.setSearchTitle);
  

  return (
    <div className="w-[1290px] h-[92px] px-[40px] py-[20px] mt-[20px] bg-white rounded-full flex  items-center">
      <div className="flex flex-col border-r-2 px-3 mr-4">
        <p className="text-gray-700 text-sm">Type</p>
        <HouseTypeDropdown />
      </div>
      <div className="flex flex-col border-r-2 px-3 mr-6">
        <p className="text-gray-700 text-sm">Location</p>
      <Input value={locationQuery} onChange={(e) => setLocationSearchQuery(e.target.value)} placeholder="Search Location" />
      </div>
      <div className="flex flex-col mr-6">
        <p className="text-gray-700 text-sm">Keyword</p>
        <Input value={titleQuery} onChange={(e) => {
          setTitleSearchQuery(e.target.value)
  
          }} 
          placeholder="Search Keyword" />
      </div>
      <div className="flex gap-3">
        <Button rightIcon={<SettingsIcon viewBox="0 0 64 64"/>} transparent  text="Search Advanced" />
        <Button rightIcon={<SearchIcon strokeColor="white" viewBox="0 0 26 26" />} text="Search" />
      </div>
    </div>
  )
}

export default SearchInput