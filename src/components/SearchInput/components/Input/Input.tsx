import { FC } from "react";

interface InputProps {
    placeholder?: string;
    value: string | undefined
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

}

export const Input:FC <InputProps> = ({placeholder,onChange,value}) => {
  return (
        <input 
            className="inline-flex justify-between gap-x-1.5 rounded-3xl border-[1px]
              xl:rounded-none w-full px-4 md:px-3 xl:px-0  text-md 
            text-gray-900 shadow-sm lg:shadow-none placeholder-gray-900 md:border-none
              outline-none"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
  )
}
 