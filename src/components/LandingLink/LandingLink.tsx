import { FC } from "react";

interface LandingLinkProps {
  children?: React.ReactNode;
  to: string;
  isActive?: boolean;
  onClick?: () => void;
  endIcon?: React.ReactNode;
}

export const LandingLink:FC<LandingLinkProps> = ({
  children,
  to,
  isActive,
  onClick,
  endIcon
}) => {
  return (
    <a className="font-[500] relative inline-flex group" 
      onClick={onClick} href={to}>
      {children}{endIcon}
      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
    </a>
  )
}

 