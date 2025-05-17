import { OurTeam, Services } from "../components"
import { BenefitSection } from "../components/BenfitSection"
import { BlogPosts } from "../components/BlogPosts"
import { FadeInOnScroll } from "../components/FadeInOnScroll"
import { FeaturedProperties } from "../components/FeaturedProperties/FeaturedProperties"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import Hero from "../components/Hero/Hero"
import { Locations } from "../components/Locations"


export const HomePage = () => {
  return (
    <>
      <Header />
      <Hero />
      <FadeInOnScroll delay={0.3}>
        <FeaturedProperties />
      </FadeInOnScroll>
      <Locations />
      <Services />
      <BenefitSection />
      <OurTeam />
      <BlogPosts />
      <Footer />
    </>
  )
}

