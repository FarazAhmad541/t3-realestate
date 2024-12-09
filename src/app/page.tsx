import ExploreCities from './_components/Home/ExploreCities/ExploreCitiesSection'
import FeaturedListings from './_components/Home/FeaturedListings/FeaaturedListings'
import Header from './_components/Home/Header/Header'
export default function Home() {
  return (
    <div>
      <Header />
      <FeaturedListings />
      <ExploreCities />
    </div>
  )
}
