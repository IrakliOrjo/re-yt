import HouseInteriorImage from '../../assets/images/house-interior.jpg';
import { BenefitBox } from './components/BenefitBox';
import { BENEFIT_BOXES } from './const';

export const BenefitSection = () => {
  return (
    <div className="min-h-screen flex px-2">
        <img className='w-[50%] rounded-l-2xl' src={HouseInteriorImage} alt='House interior' />
        <div className='pl-[95px] pt-[100px] w-full bg-slate-100 rounded-r-2xl'>
            <p className="text-blue-600 text-[20px]">Our Benifit</p>
            <h1 className="text-[36px] mb-7 font-bold text-gray-800">Why Choose Us?</h1>
            <p className="max-w-[500px] text-[14px] text-gray-500 mb-6">Our seasoned team excels in real estate with years of successful market
            navigation, offering informed decisions and optimal results.</p>
            <div className='flex flex-col gap-5 items-start'>
                {BENEFIT_BOXES.map(({icon, title, description}, index) => {
                    return (<BenefitBox key={index} img={icon} title={title} description={description} />)
                })}
            </div>
        </div>
    </div>
  )
}

 