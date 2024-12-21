'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { z } from 'zod';

import { useForm } from 'react-hook-form';

import { FormSchema } from '~/lib/FormSchema';

import styles from './Form.module.css';
import AmenitiesSelector from './_components/AmenitiesSelector/AmenitiesSelector';
import AreaUnit from './_components/AreaUnit/AreaUnit';
import PropertyForRadioGroup from './_components/PropertyForRadioGroup/PropertyForRadioGroup';
import RoomSelector from './_components/RoomsSelector/RoomsSelector';
import SelectCity from './_components/SelectCity/SelectCity';
import UploadImages from './_components/UploadImages/UploadImages';
import PropertyType from './_components/propertyType/PropertyType';
import { handleImagesUpload } from './_utils/handleImagesUpload';
import createListing from './actions/createListing';
import deleteListing from './actions/deleteListing';
import getSignedUrls from './actions/getSignedUrls';

export default function Page() {
    const {
        register,
        watch,
        setValue,
        formState: { errors },
        handleSubmit,
        clearErrors,
    } = useForm<z.infer<typeof FormSchema>>({
        resolver: async (data, context, options) => {
            console.log('data: >>>>', data);
            console.log(
                'validation result: >>>>',
                await zodResolver(FormSchema)(data, context, options),
            );
            return await zodResolver(FormSchema)(data, context, options);
        },
    });

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        console.log('starting listing creation');
        // First create listing in database to get the listing_id that will be used during image uplaod
        const response = await createListing(data);
        // Thow error and abord the process if there is error on the first step
        if (!response) {
            throw new Error('Error creating listing');
        }
        try {
            const { listing_id } = response;
            // Get the signed URLs for each image in the 'data' object
            const { signedUrls } = await getSignedUrls({
                listing_id,
                noOfImages: data.images.length,
            });
            // If and occurs during getting signed urls, abort the process
            if (!signedUrls) {
                throw new Error('Error getting signed urls');
            }
            console.log('uploading images');
            // Upload the images to AWS
            await handleImagesUpload({
                images: data.images,
                signedUrls: signedUrls,
                listing_id: listing_id,
            });
            console.log('images uploaded');
        } catch (error) {
            // Delete the listing if error occurs during image upload or listing creation
            await deleteListing({
                listing_id: response.listing_id,
                author_id: response.author_id,
            });
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.form_section}>
                <div className={styles.content_wrapper}>
                    <h1 className={styles.section_title}>
                        General Information
                    </h1>
                    <div className={styles.field_wrapper}>
                        <h2 className={styles.form_field_label}>
                            Property For:
                        </h2>
                        <PropertyForRadioGroup
                            register={register}
                            watch={watch}
                        />
                        {errors.property_for && (
                            <span className={styles.error}>
                                {errors.property_for.message}
                            </span>
                        )}
                    </div>
                    <div className={styles.field_wrapper}>
                        <h2 className={styles.form_field_label}>Title:</h2>
                        <input
                            {...register('title')}
                            type="text"
                            aria-label="Property title"
                            className={clsx(
                                styles.input,
                                errors.title && styles.invalid,
                            )}
                        />
                        {errors.title && (
                            <span className={styles.error}>
                                {errors.title.message}
                            </span>
                        )}
                    </div>
                    <div className={styles.field_wrapper}>
                        <h2 className={styles.form_field_label}>
                            Property Description:
                        </h2>
                        <textarea
                            {...register('description')}
                            aria-label="Property description"
                            className={clsx(
                                styles.input,
                                errors.description && styles.invalid,
                            )}
                        />
                        {errors.description && (
                            <span className={styles.error}>
                                {errors.description.message}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.form_section}>
                <div className={styles.content_wrapper}>
                    <h1 className={styles.section_title}>Property Details</h1>

                    <div className={styles.field_wrapper}>
                        <h2 className={styles.form_field_label}>
                            Property Type:
                        </h2>
                        <PropertyType register={register} watch={watch} />
                        {errors.property_type && (
                            <span className={styles.error}>
                                {errors.property_type.message}
                            </span>
                        )}
                    </div>
                    <div
                        className={clsx(
                            styles.field_wrapper,
                            styles.property_area,
                        )}
                    >
                        <h2 className={styles.form_field_label}>Area:</h2>
                        <input
                            {...register('area', { valueAsNumber: true })}
                            type="number"
                            id="area"
                            aria-label="Property area"
                            step={0.01}
                            className={clsx(
                                styles.input,
                                errors.area && styles.invalid,
                            )}
                        />
                        {errors.area && (
                            <span className={styles.error}>
                                {errors.area.message}
                            </span>
                        )}
                    </div>
                    <div
                        className={clsx(styles.field_wrapper, styles.area_unit)}
                    >
                        <h2 className={styles.form_field_label}>Area Unit:</h2>
                        <AreaUnit register={register} watch={watch} />
                    </div>
                    <div
                        className={clsx(
                            styles.field_wrapper,
                            styles.property_price,
                        )}
                    >
                        <h2 className={styles.form_field_label}>Price:</h2>
                        <input
                            {...register('price', { valueAsNumber: true })}
                            type="number"
                            id="price"
                            aria-label="Property price"
                            min={100000}
                            step={10000}
                            className={clsx(
                                styles.input,
                                errors.price && styles.invalid,
                            )}
                        />
                        {errors.price && (
                            <span className={styles.error}>
                                {errors.price.message}
                            </span>
                        )}
                    </div>
                    <div
                        className={clsx(
                            styles.field_wrapper,
                            styles.price_calulation,
                        )}
                    >
                        <h2
                            className={styles.form_field_label}
                            style={{ color: 'var(--clr-light)' }}
                        >
                            .{' '}
                        </h2>
                        <input
                            type="text"
                            disabled
                            value="Rs 200,00,000"
                            id="price"
                            aria-label="Property price"
                            min={100000}
                            step={10000}
                            className={styles.input}
                        />
                    </div>
                    <div className={clsx(styles.field_wrapper, styles.subgrid)}>
                        <h2
                            className={clsx(
                                styles.form_field_label,
                                styles.span_full,
                            )}
                        >
                            Number of Rooms:
                        </h2>

                        <RoomSelector
                            register={register}
                            setValue={setValue}
                            watch={watch}
                        />
                    </div>

                    <div className={styles.field_wrapper}>
                        <h2 className={styles.form_field_label}>
                            Amenities and Features:
                        </h2>

                        <AmenitiesSelector register={register} />
                    </div>

                    <div className={styles.field_wrapper}>
                        <h2 className={styles.form_field_label}>
                            Upload Relevant Images:
                        </h2>

                        <UploadImages
                            register={register}
                            setValue={setValue}
                            watch={watch}
                            errors={errors}
                            clearErrors={clearErrors}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.form_section}>
                <div className={styles.content_wrapper}>
                    <h1 className={styles.section_title}>Location</h1>
                    <div className={clsx(styles.field_wrapper, styles.cities)}>
                        <h2 className={styles.form_field_label}>City:</h2>
                        <SelectCity
                            register={register}
                            watch={watch}
                            setValue={setValue}
                            errors={errors}
                        />
                        {errors.city && (
                            <span className={styles.error}>
                                {errors.city.message}
                            </span>
                        )}
                    </div>
                    <div
                        className={clsx(styles.field_wrapper, styles.location)}
                    >
                        <h2 className={styles.form_field_label}>Location:</h2>
                        <input
                            type="text"
                            {...register('location')}
                            id="location"
                            aria-label="Location"
                            className={clsx(
                                styles.input,
                                errors.location && styles.invalid,
                            )}
                        />
                        {errors.location && (
                            <span className={styles.error}>
                                {errors.location.message}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.form_section}>
                <div className={styles.content_wrapper}>
                    <h1 className={styles.section_title}>Contact</h1>
                    <div className={clsx(styles.field_wrapper, styles.email)}>
                        <h2 className={styles.form_field_label}>Email:</h2>
                        <input
                            {...register('email')}
                            type="email"
                            id="email"
                            aria-label="Email"
                            className={clsx(
                                styles.input,
                                errors.email && styles.invalid,
                            )}
                        />
                        {errors.email && (
                            <span className={styles.error}>
                                {errors.email.message}
                            </span>
                        )}
                    </div>
                    <div className={clsx(styles.field_wrapper, styles.mobile)}>
                        <h2 className={styles.form_field_label}>Mobile:</h2>
                        <input
                            type="tel"
                            {...register('phone')}
                            id="mobile"
                            aria-label="Mobile number"
                            className={clsx(
                                styles.input,
                                errors.phone && styles.invalid,
                            )}
                        />
                        {errors.phone && (
                            <span className={styles.error}>
                                {errors.phone.message}
                            </span>
                        )}
                    </div>
                    <div
                        className={clsx(styles.field_wrapper, styles.landline)}
                    >
                        <h2 className={styles.form_field_label}>Landline:</h2>
                        <input
                            {...register('landline')}
                            type="tel"
                            id="landline"
                            aria-label="landline number"
                            className={styles.input}
                        />
                    </div>
                </div>
            </div>
            <button type="submit" className={styles.submit_button}>
                Submit For Review
            </button>
        </form>
    );
}
