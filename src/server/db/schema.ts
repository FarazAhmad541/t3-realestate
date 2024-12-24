import {
    pgEnum,
    pgTableCreator,
    real,
    text,
    timestamp,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core';

export const createTable = pgTableCreator((name) => `t3-realestate_${name}`);
// Enum for Property Type
export const propertyTypeEnum = pgEnum('property_type', [
    'House',
    'Flat',
    'Room',
    'Plot',
    'Shop',
    'Apartment',
    'Studio',
    'Office',
    'Farmhouse',
]);
// Enum for Area Unit
export const areaUnitEnum = pgEnum('area_unit', [
    'sqft',
    'sqm',
    'sqyd',
    'marla',
    'kanal',
]);
// Enum for Property Listing Type
export const propertyListingTypeEnum = pgEnum('property_for', [
    'for_rent',
    'for_sale',
]);

export const statusEnum = pgEnum('status', ['pending', 'approved', 'rejected']);

export const availabilityEnum = pgEnum('availability', [
    'un_sold',
    'sold',
    'not_rented',
    'rented',
]);

export const imageTypeEnum = pgEnum('image_type', ['image/jpeg', 'image/png']);

// Main Property Listing Table
export const propertyListing = createTable('property_listings', {
    id: text('id').primaryKey(),
    property_for: propertyListingTypeEnum('property_for').notNull(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    property_type: propertyTypeEnum('property_type').notNull(),
    author_id: varchar('author_id')
        .references(() => users.id, { onDelete: 'cascade' })
        .notNull(),
    // Amenities (as a JSONB column for flexible boolean features)
    amenities: text('amenities').$type<{
        'Security Cameras': boolean;
        'Parking Space': boolean;
        'Central Heating': boolean;
        'Central Air Conditioning': boolean;
        'Electricity Backup': boolean;
        'Lawn / Garden': boolean;
    }>(),
    // Rooms (as a JSONB column to handle flexible room counts)
    rooms: text('rooms').$type<{
        Bedrooms?: number | '7+';
        Bathrooms?: number | '6+';
        'Servant Quarters'?: number | '2+';
        Kitchen?: number | '2+';
        'Store Rooms'?: number | '2+';
        'Drawing Room'?: number | '2+';
    }>(),
    // Numeric fields
    main_image: text('main_image').notNull(),
    area: real('area').notNull(),
    area_unit: areaUnitEnum('area_unit').default('sqft'),
    price: real('price').notNull(),
    // Location details
    city: text('city').notNull(),
    location: text('location').notNull(),
    latitude: real('latitude'),
    longitude: real('longitude'),
    // Contact information
    email: text('email').notNull(),
    phone: text('phone').notNull(),
    landline: text('landline'),
    // Timestamps
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at'),
    // Listing status
    status: statusEnum('status').default('pending').notNull(),
    availability: availabilityEnum('availability').default('un_sold').notNull(),
});

// Property Images Table
export const propertyImages = createTable('property_images', {
    id: uuid('id').defaultRandom().primaryKey(),
    listing_id: text('listing_id')
        .references(() => propertyListing.id, { onDelete: 'cascade' })
        .notNull(),
    s3key: text('s3key').unique().notNull(),
    s3bucket: text('s3bucket'),
    filename: text('filename').notNull(),
    caption: text('caption'),
    image_type: imageTypeEnum('image_type').default('image/jpeg').notNull(),
});

export const users = createTable('users', {
    id: varchar('id').primaryKey().notNull(),
    first_name: text('first_name'),
    last_name: text('last_name'),
    email: text('email').notNull(),
    auth_provider: text('auth_provider'),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at'),
});
