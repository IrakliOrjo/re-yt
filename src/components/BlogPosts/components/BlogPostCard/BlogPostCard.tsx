import { FC } from "react";

interface IBlogPostCardProps {
    image: string;
    title: string;
    description: string;
    date: string;
}

export const BlogPostCard:FC <IBlogPostCardProps> = ({ image, title, description, date}) => {
  return (
     <div className="flex flex-col gap-8 rounded-xl  border-gray-300 cursor-pointer">
            <div className="relative rounded-xl group overflow-hidden">
            <img className="w-full h-[268px] rounded-xl transition-transform duration-300 group-hover:scale-110" src={image} alt={title} />
            <div className="absolute inset-0 bg-gradient-to-t rounded-t-xl  from-black/50 to-transparent pointer-events-none"></div>
            <div className="absolute top-4 left-4  bg-blue-600 rounded-full px-3 py-1">
              <span className="text-[14px] font-[600] text-white">{date}</span>
              </div>
         
            </div>
            <div className=" flex flex-col ">
            
              
              <p className="font-[500] max-w-[410px] -tracking-wide text-[24px] mb-2">{title}</p>
              <p className="max-w-[410px] text-gray-600 text-[16px] mb-2">{description}</p>
       
       
            </div>
        </div>
  )
}

 