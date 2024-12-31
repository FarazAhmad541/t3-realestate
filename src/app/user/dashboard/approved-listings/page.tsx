import { redirect } from 'next/navigation';

import { auth } from '@clerk/nextjs/server';

import ListingsTable from '../_components/ListingsTable/ListingsTable';
import getAllListings from '../actions/getAllListings';

export default async function Page() {
    const { userId } = await auth();
    if (!userId) {
        return redirect('/signin');
    }
    const listings = await getAllListings({ id: userId, status: 'approved' });
    return <ListingsTable listings={listings} />;
}
