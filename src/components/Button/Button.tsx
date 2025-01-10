import { FC, ReactNode } from "react"


interface ButtonProps {
    text: string
    variant?: 'primary' | 'outlined'
    transparent?: boolean
    isActive?: boolean
    leftIcon?: ReactNode
    rightIcon?: ReactNode
    }

export const Button:FC<ButtonProps> = ({ text, transparent, variant='primary', isActive, leftIcon, rightIcon }) => {


  if(variant === 'outlined') {
    return (<button className={`text-white ${isActive ? 'bg-blue-600 border-blue-600' : 'border-white'} hover:bg-blue-600  
             hover:text-white py-[12px] px-[55px] flex gap-2 font-[500] border hover:border-transparent rounded-full`}
             >
                {leftIcon}
                {text}
                {rightIcon}
            </button>)
  }

  return (
    <button className={`${transparent ? 'bg-transparent text-black' : 'bg-blue-500 text-white'}  hover:bg-blue-700 font-[500]
             hover:text-white py-[12px] px-[20px] flex gap-2 border border-blue-500 hover:border-transparent rounded-full`}
             >
                {leftIcon}
                {text}
                {rightIcon}
            </button>
  )
}

export default Button