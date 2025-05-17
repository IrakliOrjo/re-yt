import { FC, useState } from "react";
import { motion } from 'framer-motion'



interface ImageRevealProps {
    src: string;
    alt:string;
    className?: string
    delay?: number
}

export const ImageReveal:FC<ImageRevealProps> = ({
    src,
    alt,
    className = '',
    delay=0
}) => {
    const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className={`${className}`}>
        <div className="relative overflow-hidden w-full h-full">
        <motion.div
            className="absolute inset-0 bg-white z-10"
            initial={{x: '-100%'}}
            whileInView={{x: '0%'}}
            viewport={{once:true}}
            transition={{
                duration:1.2,
                delay,
                ease:[0.22, 1, 0.36, 1]
            }}
            >
                <motion.img 
                    src={src}
                    alt={alt}
                    className={`w-full h-full object-cover ${imageLoaded ? 'blur-0' : 'blur-md'}`}
                    initial={{opacity:0 }}
                    animate={{
                        opacity:1,
                        filter: [
                            'blur(10px)',
                            'blur(10px)',
                            'blur(0px)',
                        ]
                    }}
                    transition={{
                        opacity: {duration: 0.5, delay},
                        filter: {
                            times: [0, 0.7,1],
                            duration:2,
                            delay: delay + 0.8
                        }
                    }}
                    onLoad={() => setImageLoaded(true)}
                    />

        </motion.div>
        </div>
        
    </div>
  )
}

