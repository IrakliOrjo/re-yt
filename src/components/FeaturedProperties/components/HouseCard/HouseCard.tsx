import { FC } from "react";
import { LocationIcon } from "../../../../assets/icons/LocationIcon";
import { BedIcon } from "../../../../assets/icons/BedIcon";
import { BathIcon } from "../../../../assets/icons/BathIcon";
import { AreaIcon } from "../../../../assets/icons/AreaIcon";
import { formatNumber } from "../../../../helpers/formatNumber";
import { Link } from "react-router";

interface HouseCardProps {
    id: string;
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
}

export const HouseCard:FC <HouseCardProps> = ({
    id,
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
    }) => {
  return (
    <Link to={`/property/${id}`} className="flex flex-col gap-4 rounded-xl border border-gray-300">
        <div className="relative rounded-t-xl group overflow-hidden">
          <div className="aspect-video overflow-hidden">

            <img className="  w-full min-h-[270px] rounded-t-xl transition-transform duration-300 group-hover:scale-110" src={image} alt={title} />
          </div>
        <div className="absolute inset-0 bg-gradient-to-t rounded-t-xl  from-black/50 to-transparent pointer-events-none"></div>
        <div className="absolute top-4 left-4 bg-gray-500 rounded-full px-2 ">
          <span className="text-[14px] text-white cursor-pointer">{status}</span>
          </div>
        <span className="absolute bottom-4 left-4 text-white text-[.9rem] "
        ><LocationIcon viewBox="0 0 28 28" strokeColor="white" className="inline-block" /> {street}, {district}, {city}</span>
        </div>
        <div className="px-6 flex flex-col">
          <p className="font-[500] xl:text-[20px] cursor-pointer hover:text-blue-500 mb-2">{title}</p>
          <div className="flex gap-3 border-b-2 pb-5 xl:text-[16px] text-[14px]">
          <div>
            <p className=" text-gray-700">
              <BedIcon viewBox="0 0 28 28" 
            className="inline" 
            strokeColor="black" 
            /> Beds:  <span className="font-semibold text-[black]">{bedrooms}</span></p>
          </div>
          <div>
            <p className="  text-gray-700">
              <BathIcon viewBox="0 0 28 28" 
            className="inline" 
            strokeColor="black" 
            /> Baths: <span className="font-semibold text-[black]">{bathrooms}</span></p>
          </div>
          <div>
            <p className=" text-gray-700">
              <AreaIcon viewBox="0 0 32 32" 
            className="inline" 
            strokeColor="black" 
            /> Sqft: <span className="font-semibold text-[black]">{area}</span></p>
          </div>
          </div>
        <div className="flex justify-between mt-5 pb-5">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-black h-[40px] w-[40px]"></div>
            <p className="xl:text-[16px] text-[14px]">Agent</p>
          </div>
          <p className="font-[500]">${formatNumber(price)}</p>
        </div>
        </div>
    </Link>
  )
}

