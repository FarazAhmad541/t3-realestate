'use client';

import { ImageSchema } from '~/lib/FormSchema';

import addImagesToDatabase from '../actions/addImagesToDatabase';

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
                await addImagesToDatabase({
                    listing_id,
                    s3key: url.split('?')[0].split('/').pop() || '',
                    image_type: image.type as 'image/jpeg' | 'image/png',
                });
            }),
        );
    } catch (error) {
        throw error;
    }
}
