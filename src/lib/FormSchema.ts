import { z } from 'zod';

// Image Schema
const imageSchema = z
    .instanceof(File, { message: 'Each image must be a valid file.' })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
        message: 'Each image must be less than 5MB.',
    })
    .refine((file) => ['image/jpeg', 'image/png'].includes(file.type), {
        message: 'Only JPEG and PNG image formats are allowed.',
    });

// Property Type Enum
export const PropertyTypeSchema = z.enum(
    [
        'House',
        'Flat',
        'Room',
        'Plot',
        'Shop',
        'Apartment',
        'Studio',
        'Office',
        'Farmhouse',
    ],
    {
        errorMap: () => ({
            message: 'Property Type is required and must be valid.',
        }),
    },
);

// Area Unit Schema
export const AreaUnitSchema = z
    .enum(['sqft', 'sqm', 'sqyd', 'marla', 'kanal'], {
        errorMap: () => ({
            message:
                'Area unit must be one of sqft, sqm, sqyd, marla, or kanal.',
        }),
    })
    .default('sqft');

// Main Features Schema
export const MainFeaturesSchema = z.object({
    'Security Cameras': z.boolean().default(false),
    'Parking Space': z.boolean().default(false),
    'Central Heating': z.boolean().default(false),
    'Central Air Conditioning': z.boolean().default(false),
    'Electricity Backup': z.boolean().default(false),
    'Lawn / Garden': z.boolean().default(false),
});

// Rooms Schema
export const RoomsSchema = z.object({
    Bedrooms: z
        .union([z.number().int().positive(), z.literal('7+')])
        .optional(),
    Bathrooms: z
        .union([z.number().int().positive(), z.literal('6+')])
        .optional(),
    'Servant Quarters': z
        .union([z.number().int().positive(), z.literal('2+')])
        .optional(),
    Kitchen: z.union([z.number().int().positive(), z.literal('2+')]).optional(),
    'Store Rooms': z
        .union([z.number().int().positive(), z.literal('2+')])
        .optional(),
    'Drawing Room': z
        .union([z.number().int().positive(), z.literal('2+')])
        .optional(),
});

// Listing Form Schema
export const FormSchema = z.object({
    property_for: z.enum(['for_rent', 'for_sell'], {
        errorMap: () => ({
            message: 'Property purpose is required (for rent or for sell).',
        }),
    }),
    title: z.string().trim().min(1, { message: 'Title is required.' }),
    description: z
        .string()
        .trim()
        .min(1, { message: 'Description is required.' }),
    property_type: PropertyTypeSchema,
    amenities: MainFeaturesSchema,
    rooms: RoomsSchema,
    area: z
        .number({ invalid_type_error: 'Area is required.' })
        .positive({ message: 'Area must be greater than 0.' })
        .min(1, { message: 'Area is required.' }),
    area_unit: AreaUnitSchema,
    price: z
        .number({ invalid_type_error: 'Price is Required.' })
        .positive({ message: 'Price must be greater than 0.' })
        .min(1, { message: 'Price is required.' }),
    images: z
        .array(imageSchema, {
            required_error:
                'Images are required. Please upload at least 6 images.',
            invalid_type_error:
                'Images are required. Please upload at least 6 images.',
        })
        .min(6, { message: 'You must upload at least 6 images.' })
        .max(25, { message: 'You can upload a maximum of 25 images.' }),
    city: z.string().trim().min(1, { message: 'City is required.' }),
    location: z
        .string()
        .trim()
        .toLowerCase()
        .min(1, { message: 'Location is required.' }),
    latitude: z
        .number()
        .optional()
        .refine(
            (value) => value === undefined || (value >= -90 && value <= 90),
            {
                message: 'Latitude must be between -90 and 90.',
            },
        ),
    longitude: z
        .number()
        .optional()
        .refine(
            (value) => value === undefined || (value >= -180 && value <= 180),
            {
                message: 'Longitude must be between -180 and 180.',
            },
        ),
    email: z.string().email({ message: 'A valid email address is required.' }),
    phone: z
        .string()
        .min(10, { message: 'A valid phone number is required.' })
        .regex(/^(?:\+92|0)3[0-9]{9}$/, {
            message: 'Enter a valid Pakistani mobile number.',
        }),
    landline: z
        .string()
        .regex(/^\d+$/, {
            message: 'Landline number must contain only digits.',
        })
        .optional(),
});

export type FormSchemaType = z.infer<typeof FormSchema>;
