import { FC } from "react";

interface InputProps {
    placeholder?: string;
    value: string | undefined
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

}

export const Input:FC <InputProps> = ({placeholder,onChange,value}) => {
  return (
        <input 
            className="inline-flex justify-between gap-x-1.5 xl:rounded-md border
              rounded-full w-full px-4 py-2 text-md xl:font-semibold 
            text-gray-900 shadow-sm placeholder-gray-900
            hover:bg-gray-50 outline-none"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
  )
}
 