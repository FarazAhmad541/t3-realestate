'use server';

import { InferInsertModel } from 'drizzle-orm';

import { auth } from '@clerk/nextjs/server';

import {
    FormSchemaWithoutImages,
    FormSchemaWithoutImagesType,
} from '~/lib/FormSchema';
import { db } from '~/server/db';
import { propertyListing } from '~/server/db/schema';
import generateRandomId from '~/utils/generateRandomId';

type PropertyListingInsert = InferInsertModel<typeof propertyListing>;

export default async function createListing(data: FormSchemaWithoutImagesType) {
    const parsedData = FormSchemaWithoutImages.safeParse(data);
    const id = parsedData.data?.title
        .split(' ')
        .join('_')
        .concat('_')
        .concat(generateRandomId());
    if (!parsedData.success) {
        throw new Error(parsedData.error.message);
    }
    const { userId } = await auth();
    if (!userId) {
        throw new Response('Unauthorized', { status: 401 });
    }

    try {
        const newListing: PropertyListingInsert = {
            ...parsedData.data,
            id: id || '',
            author_id: userId,
            main_image: data.main_image || '',
            status: 'pending',
            availability: 'un_sold',
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
