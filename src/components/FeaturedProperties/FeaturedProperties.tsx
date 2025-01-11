import { HouseCard } from "./components/HouseCard/HouseCard"
import useHouseStore from "../../store/houseStore"
 

export const FeaturedProperties = () => {

  const filteredHouses = useHouseStore(state => state.filteredHouses)

 

  return (
    <div className="flex flex-col justify-center items-center py-20">
        <p className="text-blue-600 text-[20px]">Featured Properties</p>
        <h1 className="text-[34px] mb-9 font-bold">Recommended For You</h1>
        <div className="grid grid-cols-3 gap-6">
            {filteredHouses.map((house) => {
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

