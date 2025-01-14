import { useScrollPosition } from "../../hooks";
import { Button } from "../Button"
import { SearchInput } from "../SearchInput"


const Hero = () => {

  const pos = useScrollPosition(0.5);  

  return (
    <div 
    style={{backgroundPositionY: pos}}
    className="min-h-screen bg-hero-bg bg-cover bg-blend-darken bg-black/25 flex flex-col justify-center items-center">
        <h1 
          className="text-[70px] font-bold text-white text-center"
          >Find your <span className="animate-fade-right">Perfect home!</span></h1>
          <p className="text-white text-[18px] max-w-[700px] text-center">We are a real estate agency that will help you find the best residence you dream of, 
            let’s discuss for your dream house? For Rent
          </p>
          <div className="flex gap-9 mt-[100px]">
          <Button isActive variant="outlined" text="For Rent" />
          <Button variant="outlined" text="For Sale" transparent />
          </div>
          <SearchInput />
    </div>
  )
}

export default Hero