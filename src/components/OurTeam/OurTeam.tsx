import { EmployeeCard } from "./components"
import { OUR_TEAM } from "./const"

export const OurTeam = () => {
  return (
    <div className="flex flex-col justify-center items-center pt-24 mb-9">
         <p className="text-blue-600 text-[20px]">Our Teams</p>
         <h1 className="text-[36px] mb-9 font-bold text-gray-800">Meet Our Agents</h1>
         <div className="flex gap-8">
            {OUR_TEAM.map(({ employee, position, imageUrl,socials}) => {
                return <EmployeeCard 
                    employeeName={employee} 
                    image={imageUrl} 
                    position={position}
                    socials={socials}
                    />
            })}
         </div>
    </div>
  )
}

