'use server';

import { eq } from 'drizzle-orm';

import { db } from '~/server/db';
import { PropertyType, propertyListing } from '~/server/db/schema';

export default async function getListingCardsData(propertyType: PropertyType) {
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
            })
            .from(propertyListing)
            .where(eq(propertyListing.property_type, propertyType))
            .limit(6);
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
