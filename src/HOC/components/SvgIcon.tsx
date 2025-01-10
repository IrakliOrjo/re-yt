import { FC, ReactNode } from 'react'


export interface IBasicSvgIconProps {
  className?: string
  width?: string
  height?: string
  strokeColor?: string 
  viewBox?: string
  fill?: string
  onClick?: () => void
}

export interface ISvgIconProps extends IBasicSvgIconProps {
  children?: ReactNode
}

export const SvgIcon: FC<ISvgIconProps> = ({
  children,
  viewBox = '0 0 24 24',
  strokeColor,
  width = '24',
  height = '24',
  fill = 'none',
  className,
  onClick
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
      role='img'
      width={width}
      height={height}
      stroke={strokeColor}
      viewBox={viewBox}
      fill={fill}
      className={className}
      onClick={onClick}
    >
      {children}
    </svg>
  )
}
