'use server';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { auth } from '@clerk/nextjs/server';

import { generateRandomObjectName } from '../_utils/getRandomObjectName';

const s3 = new S3Client({
    region: process.env.AWS_BUCKET_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_KEY!,
    },
});

export default async function getSignedUrlAction({
    listing_id,
    noOfImages,
}: {
    listing_id: string;
    noOfImages: number;
}) {
    const { sessionId, userId: user_id } = await auth();
    if (!sessionId) {
        return {
            error: 'You must be logged in to create a listing',
        };
    }

    console.log('noOfImages: ', noOfImages);
    const signedUrls = await Promise.all(
        Array(noOfImages)
            .fill(0)
            .map(async () => {
                const putObjectCommand = new PutObjectCommand({
                    Bucket: process.env.AWS_BUCKET_NAME!,
                    Key: generateRandomObjectName(listing_id),
                    Metadata: {
                        user_id,
                        listing_id: listing_id,
                    },
                });
                const url = await getSignedUrl(s3, putObjectCommand, {
                    expiresIn: 60 * 2,
                });
                return url;
            }),
    );
    return {
        signedUrls,
        user_id,
    };
}
