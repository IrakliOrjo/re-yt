import { FC } from "react"


interface NavSubLinkProps {
    children?: React.ReactNode;
    to: string;
}


export const NavSubLink:FC<NavSubLinkProps> = ({children,to}) => {
  return (
    <a href={to}>{children}</a>
  )
}

 