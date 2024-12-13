import { UseFormRegister, UseFormWatch } from 'react-hook-form';

import { AreaUnitSchema } from '~/lib/FormSchema';

import styles from './AreaUnit.module.css';

const areaUnit = AreaUnitSchema._def.innerType.options;

type AreaUnitProps = {
    register: UseFormRegister<any>;
    watch: UseFormWatch<any>;
};

function getAreaUnit(areaUnit: string) {
    switch (areaUnit) {
        case 'sqft':
            return 'Square Feet (ft²)';
        case 'sqm':
            return 'Square Metres (m²)';
        case 'sqyd':
            return 'Square Yards (yd²)';
        case 'marla':
            return 'Marla';
        case 'kanal':
            return 'Kanal';
        default:
            return 'Square Feet (ft²)';
    }
}

export default function AreaUnit({ register, watch }: AreaUnitProps) {
    return (
        <select
            {...register('area_unit')}
            id="area_unit"
            className={styles.input}
        >
            {areaUnit.map((unit) => {
                return (
                    <option key={unit} value={unit} className={styles.input}>
                        {getAreaUnit(unit)}
                    </option>
                );
            })}
        </select>
    );
}
