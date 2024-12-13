import clsx from 'clsx';

import { UseFormRegister, UseFormWatch } from 'react-hook-form';

import { PropertyTypeSchema } from '~/lib/FormSchema';

import styles from './PropertyType.module.css';

const propertyTypes = PropertyTypeSchema.options;
console.log(propertyTypes);

type PropertyTypeProps = {
    register: UseFormRegister<any>;
    watch: UseFormWatch<any>;
};

export default function PropertyType({ register, watch }: PropertyTypeProps) {
    const propertyType = watch('property_type') as string;
    return (
        <div className={styles.container}>
            {propertyTypes.map((type, index) => {
                return (
                    <label
                        htmlFor={type}
                        key={type}
                        className={clsx(
                            styles.label,
                            propertyType === type && styles.active,
                        )}
                    >
                        <input
                            {...register('property_type')}
                            type="radio"
                            id={type}
                            value={type}
                            className="radio"
                            checked={propertyType === type}
                        />
                        {type}
                    </label>
                );
            })}
        </div>
    );
}
