'use server';

import { eq, sql } from 'drizzle-orm';

import { unstable_cache } from 'next/cache';

import { auth } from '@clerk/nextjs/server';

import { db } from '~/server/db';
import { PropertyType, propertyListing, users } from '~/server/db/schema';

export default function 

export default async function getListingCardsData(propertyType: PropertyType) {
    const { userId } = await auth();

    try {
        const response = await db
            .select({
                property_for: propertyListing.property_for,
                property_type: propertyListing.property_type,
                title: propertyListing.title,
                price: propertyListing.price,
                area: propertyListing.area,
                area_unit: propertyListing.area_unit,
                rooms: propertyListing.rooms,
                city: propertyListing.city,
                location: propertyListing.location,
                main_image: propertyListing.main_image,
                phone: propertyListing.phone,
                email: propertyListing.email,
                whatsapp: propertyListing.whatsapp,
                id: propertyListing.id,
                is_saved: sql<boolean>`
                CASE 
                    WHEN ${propertyListing.id} = ANY(${users.saved_listings}) THEN true
                    ELSE false
                END
            `.as('is_saved'),
            })
            .from(propertyListing)
            .leftJoin(users, eq(users.id, userId || ''))
            .where(eq(propertyListing.property_type, propertyType))
            .limit(6);
        console.log(response);
        return response ?? [];
    } catch (error: any) {
        console.error('Query error', {
            error: error.message,
            stack: error.stack,
            code: error.code,
        });
        return [];
    }
}
