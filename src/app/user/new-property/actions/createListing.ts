'use server';

import { z } from 'zod';

import { auth } from '@clerk/nextjs/server';

import { FormSchema } from '~/lib/FormSchema';
import { db } from '~/server/db';
import { propertyListing, statusEnum } from '~/server/db/schema';

export default async function createListing(data: z.infer<typeof FormSchema>) {
    const FormSchemaWithoutImages = FormSchema.omit({ images: true });
    const parsedData = FormSchemaWithoutImages.safeParse(data);
    if (!parsedData.success) {
        throw new Error(parsedData.error.message);
    }
    const { userId } = await auth();
    if (!userId) {
        throw new Response('Unauthorized', { status: 401 });
    }

    try {
        const newListing = {
            ...parsedData.data,
            author_id: userId,
            status: statusEnum.enumValues[0], // pending
        };
        const response = await db
            .insert(propertyListing)
            .values(newListing)
            .returning({
                lisitng_id: propertyListing.id,
                author_id: propertyListing.author_id,
            });
        return {
            listing_id: response[0].lisitng_id,
            author_id: response[0].author_id,
        };
    } catch (error) {
        console.log('error: ', error);
    }
}
