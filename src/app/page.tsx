import ExploreCities from './_components/ExploreCities/ExploreCitiesSection'
import FeaturedListings from './_components/FeaturedListings/FeaaturedListings'
import Header from './_components/Header/Header'
export default function Home() {
  return (
    <div>
      <Header />
      <FeaturedListings />
      <ExploreCities />
    </div>
  )
}
