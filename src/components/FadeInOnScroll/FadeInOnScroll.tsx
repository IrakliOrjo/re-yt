import { motion } from 'framer-motion'
import { FC, ReactNode } from 'react'

interface FadeInOnScrollProps {
    children: ReactNode
    delay?: number
    className?: string
    duration?: number
    yOffset?: number
}

export const FadeInOnScroll:FC <FadeInOnScrollProps> = ({
  children, 
  delay = 0.2, 
  className = '',
  duration = 1.5,
  yOffset = 30
}) => {
  return (
    <motion.div
        className={`w-full ${className}`}
        initial={{opacity: 0, y: yOffset}}
        whileInView={{opacity:1, y:0}}
        viewport={{once:true, margin: '-50px'}}
        transition={{
            opacity: {duration, delay, ease: [0.1, 0.4, 0.6, 1]},
            y: {duration: duration * 0.8, delay, ease: [0.2, 0.5,0.7,1]}
        }}
        >
        {children}
    </motion.div>
  )
}

 