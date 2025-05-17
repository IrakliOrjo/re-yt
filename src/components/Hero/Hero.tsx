import { useScrollPosition } from "../../hooks";
import useHouseStore from "../../store/houseStore";
import { Button } from "../Button"
import { SearchInput } from "../SearchInput"


const Hero = () => {

  const pos = useScrollPosition(0.5);  
  const { updateFilters, filters } = useHouseStore()

  const handleStatusChange = (status: 'Sale' | 'Rent') => {
    console.log('status', status)
    updateFilters({status})
  }

  return (
    <div 
    style={{backgroundPositionY: pos}}
    className="min-h-screen bg-hero-bg bg-cover bg-center bg-blend-darken bg-black/25 flex flex-col 
    justify-center items-center px-3">
        <h1 
          className="md:text-[3rem] font-bold lg:text-[4rem] text-white text-center text-[2.5rem] px-20"
          >Find your <span className="animate-fade-right">Perfect home!</span></h1>

            <p className="text-white xl:text-lg max-w-[28rem] lg:max-w-[44rem] text-center animate-fade-up"
              >We are a real estate agency that will help you find the best residence you dream of, 
                let’s discuss for your dream house? 
            </p>

          <div className="flex gap-9 lg:mt-[6rem] mt-9">
          <Button 
            variant="outlined" 
            text="For Sale" 
            isActive={filters.status === 'Sale'}
            transparent
            onClick={() => handleStatusChange('Sale')}
            />
          <Button 
          isActive={filters.status === 'Rent'}
          variant="outlined" 
          text="For Rent"
          onClick={() => handleStatusChange('Rent')}
          />
          </div>
          <SearchInput />
    </div>
  )
}

export default Hero