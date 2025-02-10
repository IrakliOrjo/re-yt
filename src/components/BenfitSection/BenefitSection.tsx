import HouseInteriorImage from '../../assets/images/house-interior.jpg';
import { BenefitBox } from './components/BenefitBox';
import { BENEFIT_BOXES } from './const';

export const BenefitSection = () => {
  return (
    <div className="min-h-screen flex flex-col xl:flex-row px-2">
        <img className='xl:w-[50%] xl:rounded-l-2xl xl:rounded-tr-none rounded-t-2xl' src={HouseInteriorImage} alt='House interior' />
        <div className='xl:pl-[80px] px-4   xl:pt-[100px] py-14 w-full bg-slate-100 xl:rounded-r-2xl'>
            <p className="text-blue-600 xl:text-[20px] text-[14px] font-[500] uppercase">Our Benifit</p>
            <h1 className="xl:text-[34px] text-[1.6rem] mb-9 font-bold xl:mb7">Why Choose Us?</h1>
            <p className="max-w-[500px]  text-gray-500 mb-6">Our seasoned team excels in real estate with years of successful market
            navigation, offering informed decisions and optimal results.</p>
            <div className='flex flex-col gap-5 xl:items-start'>
                {BENEFIT_BOXES.map(({icon, title, description}, index) => {
                    return (<BenefitBox key={index} img={icon} title={title} description={description} />)
                })}
            </div>
        </div>
    </div>
  )
}

 