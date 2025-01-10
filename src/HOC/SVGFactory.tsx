import { FC, memo, ReactNode } from "react"
import { IBasicSvgIconProps, ISvgIconProps, SvgIcon } from "./components/SvgIcon"

interface ISVGFactory extends ISvgIconProps {}

export const SVGFactory = (path: ReactNode): FC<ISVGFactory> => {
  const Component: FC<IBasicSvgIconProps> = ({ viewBox, strokeColor, width, height, className, onClick, fill }) => (
    <SvgIcon
      viewBox={viewBox}
      strokeColor={strokeColor}
      width={width}
      height={height}
      className={className}
      onClick={onClick}
      fill={fill}
    >
      {path}
    </SvgIcon>
  )

  return memo(Component)
}

