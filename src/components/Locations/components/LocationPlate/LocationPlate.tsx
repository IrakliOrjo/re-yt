import { FC } from "react";
import { ArrowRightIcon } from "../../../../assets/icons/ArrowRightIcon";

interface ILocationPlateProps {
    image: string;
    location: string;
    index: number;
}

export const LocationPlate:FC <ILocationPlateProps> = ({image,location, index}) => {
    return (
        <div className={`${image} min-h-[500px]  md:min-h-[370px] xl:min-h-[300px] max-w-[420px] md:min-w-11 h-full w-full  bg-cover bg-center 
        p-2 rounded-xl flex flex-col justify-end cursor-pointer group animate-slideInRight
       `}
        style={{
          animationDelay: `${index * 100}ms`,
          animationFillMode: 'both'
        }}
        >
          <div className="bg-white rounded-xl p-4 flex justify-between items-center">
            <div>
            <p className="text-[12px]">100 Property</p>
            <p className="font-[400] ">{location}</p>
            </div>
            <div className="border rounded-full p-3  group-hover:bg-blue-600 transition-colors duration-150 ease-in">
              <ArrowRightIcon strokeColor="black" fill="black" className="group-hover:stroke-white group-hover:fill-white transition-colors duration-150 ease-in" />
            </div>
          </div>
        </div>
    )
}
