'use server';

import { eq } from 'drizzle-orm';

import { db } from '~/server/db';
import {
    PropertyListingSelectSchema,
    propertyListing,
} from '~/server/db/schema';

export default async function getListingDetails(
    listing_id: string,
): Promise<PropertyListingSelectSchema> {
    const response = await db
        .select()
        .from(propertyListing)
        .where(eq(propertyListing.id, listing_id));

    // Since we're querying by ID, we expect a single result
    // Check if we found a listing
    if (!response[0]) {
        throw new Error('Listing not found');
    }

    return response[0];
}
