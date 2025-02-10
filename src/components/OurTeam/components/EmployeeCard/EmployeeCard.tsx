import { FC } from "react"
import { FacebookIcon } from "../../../../assets/icons/FacebookIcon";
import { XIcon } from "../../../../assets/icons/XIcon";
import { LinkedinIcon } from "../../../../assets/icons/LinkedinIcon";
import { InstagramIcon } from "../../../../assets/icons/InstagramIcon";
import { PhoneIcon } from "../../../../assets/icons/PhoneIcon";
import { EmailIcon } from "../../../../assets/icons/EmailIcon";

interface IEmployeeCardProps {
    image: string;
    employeeName: string;
    position: string;
    socials: {
        facebook?: string;
        x?: string;
        linkedin?: string;
        instagram?: string;
    }
}


export const EmployeeCard:FC<IEmployeeCardProps> = ({image,employeeName,position,socials}) => {
  return (
    <div className="flex flex-col  group cursor-pointer w-full gap-8">
        <div className="overflow-hidden rounded-2xl relative">
            <img className="rounded-2xl w-full  group-hover:scale-105 aspect-square transition-transform duration-700 ease-in" 
            src={image} alt={employeeName} />
            <div className="absolute lg:max-w-[200px]  inset-x-0 mx-auto bottom-4 flex 
            justify-between items-center max-w-[350px]
            rounded-xl bg-black/20  backdrop-blur-md h-[42px] xl:px-3 opacity-0 
            group-hover:opacity-100 transition-all duration-500 ease-in-out 
            translate-y-full group-hover:translate-y-0">
              <a 
                href={socials.facebook}
                className="border-r-[1px] w-[90px]   flex justify-center items-center border-[white]/50"
              ><FacebookIcon className="h-5 hover:stroke-blue-700 hover:fill-blue-700" strokeColor="white"  fill="white" /></a>
              <a 
                href={socials.facebook}
                className="border-r-[1px] w-[90px]   flex justify-center items-center border-[white]/50"
                ><XIcon className="h-5 hover:stroke-blue-700 hover:fill-blue-700"  strokeColor="white" fill="white" /></a>
              <a 
                href={socials.facebook}
                className="border-r-[1px] w-[90px]   flex justify-center items-center border-[white]/50"
                ><LinkedinIcon className="h-5 hover:stroke-blue-700 hover:fill-blue-700" strokeColor="white" fill="white" /></a>
              <a 
                className="w-[90px]   flex justify-center items-center border-[white]/50"
                href={socials.facebook}>
                <InstagramIcon className="h-5 hover:stroke-blue-700 hover:fill-blue-700" strokeColor="white" fill="white" /></a>
            </div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-[500] text-[24px]">{employeeName}</p>
            <p className="text-[16px] text-gray-500">{position}</p>
          </div>
          <div className="flex gap-2">
            <div className="rounded-full flex items-center justify-center p-2 border-[1px] border-gray-500 group-hover:bg-blue-700 group-hover:border-blue-700">
              <PhoneIcon viewBox="-35 -10 200 150" className="group-hover:stroke-white group-hover:fill-white" strokeColor="gray" fill="black" />
            </div>
            <div className="rounded-full flex items-center justify-center p-2 border-[1px] border-gray-500 group-hover:bg-blue-700 group-hover:border-blue-700">
              <EmailIcon className="group-hover:stroke-white group-hover:fill-white" viewBox="-30 -20 190.88 122.607"  fill="gray" />
            </div>
          </div>
        </div>
    </div>
  )
}

 