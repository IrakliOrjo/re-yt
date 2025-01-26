import { FC } from "react";

interface IBenefitBoxProps {
  img: string;
  title: string;
  description: string;
}

export const BenefitBox:FC <IBenefitBoxProps> = ( { img, title, description} ) => {
  return (
    <div className="flex items-center gap-9 bg-white rounded-2xl p-8 cursor-pointer group hover:scale-105 hover:shadow-lg transition-transform duration-300">
      <img className="group-hover:animate-rotate-y" src={img} width={60} height={60} alt={title} />
      <div className="flex flex-col">
        <p className="xl:text-[24px] text-[20px] text-gray-800 font-[500]">{title}</p>
        <p className="text-[14px] text-gray-500 max-w-[386px]">{description}</p>
      </div>
    </div>
  )
}
