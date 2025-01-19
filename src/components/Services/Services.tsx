import { ServicePlate } from "./component"
import { OUR_SERVICES } from "./const"


export const Services = () => {
  return (
    <div className="flex flex-col justify-center items-center py-20">
         <p className="text-blue-600 text-[20px]">Our Services</p>
         <h1 className="text-[34px] mb-9 font-bold">What We Do?</h1>
         <div className="flex gap-5">
            {OUR_SERVICES.map(({img,title,description}, index) => {
                return ( <ServicePlate key={index} img={img} title={title} description={description} />)
            })}
            
         </div>
    </div>
  )
}

 