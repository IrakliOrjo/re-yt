import { HouseCard } from "./components/HouseCard/HouseCard"
import useHouseStore from "../../store/houseStore"
import { useEffect } from "react";
import { Skeleton } from "antd";
 

export const FeaturedProperties = () => {

  const filteredHouses = useHouseStore(state => state.filteredHouses);
  const fetchHouses = useHouseStore(state => state.fetchHouses);
  const loading = useHouseStore(state => state.loading);
  const filters = useHouseStore(state => state.filters);



  
  useEffect(() => {
    fetchHouses();
  }, [fetchHouses]); 
  
  console.log('fetchedHouses', filteredHouses)
  return (
    <div className="flex flex-col justify-center items-center py-20 px-5">
        <p className="text-blue-600 xl:text-[20px] text-[14px] font-[500] uppercase">Featured Properties</p>
        <h1 className="xl:text-[34px] text-[1.6rem] mb-9 font-bold animate-fade-up">Recommended { filters.status === 'Sale' ? 'Properties For Sale' : 'Properties For Rent'}

        </h1>
        {loading ? (
          <div className="flex flex-col md:grid md:grid-cols-2 gap-6 w-full
          xl:grid xl:grid-cols-3">
              {[...Array(6)].map((_,index) => (
                <div 
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-md">
                  <Skeleton.Image
                    active
                    style={{
                      width: '100%',
                      height: '220px',
                      borderRadius: '8px 8px 0 0 '
                    }}
                    />
                    <div className="p-4">
                      <div className="flex justify-between mb-2">
                        <Skeleton.Button active size="small" style={{width: 60}} />
                        <Skeleton.Button active size="small" style={{width: 100}} />
                      </div>

                      {/* Title Skeleton */}
                      <Skeleton active paragraph={{rows:1}} title={{width:'80%'}} />

                      {/* Price Skeleton */}
                      <Skeleton.Button active size="default" style={{ width: 120, marginBottom:16, marginTop: 8}} />

                      {/* Features Skeleton */}
                      <div className="flex justify-between mt-2">
                        <Skeleton.Button active size="small" style={{width: 60}} />
                        <Skeleton.Button active size="small" style={{width: 60}} />
                        <Skeleton.Button active size="small" style={{width: 60}} />
                      </div>


                    </div>

                </div>
              ))}
          </div>
        ) : <div className="xl:grid xl:grid-cols-3 flex flex-col md:grid md:grid-cols-2 gap-6 w-full">
        {filteredHouses.map((house) => {
            return (
                <HouseCard
                    id={house.id ?? ''}
                    key={house.id}
                    image={house.main_image ?? ""}
                    status={house.status}
                    city={house.address}
                    district={house.address}
                    street={house.address}
                    title={house.title}
                    price={house.price}
                    bedrooms={house.bedrooms}
                    bathrooms={house.bathrooms}
                    area={Number(house.surface)}
                    />

            )
        })}

    </div>}
        
        
    </div>
  )
}

