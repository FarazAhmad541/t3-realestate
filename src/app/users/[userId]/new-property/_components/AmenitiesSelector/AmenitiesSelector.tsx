import { UseFormRegister } from 'react-hook-form';

import { MainFeaturesSchema } from '~/lib/FormSchema';

import styles from './AmenitiesSelector.module.css';

const MainFeatures = Object.keys(MainFeaturesSchema.shape) as string[];

type AmenitiesSelectorProps = {
    register: UseFormRegister<any>;
};

export default function AmenitiesSelector({
    register,
}: AmenitiesSelectorProps) {
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
