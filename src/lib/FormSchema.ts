import { z } from 'zod';

//  Images Schema
const imageSchema = z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
        // 5MB size limit
        message: 'Each image must be less than 5MB',
    })
    .refine((file) => ['image/jpeg', 'image/png'].includes(file.type), {
        message: 'Only image files (JPEG, PNG) are allowed',
    });

// Define the sub-options for each property type
export const PropertyTypeSchema = z.enum([
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

//  Schema for Area Unit
export const AreaUnitSchema = z
    .enum(['sqft', 'sqm', 'sqyd', 'marla', 'kanal'])
    .default('sqft');

export const MainFeaturesSchema = z.object({
    'Security Cameras': z.boolean(),
    'Parking Space': z.boolean(),
    'Central Heating': z.boolean(),
    'Central Air Conditioning': z.boolean(),
    'Electricity Backup': z.boolean(),
    'Lawn / Garden': z.boolean(),
});

export const RoomsSchema = z.object({
    Bedrooms: z.number().int().positive(),
    Bathrooms: z.number().int().positive(),
    'Servant Quarters': z.number().int().positive(),
    Kitchen: z.number().int().positive(),
    'Store Rooms': z.number().int().positive(),
    'Drawing Room': z.number().int().positive(),
});

const AmenitiesSchema = z.object({
    'Main Features': MainFeaturesSchema,
    Rooms: RoomsSchema,
});

//  Schema for Listing form
export const FormSchema = z.object({
    property_for: z.enum(['rent', 'sell']),
    title: z.string().trim().min(1, 'Title is required'),
    description: z.string().trim().min(1, 'Description is required'),
    property_type: PropertyTypeSchema,
    amenitiesSchema: AmenitiesSchema,
    area: z.number().positive().min(1, 'Area is required'),
    area_unit: AreaUnitSchema,
    price: z.number().positive().min(1, 'Price is required'),
    images: z
        .array(imageSchema)
        .min(6, { message: 'You must upload at least 2 images' })
        .max(25, 'Maximum 6 images are allowed')
        .nonempty({ message: 'Images are required' }),
    city: z.string().min(1, 'City is required'),
    location: z.string().trim().toLowerCase().min(1, 'Location is required'),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    email: z.string().email({ message: 'Email is invalid' }),
    phone: z.string().min(10, { message: 'Phone number is invalid' }),
    landline: z
        .string()
        .min(10, { message: 'Landline number is invalid' })
        .optional(),
});

export type FormSchemaType = z.infer<typeof FormSchema>;
