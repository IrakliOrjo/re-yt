
import { Services } from './components'
import { BenefitSection } from './components/BenfitSection'
import { FeaturedProperties } from './components/FeaturedProperties/FeaturedProperties'
import { Header } from './components/Header'
import Hero from './components/Hero/Hero'
import { Locations } from './components/Locations'

function App() {
 
  return (
    <div className=''>
      <Header />
      <Hero />
      <FeaturedProperties />
      <Locations />
      <Services />
      <BenefitSection />
    </div>
  )
}

export default App
