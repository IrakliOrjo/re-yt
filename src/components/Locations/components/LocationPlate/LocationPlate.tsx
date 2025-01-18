import { FC } from "react";
import { ArrowRightIcon } from "../../../../assets/icons/ArrowRightIcon";

interface ILocationPlateProps {
    image: string;
    location: string;
    index: number;
    direction: 'next' | 'prev';
}

export const LocationPlate:FC <ILocationPlateProps> = ({image,location, index,direction}) => {
    return (
        <div className={`${image} max-h-[373px] max-w-[300px] h-full w-full  bg-cover bg-center 
        p-2 rounded-xl flex flex-col justify-end cursor-pointer group animate-slideInRight
        ${direction} === 'next' ? 'animate-slideInRight' : 'animate-slideOutLeft'`}
        style={{
          animationDelay: `${index * 100}ms`,
          animationFillMode: 'both'
        }}
        >
          <div className="bg-white rounded-xl p-4 flex justify-between items-center">
            <div>
            <p>100 Property</p>
            <p className="font-[500]">{location}</p>
            </div>
            <div className="border rounded-full p-3  group-hover:bg-blue-600 transition-colors duration-150 ease-in">
              <ArrowRightIcon strokeColor="black" fill="black" className="group-hover:stroke-white group-hover:fill-white transition-colors duration-150 ease-in" />
            </div>
          </div>
        </div>
    )
}
