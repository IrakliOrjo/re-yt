import { EmailIcon } from "../../../../assets/icons/EmailIcon"
import { LocationIcon } from "../../../../assets/icons/LocationIcon"
import { PhoneIcon } from "../../../../assets/icons/PhoneIcon"

 

export const AddressInfo = () => {
  return (
    <div className="flex flex-col xl:px-72 px-5 py-[50px] ">
        <div className="flex flex-col xl:flex-row w-full justify-between">
        <div className="flex flex-col gap-2">
            <p className="max-w-[300px] text-[14px] text-gray-400"
            >Specializes in providing high-class tours for those in need. Contact Us</p>
            <div className="flex items-center gap-2">
                <LocationIcon strokeColor="white" className="inline-block" />
                <p className="text-slate-100 text-[14px]"> 101 E 129th St, East Chicago, IN 46312, US</p>
            </div>
            <div className="flex items-center gap-2">
                <PhoneIcon viewBox="-35 -10 200 150" strokeColor="white" fill="white" className="inline-block" />
                <p className="text-slate-100 text-[14px]"> +111 123 123</p>
            </div>
            <div className="flex items-center gap-2">
                <EmailIcon viewBox="-30 -20 190.88 122.607" strokeColor="white" fill="white" className="inline-block" />
                <p className="text-slate-100 text-[14px]">luxuryestate@gmail.com</p>
            </div>
        </div>
        <div className="flex flex-col gap-2">
            <p className="font-[500] text-white ">Categories</p>
            <ul className="text-gray-400 flex flex-col gap-1 text-[14px]">
                <li>Pricing Plans</li>
                <li>Our Services</li>
                <li>About Us</li>
                <li>Contact Us</li>
            </ul>
        </div>
        <div className="flex flex-col gap-2">
            <p className="font-[500] text-white ">Our Company</p>
                <ul className="text-gray-400 flex flex-col gap-1 text-[14px]">
                    <li>Property For Sale</li>
                    <li>Property For Rent</li>
                    <li>Property For Buy</li>
                    <li>Our Agents</li>
                </ul>
        </div>
        <div className="flex flex-col gap-2">
            <p className="font-[500] text-white ">Newletter</p>
            <p className="text-gray-400 text-[14px] max-w-[280px]">Your Weekly/Monthly Dose of Knowledge and Inspiration</p>
            <input className="w-full bg-slate-800 placeholder:text-gray-400 text-white mt-3
             text-sm border border-slate-400 rounded-3xl px-5 py-3 transition duration-300 ease 
             focus:outline-none focus:border-slate-50 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Your Email Address..." />
        </div>
             </div>
        <div className="h-[1px] mt-11 w-full bg-gray-700"></div>
    </div>
  )
}

 