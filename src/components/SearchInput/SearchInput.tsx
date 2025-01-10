import { SearchIcon } from "../../assets/icons/SearchIcon"
import { SettingsIcon } from "../../assets/icons/SettingsIcons"
import { Button } from "../Button"
import { HouseTypeDropdown } from "./components/HouseTypeDropdown"
import { Input } from "./components/Input"


export const SearchInput = () => {
  return (
    <div className="w-[1290px] h-[92px] px-[40px] py-[20px] mt-[20px] bg-white rounded-full flex  items-center">
      <div className="flex flex-col border-r-2 px-3 mr-4">
        <p className="text-gray-700 text-sm">Type</p>
        <HouseTypeDropdown />
      </div>
      <div className="flex flex-col border-r-2 px-3 mr-6">
        <p className="text-gray-700 text-sm">Location</p>
        <Input placeholder="Search Location" />
      </div>
      <div className="flex flex-col mr-6">
        <p className="text-gray-700 text-sm">Keyword</p>
        <Input placeholder="Search Keyword" />
      </div>
      <div className="flex gap-3">
        <Button rightIcon={<SettingsIcon viewBox="0 0 64 64"/>} transparent  text="Search Advanced" />
        <Button rightIcon={<SearchIcon strokeColor="white" viewBox="0 0 26 26" />} text="Search" />
      </div>
    </div>
  )
}

export default SearchInput