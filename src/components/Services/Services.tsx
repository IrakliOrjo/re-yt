import { FadeInOnScroll } from "../FadeInOnScroll"
import { ServicePlate } from "./component"
import { OUR_SERVICES } from "./const"


export const Services = () => {
  return (
    <div className="flex flex-col justify-center items-center py-20 px-2">
         <p className="text-blue-600 xl:text-[20px] text-[14px] font-[500] uppercase">Our Services</p>
          <FadeInOnScroll delay={0.5} className='flex flex-col items-center justify-center'>
            <h1 className="xl:text-[34px] text-[1.6rem] mb-9 font-bold animate-fade-up">What We Do?</h1>
         <div className="flex flex-col md:flex-row gap-5">
            {OUR_SERVICES.map(({img,title,description}, index) => {
              return ( <ServicePlate key={index} img={img} title={title} description={description} />)
            })}
            
         </div>
            </FadeInOnScroll>
    </div>
  )
}

 