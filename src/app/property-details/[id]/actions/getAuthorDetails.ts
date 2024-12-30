'use server';

import { eq } from 'drizzle-orm';

import { db } from '~/server/db';
import { users } from '~/server/db/schema';

export default async function getAuthorDetails(author_id: string) {
    const response = await db
        .select({
            firstName: users.first_name,
            lastName: users.last_name,
        })
        .from(users)
        .where(eq(users.id, author_id));
    return response[0];
}
