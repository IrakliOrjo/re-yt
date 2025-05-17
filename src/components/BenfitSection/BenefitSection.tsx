import HouseInteriorImage from '../../assets/images/house-interior.jpg';
import { ImageReveal } from '../ImageReveal';
import { BenefitBox } from './components/BenefitBox';
import { BENEFIT_BOXES } from './const';
import { motion } from 'framer-motion'

export const BenefitSection = () => {
  return (
    <div className="min-h-screen flex flex-col xl:flex-row px-2">
      <div className='xl:w-1/2 flex-shrink-0'>
        <ImageReveal 
          className='w-full h-full xl:rounded-l-2xl xl:rounded-tr-none rounded-t-2xl' 
          src={HouseInteriorImage} 
          alt='House interior' 
          delay={0.2}
          />
          </div>
        <motion.div 
            className='xl:w-1/2 xl:pl-[80px] px-4 xl:pt-[100px] py-14 bg-slate-100 xl:rounded-r-2xl'>
            <motion.p 
              className="text-blue-600 xl:text-[20px] text-[14px] font-[500] uppercase"
              initial={{opacity:0, y:20}}
              whileInView={{opacity:1, y:0}}
              viewport={{once:true}}
              transition={{duration: 0.5, delay:0.5}}
              >Our Benifit</motion.p>
            <motion.h1 
            className="xl:text-[34px] text-[1.6rem] mb-9 font-bold xl:mb-7 animate-fade-up"
            initial={{opacity:0, y:20}}
            whileInView={{opacity:1, y:0}}
            viewport={{once:true}}
            transition={{duration: 0.5, delay: 0.7}}
            >Why Choose Us?</motion.h1>
            <motion.p 
            className="max-w-[500px]  text-gray-500 mb-6"
            initial={{opacity:0, y:20}}
            whileInView={{opacity:1, y:0}}
            viewport={{once: true}}
            transition={{duration: 0.5, delay:0.9}}
            >Our seasoned team excels in real estate with years of successful market
            navigation, offering informed decisions and optimal results.</motion.p>
            <div className='flex flex-col gap-5 xl:items-start'>
                {BENEFIT_BOXES.map(({icon, title, description}, index) => {
                    return (
                    <motion.div
                      key={index}
                      initial={{opacity:0, x:-30}}
                      whileInView={{opacity:1, x:0}}
                      viewport={{once:true}}
                      transition={{
                        duration: 0.7,
                        delay: 1.1 + (index * 0.2),
                        ease: [0.2, 0.65, 0.3, 0.9]
                      }}
                      >
                      <BenefitBox img={icon} title={title} description={description} />
                    </motion.div>)
                })}
            </div>
        </motion.div>
    </div>
  )
}

 