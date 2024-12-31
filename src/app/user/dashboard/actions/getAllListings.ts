'use server';

import { and, eq } from 'drizzle-orm';

import { auth } from '@clerk/nextjs/server';

import { db } from '~/server/db';
import { Status, propertyListing } from '~/server/db/schema';

export default async function getAllListings({
    id,
    status,
}: {
    id: string;
    status?: Status;
}) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error('Unauthorized');
    }

    const response = await db
        .select({
            id: propertyListing.id,
            title: propertyListing.title,
            created_at: propertyListing.created_at,
            price: propertyListing.price,
            availability: propertyListing.availability,
            status: propertyListing.status,
            main_image: propertyListing.main_image,
        })
        .from(propertyListing)
        .where(
            and(
                eq(propertyListing.author_id, userId),
                status && eq(propertyListing.status, status),
            ),
        );

    return response;
}
export type ListingsTableData = Awaited<ReturnType<typeof getAllListings>>;
