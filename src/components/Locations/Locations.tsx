
import { Swiper, SwiperSlide } from 'swiper/react';
import { LocationPlate } from "./components"
import { CITYS } from "./components/LocationPlate/consts"
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
 
import 'swiper/swiper-bundle.css';
import './Locations.css'
 
 
export const Locations = () => {

 
  return (
    <div className="flex flex-col justify-center items-center py-20">
        <p className="text-blue-600 text-[20px]">Explore Cities</p>
        <h1 className="text-[34px] mb-9 font-bold">Our Location For You</h1>
        <div className="flex w-full py-6 px-2 ">
        <Swiper
  
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={6}
          breakpoints={{
            // when window width is >= 320px
            320: {
              slidesPerView: 1,
              centeredSlides: true,
            },
            // when window width is >= 768px
            768: {
              slidesPerView: 2,
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: 3,
              centeredSlides: false,
            },
            1280: {
              slidesPerView: 6,
              centeredSlides: false,
            }
          }} 
          pagination={{ 
            clickable: true,
            el: '.swiper-custom-pagination',
            bulletClass: 'swiper-custom-bullet',
            bulletActiveClass: 'swiper-custom-bullet-active',
          }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
         {CITYS.map(({img,title},index) => {
                    return ( 
                        <SwiperSlide key={title} >
                            <LocationPlate image={img} location={title} index={index} />
                        </SwiperSlide>
               )
                })}
                <div className="swiper-custom-pagination absolute bottom-0 w-full flex justify-center gap-2 mt-14" />
    </Swiper>          
         
        <div>
             
        </div>
        </div>
 
    </div>
  )
}

 