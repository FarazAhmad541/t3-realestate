'use server';

import { auth } from '@clerk/nextjs/server';

import { db } from '~/server/db';
import { propertyImages } from '~/server/db/schema';

export default async function addImagesToDatabase({
    listing_id,
    url,
    is_cover,
}: {
    listing_id: string;
    url: string;
    is_cover: boolean;
}) {
    const { sessionId } = await auth();
    if (!sessionId) {
        return {
            error: 'You must be logged in to create a listing',
        };
    }
    try {
        await db.insert(propertyImages).values({
            listing_id: listing_id,
            url,
            is_cover,
        });
    } catch (error: any) {
        console.log(error.message);
        throw new Error('Error adding images to database');
    }
}
