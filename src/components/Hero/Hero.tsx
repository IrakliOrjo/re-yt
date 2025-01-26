import { useScrollPosition } from "../../hooks";
import { Button } from "../Button"
import { SearchInput } from "../SearchInput"


const Hero = () => {

  const pos = useScrollPosition(0.5);  

  return (
    <div 
    style={{backgroundPositionY: pos}}
    className="min-h-screen bg-hero-bg bg-cover bg-center bg-blend-darken bg-black/25 flex flex-col 
    justify-center items-center px-3">
        <h1 
          className="md:text-[6.8rem] font-bold text-white text-center text-[2.5rem] px-20"
          >Find your <span className="animate-fade-right">Perfect home!</span></h1>
          <p className="text-white max-w-[700px] text-center">We are a real estate agency that will help you find the best residence you dream of, 
            let’s discuss for your dream house? 
          </p>
          <div className="flex gap-9 md:mt-[100px] mt-9">
          <Button isActive variant="outlined" text="For Rent" />
          <Button variant="outlined" text="For Sale" transparent />
          </div>
          <SearchInput />
    </div>
  )
}

export default Hero