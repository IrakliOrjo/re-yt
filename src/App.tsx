
import { OurTeam, Services } from './components'
import { BenefitSection } from './components/BenfitSection'
import { BlogPosts } from './components/BlogPosts'
import { FeaturedProperties } from './components/FeaturedProperties/FeaturedProperties'
import { Footer } from './components/Footer'
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
      <OurTeam />
      <BlogPosts />
      <Footer />
    </div>
  )
}

export default App
