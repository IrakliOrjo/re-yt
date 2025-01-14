import { FC } from "react";

interface ILocationPlateProps {
    image: string;
    location: string;
}

export const LocationPlate:FC <ILocationPlateProps> = ({image,location}) => {
    return (
        <div className={`${image} min-h-[200px] min-w-[200px]  bg-cover bg-center p-2 rounded-xl flex flex-col justify-end`}>
          <div className="bg-white rounded-lg">
            <p>{location}</p>
          </div>
        </div>
    )
}
