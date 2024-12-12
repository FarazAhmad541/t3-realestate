'use client';

import { useForm } from 'react-hook-form';

import styles from './Form.module.css';
import PropertyForRadioGroup from './_components/PropertyForRadioGroup/PropertyForRadioGroup';
import UploadImages from './_components/UploadImages/UploadImages';

export default function Page() {
    const {
        register,
        watch,
        setValue,
        formState: { errors },
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
