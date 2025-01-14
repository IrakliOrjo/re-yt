
import { usePagination } from "../../hooks"
import { LocationPlate } from "./components"
import { CITYS } from "./components/LocationPlate/consts"
import { PaginationBullets } from "./components/PaginationBullets"

export const Locations = () => {

    const {
        paginatedData, 
        currentPage, 
        totalPages,
        nextPage,
        prevPage,
        goToPage
    } = usePagination(CITYS)

    console.log('paginatedData', paginatedData)

  return (
    <div className="flex flex-col justify-center items-center py-20">
        <p className="text-blue-600 text-[20px]">Featured Properties</p>
        <h1 className="text-[34px] mb-9 font-bold">Recommended For You</h1>
        <div className="flex w-full border px-2">
            <div className="flex justify-between w-full">
                {paginatedData.map(({img,title}) => {
                    return (<LocationPlate key={title} image={img} location={title} />)
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

 