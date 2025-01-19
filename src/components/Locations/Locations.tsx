
import { usePagination } from "../../hooks"
import { LocationPlate } from "./components"
import { CITYS } from "./components/LocationPlate/consts"
import { PaginationBullets } from "./components/PaginationBullets"

export const Locations = () => {

    const {
        paginatedData, 
        currentPage, 
        totalPages,
        goToPage,
        direction
    } = usePagination(CITYS)

    console.log('paginatedData', paginatedData)

  return (
    <div className="flex flex-col justify-center items-center py-20">
        <p className="text-blue-600 text-[20px]">Explore Cities</p>
        <h1 className="text-[34px] mb-9 font-bold">Our Location For You</h1>
        <div className="flex w-full  px-2 overflow-hidden">
            <div 
            className="flex justify-between gap-2 w-full min-h-[370px] "
             
            >
                {paginatedData.map(({img,title},index) => {
                    return (<LocationPlate key={title} image={img} location={title} index={index} direction={direction} />)
                })}
            </div>
        <div>
             
        </div>
        </div>
        <div className="mt-11">

            <PaginationBullets currentPage={currentPage} onBulletClick={(index) => goToPage(index + 1)} totalPages={totalPages} />

        </div>
    </div>
  )
}

 