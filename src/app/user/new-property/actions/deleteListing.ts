'use server';

import { eq } from 'drizzle-orm';

import { auth } from '@clerk/nextjs/server';

import { db } from '~/server/db';
import { propertyListing } from '~/server/db/schema';

export default async function deleteListing({
    listing_id,
    author_id,
}: {
    listing_id: string;
    author_id: string;
}) {
    const { userId } = await auth();
    if (author_id !== userId) {
        throw new Error('You are not authorized to delete this listing');
    }
    await db.delete(propertyListing).where(eq(propertyListing.id, listing_id));
}
