import Categories from '../components/Categories/Categories'
import GenerateBanner from '../components/GenerateBanner/GenerateBanner'
import Hero from '../components/Hero/Hero'
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
    </div>
  )
}

export default HomePage
