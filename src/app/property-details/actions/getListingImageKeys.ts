import { eq } from 'drizzle-orm';

import { db } from '~/server/db';
import { propertyImages } from '~/server/db/schema';

export default async function getListingImagesKeys(listing_id: string) {
    const response = await db
        .select({ s3Key: propertyImages.s3key })
        .from(propertyImages)
        .where(eq(propertyImages.listing_id, listing_id));
    const keys = response.map((item) => item.s3Key);
    return keys;
}
