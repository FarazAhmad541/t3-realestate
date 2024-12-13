import { useForm } from 'react-hook-form';

import { MainFeaturesSchema } from '~/lib/FormSchema';

import styles from './AmenitiesSelector.module.css';

const MainFeatures = Object.keys(MainFeaturesSchema.shape) as string[];

export default function AmenitiesSelector() {
    const { register, watch } = useForm();
    const amenities = watch('amenities');
    console.log('amenities', amenities);
    return (
        <div className={styles.container}>
            {MainFeatures.map((feature) => {
                return (
                    <div key={feature} className={styles.field_wrapper}>
                        <input
                            {...register(`amenities.${feature}`)}
                            type="checkbox"
                            id={feature}
                            className={styles.checkbox}
                        />
                        <label className={styles.label} htmlFor={feature}>
                            {feature}
                        </label>
                    </div>
                );
            })}
        </div>
    );
}
