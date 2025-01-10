import { FC } from "react";

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
    <div className="flex flex-col">
        <div>
        <img className="w-[408px] h-[268px]" src={image} alt={title} />

        </div>

    </div>
  )
}

