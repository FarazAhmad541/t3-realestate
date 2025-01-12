'use server';

import { eq, sql } from 'drizzle-orm';

import { auth } from '@clerk/nextjs/server';

import { db } from '~/server/db';
import { users } from '~/server/db/schema';

export default async function addToFavorites({
    listing_id,
}: {
    listing_id: string;
}) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error('You must be logged in to add to favorites');
    }
    await db
        .update(users)
        .set({
            saved_listings: sql`
                CASE 
                    WHEN ${listing_id} = ANY(${users.saved_listings}) 
                    THEN array_remove(${users.saved_listings}, ${listing_id})
                    ELSE array_append(${users.saved_listings}, ${listing_id})
                END
            `,
        })
        .where(eq(users.id, userId));
}
