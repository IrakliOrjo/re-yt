import { HouseCard } from "./components/HouseCard/HouseCard"
import useHouseStore from "../../store/houseStore"
 

export const FeaturedProperties = () => {

  const filteredHouses = useHouseStore(state => state.filteredHouses)

 

  return (
    <div className="flex flex-col justify-center items-center py-20 px-5">
        <p className="text-blue-600 xl:text-[20px] text-[14px] font-[500] uppercase">Featured Properties</p>
        <h1 className="xl:text-[34px] text-[1.6rem] mb-9 font-bold">Recommended For You</h1>
        <div className="xl:grid xl:grid-cols-3 flex flex-col gap-6 w-full">
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

