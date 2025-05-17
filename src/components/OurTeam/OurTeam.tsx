import { CompanyCarousel } from "../CompanyCarousel"
import { EmployeeCard } from "./components"
import { OUR_TEAM } from "./const"
import { motion } from 'framer-motion'

export const OurTeam = () => {
  return (
    <div className="flex flex-col justify-center items-center pt-24 mb-20 px-5">
         <motion.p 
            className="text-blue-600 xl:text-[20px] text-[14px] font-[500] uppercase"
            initial={{opacity:0, y:20}}
            whileInView={{opacity:1, y:0}}
            viewport={{once:true}}
            transition={{duration:0.5, delay:0.2}}
         >Our Teams</motion.p>
         <motion.h1 
            initial={{opacity:0, y:20}}
            whileInView={{opacity:1, y:0}}
            viewport={{once:true}}
            transition={{duration:0.5, delay:0.4}}
            className="xl:text-[34px] text-[1.6rem] mb-9 font-bold xl:mb9"
            >Meet Our Agents</motion.h1 >
         <div className="flex flex-col w-full lg:flex-row gap-8 mini-md:grid grid-cols-2
         lg:flex">
            {OUR_TEAM.map(({ employee, position, imageUrl,socials},index) => {
                return (
                <motion.div
                key={employee}
                initial={{opacity:0, y:50}}
                whileInView={{opacity:1, y:0}}
                viewport={{once:true}}
                transition={{
                  duration: 0.7,
                  delay: 0.6 + (index * 0.2),
                  ease: [0.2, 0.65,0.3,0.9]
                }}
                  >
                <EmployeeCard 
                    employeeName={employee} 
                    image={imageUrl} 
                    position={position}
                    socials={socials}
                    />
                    </motion.div>
                    )
            })}
         </div>
         <CompanyCarousel />
    </div>
  )
}

