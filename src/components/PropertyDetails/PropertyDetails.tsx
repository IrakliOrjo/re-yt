import  { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useHouseStore from '../../store/houseStore';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { FeaturesComponent, PropertyDetail } from './components';
import { Bath, BedSingle, House, LandPlot, MapPin, Ruler } from 'lucide-react';
import { Skeleton } from 'antd';

import 'swiper/swiper-bundle.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';



const PropertyDetails = () => {
  const { id } = useParams();
  const fetchHouseById = useHouseStore(state => state.fetchHouseById);
  const currentHouse = useHouseStore(state => state.currentHouse);
  const loading = useHouseStore(state => state.loading);
  const error = useHouseStore(state => state.error);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
 

  useEffect(() => {
    if(id) {
        fetchHouseById(id);
    }
  }, [id, fetchHouseById]);

  console.log('currentHouse', currentHouse);

  if (loading) {
    return (
      <>
        <Header />
        <div className="mx-auto mt-28 flex flex-col py-4 px-5 xl:px-72">
          {/* Title and Price Skeleton */}
          <div className='md:flex justify-between'>
            <div className='flex gap-3 items-center mb-2'>
              <Skeleton.Input active size="large" style={{ width: 250, height: 40 }} />
              <Skeleton.Input active size="large" style={{ width: 250, height: 40 }} />
            </div>
            <div className='mb-2'>
              <Skeleton.Input active size="large" style={{ width: 150, height: 40 }} />
            </div>
          </div>
          
          {/* Divider */}
          <div className='my-9 border-b-[1px] border-black/10'></div>
          
          {/* Features and Location Skeleton */}
          <div className='md:flex gap-11'>
            <div className=''>
              <Skeleton.Input active size="small" style={{ width: 100, marginBottom: 10 }} />
              <div className='flex gap-2 mb-8'>
                <Skeleton.Button active size="small" shape="square" style={{ width: 100, height: 40 }} />
                <Skeleton.Button active size="small" shape="square" style={{ width: 100, height: 40 }} />
                <Skeleton.Button active size="small" shape="square" style={{ width: 100, height: 40 }} />
              </div>
            </div>
            <div className='mb-4'>
              <Skeleton.Input active size="small" style={{ width: 100, marginBottom: 10 }} />
              <div className='flex'>
                <Skeleton.Input active size="small" style={{ width: 180 }} />
              </div>
            </div>
          </div>
          
          {/* Images Swiper Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
            {[...Array(1)].map((_, index) => (
              <div key={index} className="w-full max-w-xs">
                <Skeleton.Image active style={{ width: '100%', height: 400 }} />
              </div>
            ))}
          </div>
          
          {/* Description Skeleton */}
          <div className="mb-6">
            <Skeleton.Input active size="default" style={{ width: 150, marginBottom: 10 }} />
            <Skeleton active paragraph={{ rows: 3 }} />
          </div>
          
          {/* Property Details Skeleton */}
          <div className="flex flex-col gap-8">
            <div className="">
              <div className="flex gap-2 mb-6">
                <Skeleton.Button active shape="round" style={{ width: 80, height: 30 }} />
                <Skeleton.Button active shape="round" style={{ width: 100, height: 30 }} />
              </div>
              
              <div className="mb-11 w-full">
                <Skeleton.Input active size="default" style={{ width: 180, marginBottom: 10 }} />
                <div className="w-full">
                  <div className='gap-5 grid grid-cols-2 md:flex md:flex-wrap md:gap-11 lg:max-w-3xl mb-4'>
                    {[...Array(5)].map((_, index) => (
                      <Skeleton.Button 
                        key={index}
                        active 
                        size="default" 
                        shape="square" 
                        style={{ width: 120, height: 70 }} 
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Buttons Skeleton */}
              <div className="mt-8">
                <Skeleton.Button active size="large" style={{ width: 150, height: 50, marginRight: 16 }} />
                <Skeleton.Button active size="large" style={{ width: 150, height: 50 }} />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="container mx-auto py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600">Error: {error}</h2>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!currentHouse) {
    return (
      <>
        <Header />
        <div className="container mx-auto py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Property not found</h2>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  

  return (
    <>
      <Header />
      <div className=" mx-auto mt-28 flex flex-col py-4 px-5 xl:px-72">
        <div className='md:flex justify-between'>
        <div className='flex gap-3 items-center mb-2'>
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold capitalize">{currentHouse.title},</h1>
              <p className="text-gray-600 text-xl lg:text-2xl xl:text-3xl capitalize">{currentHouse.address}</p>
        </div>
        <div className='mb-2 font-bold text-2xl lg:text-4xl xl:text-5xl'>
             ${Number(currentHouse.price).toLocaleString()}
        </div>
        </div>
        {/* divider */}
        <div className='my-9 border-b-[1px] border-black/10'></div>
        <div className='md:flex gap-11'>

        {/* Features */}
        <div className=''>
            <h2 className="text-lg font-semibold text-neutral-600 mb-2">Features</h2>
            <div className='flex gap-2 mb-8'>
               <FeaturesComponent icon={<BedSingle size={18} />} text={'Bedrooms:'} amount={currentHouse.bedrooms ?? 0} />
               <FeaturesComponent icon={<Bath size={18} />} text={'Baths:'} amount={currentHouse.bathrooms ?? 0} />
               <FeaturesComponent icon={<Ruler size={18} />} text={'Sqft:'} amount={currentHouse.surface ?? 0} />
            </div>
        </div>
        {/* Locations */}
        <div className='mb-4 '>
                <h2 className="text-lg font-semibold text-neutral-600 mb-2">Locations</h2>
            <div className='flex'>
                <p className='text-sm flex items-center gap-2 text-gray-700 capitalize'
                ><MapPin size={18} />{currentHouse.address}</p>
            </div>
        </div>
        </div>
        {/* Images Swiper */}
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
                slidesPerView: 'auto',
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
            {currentHouse.images && currentHouse.images.map((image, index) => (
                <SwiperSlide key={index} className='max-w-xs'>
                    {/* <LocationPlate image={image.url}  index={index} /> */}
                    <img 
                    key={index}
                    src={image.url} 
                    alt={`${currentHouse.title} - view ${index + 1}`}
                    className="w-full h-[500px] lg:h-[400px] object-cover rounded"
                  />
                </SwiperSlide>
            ))}
        </Swiper>

    
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-600 text-sm md:max-w-lg lg:max-w-2xl xl:max-w-4xl
                ">{currentHouse.description}</p>
              </div>
    

        <div className="flex flex-cik gap-8">
          <div className="">
            <div className="status-badge bg-blue-600 text-white py-1 px-3 rounded-full inline-block mr-2">
              {currentHouse.status}
            </div>
            <div className="price-badge bg-blue-600 text-white py-1 px-3 rounded-full inline-block mb-6">
              ${Number(currentHouse.price).toLocaleString()}
            </div>
            
            <div className="mb-11 w-full">
              <h2 className="text-xl font-semibold mb-2">Property Details</h2>
              <div className="w-full">
                <div className='gap-5 grid grid-cols-2 md:flex md:flex-wrap
                 md:gap-11 lg:max-w-3xl mb-4'>
                  <PropertyDetail icon={<House size={22} />} title='status' text={currentHouse.status}  />
                  <PropertyDetail icon={<House size={22} />} title='type' text={currentHouse.type}  />
                  <PropertyDetail icon={<BedSingle size={22} />} title='bedrooms' text={String(currentHouse.bedrooms)}  />
                  <PropertyDetail icon={<Bath size={22} />} title='bathrooms' text={String(currentHouse.bathrooms)}  />
                  <PropertyDetail icon={<LandPlot size={22}/>} title='Area' text={String(`${currentHouse.surface}m²`).toLocaleString()}  />
                </div>
              </div>
            </div>
            

            
            <div className="mt-8">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg mr-4">
                Contact Agent
              </button>
              <button className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 px-6 rounded-lg border border-blue-600">
                Schedule Tour
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PropertyDetails;