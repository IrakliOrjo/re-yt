import { FC } from "react";

interface InputProps {
    placeholder?: string;
}

export const Input:FC <InputProps> = ({placeholder}) => {
  return (
        <input 
            className="inline-flex justify-between gap-x-1.5 rounded-md w-[247px]
            bg-white  py-2 text-md font-semibold text-gray-900 shadow-sm placeholder-gray-900
            hover:bg-gray-50 outline-none"
            placeholder={placeholder}
        />
  )
}
 