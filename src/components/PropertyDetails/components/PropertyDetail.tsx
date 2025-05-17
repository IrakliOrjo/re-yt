import { FC, ReactNode } from "react"

interface PropertyDetailProps {
    icon: ReactNode
    title: string
    text: string
}

export const PropertyDetail:FC<PropertyDetailProps> = ( { icon, title, text } ) => {
  return (
    <div className="flex gap-3">
        <div className="flex h-12 w-12 rounded-md hover:bg-blue-600 items-center
         transition-colors transform duration-300 justify-center hover:cursor-pointer
        border hover:text-white
        ">{icon}</div>
        <div className="flex flex-col">
            <span className="text text-gray-600 capitalize">{title}</span>
            <span className="font-semibold text-sm text-slate-900 capitalize">{text}</span>
        </div>
    </div>
  )
}

