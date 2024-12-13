import clsx from 'clsx';

import { UseFormRegister, UseFormWatch } from 'react-hook-form';

import styles from './styles.module.css';

type PropertyForRadioGroupProps = {
    register: UseFormRegister<any>;
    watch: UseFormWatch<any>;
};

export default function PropertyForRadioGroup({
    register,
    watch,
}: PropertyForRadioGroupProps) {
    const propertyFor = watch('property_for') as string;
    return (
        <div className={styles.input_wrapper}>
            <label
                htmlFor="for_rent"
                className={clsx(
                    styles.label,
                    propertyFor === 'for_rent' && styles.active,
                )}
            >
                <input
                    {...register('property_for')}
                    type="radio"
                    id="for_rent"
                    value="for_rent"
                    className="radio"
                />
                <span className={styles.radio_text}>For Rent</span>
            </label>
            <label
                htmlFor="for_sale"
                className={clsx(
                    styles.label,
                    propertyFor === 'for_sale' && styles.active,
                )}
            >
                <input
                    {...register('property_for')}
                    type="radio"
                    id="for_sale"
                    value="for_sale"
                    className="radio"
                />
                <span className={styles.radio_text}>For Sale</span>
            </label>
        </div>
    );
}
