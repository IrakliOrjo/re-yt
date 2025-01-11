import { FC } from "react";
import { LocationIcon } from "../../../../assets/icons/LocationIcon";
import { BedIcon } from "../../../../assets/icons/BedIcon";
import { BathIcon } from "../../../../assets/icons/BathIcon";
import { AreaIcon } from "../../../../assets/icons/AreaIcon";
import { formatNumber } from "../../../../helpers/formatNumber";

interface HouseCardProps {
    image: string;
    status: string;
    city: string;
    district: string;
    street: string;
    title: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    area:number;
    agentId: string;
}

export const HouseCard:FC <HouseCardProps> = ({
    image,
    status,
    city,
    district,
    street,
    title,
    price,
    bedrooms,
    bathrooms,
    area,
    agentId,}) => {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-300">
        <div className="relative rounded-t-xl group overflow-hidden">
        <img className="w-[408px] h-[268px] rounded-t-xl transition-transform duration-300 group-hover:scale-110" src={image} alt={title} />
        <div className="absolute inset-0 bg-gradient-to-t rounded-t-xl  from-black/50 to-transparent pointer-events-none"></div>
        <div className="absolute top-4 left-4 bg-gray-500 rounded-full px-2 ">
          <span className="text-[14px] text-white">{status}</span>
          </div>
        <span className="absolute bottom-4 left-4 text-white text-[.9rem] "
        ><LocationIcon viewBox="0 0 28 28" strokeColor="white" className="inline-block" /> {street}, {district}, {city}</span>
        </div>
        <div className="px-6 flex flex-col">
          <p className="font-[500] text-[20px] mb-2">{title}</p>
          <div className="flex gap-3 border-b-2 pb-5">
          <div>
            <span className="text-[16px] text-gray-700">
              <BedIcon viewBox="0 0 28 28" 
            className="inline" 
            strokeColor="black" 
            /> Beds: {bedrooms}</span>
          </div>
          <div>
            <span className="text-[16px] text-gray-700">
              <BathIcon viewBox="0 0 28 28" 
            className="inline" 
            strokeColor="black" 
            /> Baths: {bathrooms}</span>
          </div>
          <div>
            <span className="text-[16px] text-gray-700">
              <AreaIcon viewBox="0 0 32 32" 
            className="inline" 
            strokeColor="black" 
            /> Sqft: {area}</span>
          </div>
          </div>
        <div className="flex justify-between mt-5 pb-5">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-black h-[40px] w-[40px]"></div>
            <p className="text-[16px]">{agentId}</p>
          </div>
          <p className="font-[500]">${formatNumber(price)}</p>
        </div>
        </div>
    </div>
  )
}

