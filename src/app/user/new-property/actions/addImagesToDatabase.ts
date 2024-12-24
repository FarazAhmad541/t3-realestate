'use server';

import { InferInsertModel } from 'drizzle-orm';

import { auth } from '@clerk/nextjs/server';

import { db } from '~/server/db';
import { imageTypeEnum, propertyImages } from '~/server/db/schema';

type ImageInsertModel = InferInsertModel<typeof propertyImages>;

export default async function addImagesToDatabase({
    listing_id,
    s3key,

    image_type,
}: {
    listing_id: string;
    s3key: string;
    image_type: 'image/jpeg' | 'image/png';
}) {
    const { sessionId } = await auth();
    if (!sessionId) {
        return {
            error: 'You must be logged in to create a listing',
        };
    }
    try {
        const newImage: ImageInsertModel = {
            listing_id,
            s3key,
            filename: 'filename',
            image_type: image_type || 'image/jpeg',
        };
        await db.insert(propertyImages).values(newImage);
    } catch (error: any) {
        console.log(error.message);
        throw new Error('Error adding images to database');
    }
}
