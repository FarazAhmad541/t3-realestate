'use client';

import clsx from 'clsx';

import { useForm } from 'react-hook-form';

import styles from './Form.module.css';
import AreaUnit from './_components/AreaUnit/AreaUnit';
import RoomSelector from './_components/Features/RoomsSelector';
import PropertyForRadioGroup from './_components/PropertyForRadioGroup/PropertyForRadioGroup';
import UploadImages from './_components/UploadImages/UploadImages';
import PropertyType from './_components/propertyType/PropertyType';

export default function Page() {
    const {
        register,
        watch,
        setValue,
        formState: { errors },
        control,
    } = useForm();

    return (
        <form action="" className={styles.form}>
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
                    </div>
                    <div className={styles.field_wrapper}>
                        <h2 className={styles.form_field_label}>Title:</h2>
                        <input
                            {...register('title')}
                            type="text"
                            required
                            aria-label="Property title"
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.field_wrapper}>
                        <h2 className={styles.form_field_label}>
                            Property Description:
                        </h2>
                        <textarea
                            {...register('description')}
                            required
                            aria-label="Property description"
                            className={styles.input}
                        />
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
                    </div>
                    <div
                        className={clsx(
                            styles.field_wrapper,
                            styles.property_area,
                        )}
                    >
                        <h2 className={styles.form_field_label}>Area:</h2>
                        <input
                            {...register('area')}
                            type="number"
                            id="area"
                            required
                            aria-label="Property area"
                            min={100}
                            step={0.01}
                            className={styles.input}
                        />
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
                            {...register('price')}
                            type="number"
                            id="price"
                            required
                            aria-label="Property price"
                            min={100000}
                            step={10000}
                            className={styles.input}
                        />
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
                            required
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
                            Additional Information:
                        </h2>

                        <RoomSelector control={control} />
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
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}
