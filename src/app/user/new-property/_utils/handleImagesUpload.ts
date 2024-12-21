import { ImageWithCover } from '~/lib/FormSchema';

import addImagesToDatabase from '../actions/addImagesToDatabase';

export async function handleImagesUpload({
    images,
    signedUrls,
    listing_id,
}: {
    images: ImageWithCover[];
    signedUrls: string[];
    listing_id: string;
}) {
    try {
        await Promise.all(
            // Upload each image to AWS
            images.map(async (image, index) => {
                const url = signedUrls[index];
                const response = await fetch(url, {
                    method: 'PUT',
                    body: image,
                    headers: { 'Content-Type': image.type },
                });
                if (!response.ok) {
                    throw new Error(
                        `Error uploading image ${index + 1}: ${response.statusText}`,
                    );
                }

                // Add Image url to the Images table in database if the upload is successful
                await addImagesToDatabase({
                    listing_id,
                    url: url.split('?')[0],
                    is_cover: image.isCover,
                });
            }),
        );
    } catch (error) {
        throw error;
    }
}
