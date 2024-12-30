'use server';

import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export default async function getDownloadSignedUrl(key: string) {
    const s3Client = new S3Client({
        region: process.env.AWS_BUCKET_REGION!,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY!,
            secretAccessKey: process.env.AWS_SECRET_KEY!,
        },
    });

    try {
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: key,
        });
        // Option 1: Return the signed URL directly
        const signedUrl = await getSignedUrl(s3Client, command, {
            expiresIn: 3600, // Increase expiration time to 1 hour
        });
        return signedUrl;
    } catch (error) {
        console.error('Error in GET route:', error);
        return '';
    }
}
