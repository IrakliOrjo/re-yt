import { FC, ReactNode } from "react";

interface FeaturesComponentProps {
    amount: number;
    text: string
    icon: ReactNode;
}

export const FeaturesComponent:FC <FeaturesComponentProps> = ( { amount,text, icon } ) => {
  return (
    <div className="flex gap-1 items-center">
        {icon}
        <span className="text-sm text-gray-700">{text}</span>
        <span className="text-sm text-gray-700 font-bold ml-1">{amount}</span>
        
    </div>
  )
}

