import { DocumentsIcon } from "../../assets/icons/DocumentsIcon"
import { LoginIcon } from "../../assets/icons/LoginIcon"
import { Button } from "../Button"
import { Navbar } from "./components/Navbar"


export const Header = () => {
  return (
    <div className="flex absolute top-0 bg-white h-[76px] justify-evenly items-center gap-12 px-[100px] border w-full">
        <h1 className="font-bold">Company Logo</h1>
        <div>
            <Navbar />
        </div>
        <div className="flex gap-[16px]">
            <Button leftIcon={<LoginIcon />} text="Sign In" transparent />
            <Button rightIcon={<DocumentsIcon />} text="Submit Property" />
        </div>
    </div>
  )
}

export default Header