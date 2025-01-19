import { FC } from "react";
import { Button } from "../../../Button";
import { ArrowRightIcon } from "../../../../assets/icons/ArrowRightIcon";


interface IServicePlateProps {
    img: string;
    title: string;
    description: string
}

export const ServicePlate:FC <IServicePlateProps> = ({img,title,description}) => {
  return (
    <div className="border flex flex-col py-12 px-8 justify-center items-center text-center gap-[30px] rounded-2xl group hover:shadow-2xl 
    transition-all duration-300 ease-in-out hover:scale-105">
        <img src={img} alt={title} className="transform transition-all duration-500 ease-in-out group-hover:animate-rotate-y" />
        <p className="font-[500] text-[24px]">{title}</p>
        <p className="max-w-[350px] text-[14px] text-gray-500">{description}</p>
        <Button 
            onClick={() => (console.log())} 
            rightIcon={<ArrowRightIcon strokeColor="black" fill="black" className="group-hover:stroke-white group-hover:fill-white"/>} 
            transparent  
            text="Search Advanced" 
            className="group-hover:px-[35px] group-hover:bg-blue-700 group-hover:text-white transition-all duration-300 ease-in-out"
            />
    </div>
  )
}

