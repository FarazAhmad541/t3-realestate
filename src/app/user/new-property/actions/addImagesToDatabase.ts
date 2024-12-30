'use server';

import { eq } from 'drizzle-orm';

import { auth } from '@clerk/nextjs/server';

import { db } from '~/server/db';
import {
    PropertyImageInsertSchema,
    propertyImages,
    propertyListing,
} from '~/server/db/schema';

type Props = {
    imageData: PropertyImageInsertSchema;
    mainImageName: string;
};

export default async function addImagesToDatabase({
    imageData,
    mainImageName,
}: Props) {
    const { listing_id, s3key, filename, image_type } = imageData;

    const { sessionId } = await auth();
    if (!sessionId) {
        return {
            error: 'You must be logged in to create a listing',
        };
    }
    try {
        const newImage: PropertyImageInsertSchema = {
            listing_id,
            s3key,
            filename: filename,
            image_type: image_type || 'image/jpeg',
        };

        await db.insert(propertyImages).values(newImage);
        if (newImage.filename === mainImageName) {
            await db
                .update(propertyListing)
                .set({ main_image: s3key })
                .where(eq(propertyListing.id, listing_id));
        }
    } catch (error: any) {
        console.log(error.message);
        throw new Error('Error adding images to database');
    }
}
