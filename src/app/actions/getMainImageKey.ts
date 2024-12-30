'use server';

import { eq } from 'drizzle-orm';

import { db } from '~/server/db';
import { propertyImages } from '~/server/db/schema';

export default async function getMainImageKey(imageName: string) {
    try {
        const response = await db
            .select({ s3Key: propertyImages.s3key })
            .from(propertyImages)
            .where(eq(propertyImages.filename, imageName));
        return response[0].s3Key;
    } catch (error) {
        console.log(error);
    }
}
