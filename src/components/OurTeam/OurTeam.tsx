import { CompanyCarousel } from "../CompanyCarousel"
import { EmployeeCard } from "./components"
import { OUR_TEAM } from "./const"

export const OurTeam = () => {
  return (
    <div className="flex flex-col justify-center items-center pt-24 mb-20 px-5">
         <p className="text-blue-600 xl:text-[20px] text-[14px] font-[500] uppercase">Our Teams</p>
         <h1 className="xl:text-[34px] text-[1.6rem] mb-9 font-bold xl:mb9">Meet Our Agents</h1>
         <div className="flex flex-col w-full lg:flex-row gap-8 mini-md:grid grid-cols-2
         lg:flex">
            {OUR_TEAM.map(({ employee, position, imageUrl,socials}) => {
                return <EmployeeCard 
                    employeeName={employee} 
                    image={imageUrl} 
                    position={position}
                    socials={socials}
                    />
            })}
         </div>
         <CompanyCarousel />
    </div>
  )
}

