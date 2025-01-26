import { AddressInfo } from "./components"
import { FooterIcons } from "./components"


export const Footer = () => {
  return (
    <div className="flex flex-col bg-slate-900">
        <div className="flex flex-col xl:flex-row justify-between py-[50px] xl:px-72
        px-5">
            <p className="text-white text-[24px] font-[500] tracking-widest"
            >Copmany LOGO</p>
            <FooterIcons />
        </div>
        <div className="h-[1px] bg-gray-700"></div>
       <AddressInfo />
       <div className="flex flex-col xl:flex-row gap-3 justify-between px-5 xl:px-72 mb-11">
            <p className="text-[14px] text-gray-400">©2025 OverlyDedicated All Rights Reserved.</p>
            <div>
                <ul className="flex text-[14px] text-gray-400 gap-5">
                    <li className="hover:text-blue-400 transition-colors duration-300 ease-in cursor-pointer"><a>Terms Of Services</a></li>
                    <li className="hover:text-blue-400 transition-colors duration-300 ease-in cursor-pointer"><a>Privacy Policy</a></li>
                    <li className="hover:text-blue-400 transition-colors duration-300 ease-in cursor-pointer"><a>Cookie Policy</a></li>
                </ul>
            </div>
        </div>
    </div>
  )
}

 