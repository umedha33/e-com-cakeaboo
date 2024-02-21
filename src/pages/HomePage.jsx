import Categories from '../components/Categories/Categories'
import GenerateBanner from '../components/GenerateBanner/GenerateBanner'
import Hero from '../components/Hero/Hero'
import Reviews from '../components/Reviews/Reviews'
import ServiceLbls from '../components/ServiceLbls/ServiceLbls'
import ShortGallery from '../components/ShortGallery/ShortGallery'
import './CSS/HomePage.css'

const HomePage = () => {
  return (
    <div>
      <Hero />
      <ServiceLbls />
      <ShortGallery />
      <GenerateBanner />
      <Categories />
      <Reviews />
    </div>
  )
}

export default HomePage
