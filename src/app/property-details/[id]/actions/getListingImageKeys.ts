'use server';

import { eq } from 'drizzle-orm';

import { db } from '~/server/db';
import { propertyImages, propertyListing } from '~/server/db/schema';

export default async function getListingImagesKeys(listing_id: string) {
    const mainImageName = await db
        .select({ mainImageKey: propertyListing.main_image })
        .from(propertyListing)
        .where(eq(propertyListing.id, listing_id));

    const response = await db
        .select({
            s3Key: propertyImages.s3key,
            filename: propertyImages.filename,
        })
        .from(propertyImages)
        .where(eq(propertyImages.listing_id, listing_id));

    const keys: string[] = [];
    response.map((item) => {
        if (item.s3Key === mainImageName[0].mainImageKey) {
            keys.unshift(item.s3Key);
        } else {
            keys.push(item.s3Key);
        }
    });
    return keys;
}
