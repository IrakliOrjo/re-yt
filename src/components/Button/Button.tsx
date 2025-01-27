import { FC, ReactNode } from "react"


interface ButtonProps {
    text: string
    variant?: 'primary' | 'outlined'
    transparent?: boolean
    onClick?: () => void
    isActive?: boolean
    leftIcon?: ReactNode
    rightIcon?: ReactNode
    className?: string
    }

export const Button:FC<ButtonProps> = ({ text, transparent, variant='primary', isActive, leftIcon, rightIcon, onClick, className }) => {


  if(variant === 'outlined') {
    return (<button 
              className={`text-white ${isActive ? 'bg-blue-700 border-blue-700' : 'border-white'} hover:bg-blue-600  
              hover:text-white min-w-[10rem] items-center justify-center py-[12px] md:px-[45px] px-[35px] lg:px-[55px] flex gap-2 font-[500] 
              border hover:border-transparent rounded-full ${className}`}
              onClick={onClick}
             >
                {leftIcon}
                {text}
                {rightIcon}
            </button>)
  }

  return (
    <button className={`${transparent ? 'bg-transparent text-black' : 'bg-blue-700 text-white'}  hover:bg-blue-600 font-[500]
             hover:text-white py-[12px] items-center min-w-[8rem] max-h-[3rem] px-[20px] flex gap-2 border border-blue-700 hover:border-transparent rounded-full ${className}`}
              onClick={onClick}
             >
                {leftIcon}
                {text}
                {rightIcon}
            </button>
  )
}

export default Button