import { FacebookIcon } from "../../../../assets/icons/FacebookIcon"
import { InstagramIcon } from "../../../../assets/icons/InstagramIcon"
import { LinkedinIcon } from "../../../../assets/icons/LinkedinIcon"
import { PinteresIcon } from "../../../../assets/icons/PinterestIcon"
import { XIcon } from "../../../../assets/icons/XIcon"
import { YoutubeIcon } from "../../../../assets/icons/YoutubeIcon"

  
export const FooterIcons = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-4 items-start xl:items-center">
      <p className="font-[500] text-[16px] text-white">Follow Us:</p>
      <div className="flex gap-4">
      <div className="h-10 w-10 bg-slate-700 rounded-full flex justify-center items-center cursor-pointer hover:bg-blue-600
      transition duration-300 ease-in-out">
        <YoutubeIcon fill="white" />
      </div>
      <div className="h-10 w-10 bg-slate-700 rounded-full flex justify-center items-center cursor-pointer hover:bg-blue-600
      transition duration-300 ease-in-out">
        <FacebookIcon fill="white" />
      </div>
      <div className="h-10 w-10 bg-slate-700 rounded-full flex justify-center items-center cursor-pointer hover:bg-blue-600
      transition duration-300 ease-in-out">
        <LinkedinIcon fill="white" />
      </div>
      <div className="h-10 w-10 bg-slate-700 rounded-full flex justify-center items-center cursor-pointer hover:bg-blue-600
      transition duration-300 ease-in-out">
        <XIcon fill="white" />
      </div>
      <div className="h-10 w-10 bg-slate-700 rounded-full flex justify-center items-center cursor-pointer hover:bg-blue-600
      transition duration-300 ease-in-out">
        <InstagramIcon fill="white" />
      </div>
      <div className="h-10 w-10 bg-slate-700 rounded-full flex justify-center items-center cursor-pointer hover:bg-blue-600
      transition duration-300 ease-in-out">
        <PinteresIcon fill="white" />
      </div>
        </div>
        
    </div>
  )
}

 