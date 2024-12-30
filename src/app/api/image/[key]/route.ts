import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { NextRequest } from 'next/server';

type Params = Promise<{ key: string }>;

export async function GET(req: NextRequest, segmentData: { params: Params }) {
    const params = await segmentData.params;
    const key = params.key;
    console.log('key: ', key);

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
        // return new Response(signedUrl, {
        //     headers: {
        //         'Content-Type': 'text/plain',
        //     },
        // });

        // Option 2: If you need to proxy the image through your API

        const response = await fetch(signedUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.statusText}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const contentType = response.headers.get('content-type');

        return new Response(arrayBuffer, {
            headers: {
                'Content-Type': contentType || 'image/jpeg',
                'Cache-Control': 'public, max-age=3600',
            },
        });
    } catch (error) {
        console.error('Error in GET route:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}
