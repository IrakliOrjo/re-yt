import { FC } from "react";

interface NavSubLinksProps {
    children?: React.ReactNode;
}


export const NavSubLinks:FC<NavSubLinksProps> = ({children}) => {
  return (
    <div
        className="absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300
        flex flex-col items-start gap-4 bg-white py-5 pl-3 pr-12 rounded-md shadow-lg top-[60px] min-w-[200px] "
        >{children}</div>
  )
}
