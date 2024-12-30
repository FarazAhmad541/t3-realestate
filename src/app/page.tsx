import { PropertyType } from '~/server/db/schema';

import ExploreCities from './_components/ExploreCities/ExploreCitiesSection';
import FeaturedListings from './_components/FeaturedListings/FeaaturedListings';
import Header from './_components/Header/Header';
import getListingCardsData from './actions/getListingCardsData';

export default async function Home() {
    const fetchListings = async (tag: PropertyType) => {
        const listings = await getListingCardsData(tag);
        return listings;
    };
    const listings = await fetchListings('House');
    return (
        <div>
            <Header />
            <FeaturedListings />
            <ExploreCities />
        </div>
    );
}
