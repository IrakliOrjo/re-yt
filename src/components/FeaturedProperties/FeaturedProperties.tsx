import { HouseCard } from "./components/HouseCard/HouseCard"
import { houses } from "../../const/houses"

export const FeaturedProperties = () => {
  return (
    <div className="flex flex-col justify-center items-center py-11">
        <p className="text-blue-600 text-[20px]">Featured Properties</p>
        <h1 className="text-[40px]">Recommended For You</h1>
        <div className="grid grid-cols-2">
            {houses.map((house) => {
                return (
                    <HouseCard
                        key={house.id}
                        image={house.image[0]}
                        status={house.status}
                        city={house.city}
                        district={house.district}
                        street={house.street}
                        title={house.title}
                        price={house.price}
                        bedrooms={house.bedrooms}
                        bathrooms={house.bathrooms}
                        area={house.area}
                        agentId={house.agentId}
                        />

                )
            })}

        </div>
    </div>
  )
}

