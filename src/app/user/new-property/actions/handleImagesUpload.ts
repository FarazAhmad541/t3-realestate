'use server';

import { InferInsertModel, eq } from 'drizzle-orm';

import { ImageSchema } from '~/lib/FormSchema';
import { db } from '~/server/db';
import { propertyImages, propertyListing } from '~/server/db/schema';

import addImagesToDatabase from './addImagesToDatabase';

export async function handleImagesUpload({
    images,
    signedUrls,
    listing_id,
}: {
    images: ImageSchema[];
    signedUrls: string[];
    listing_id: string;
}) {
    try {
        const mainImage = await db
            .select({
                mainImageName: propertyListing.main_image,
            })
            .from(propertyListing)
            .where(eq(propertyListing.id, listing_id));
        const mainImageName = mainImage[0].mainImageName;
        await Promise.all(
            // Upload each image to AWS
            images.map(async (image, index) => {
                const url = signedUrls[index];
                await fetch(url, {
                    method: 'PUT',
                    body: image,
                    headers: {
                        'Content-Type': image.type,
                    },
                });

                console.log('url; ', url.split('?')[0].split('/').pop());

                // Add Image url to the Images table in database if the upload is successful

                const imageData: InferInsertModel<typeof propertyImages> = {
                    listing_id,
                    s3key: url.split('?')[0].split('/').pop() || '',
                    image_type:
                        (image.type as 'image/jpeg' | 'image/png') ||
                        'image/jpeg',
                    filename: image.name,
                };
                await addImagesToDatabase({ imageData, mainImageName });
            }),
        );
    } catch (error) {
        throw error;
    }
}
