import {
    Car,
    Cctv,
    HeaterIcon as Radiator,
    Trees,
    Wind,
    Zap,
} from 'lucide-react';

import { Amenities } from '~/server/db/schema';

import styles from './PropertyDescriptio.module.css';

const getMainFeatureIcon = (feature: string) => {
    switch (feature) {
        case 'Security Cameras':
            return <Cctv className={styles.list_icon} />;
        case 'Parking Space':
            return <Car className={styles.list_icon} />;
        case 'Central Heating':
            return <Radiator className={styles.list_icon} />;
        case 'Central Air Conditioning':
            return <Wind className={styles.list_icon} />;
        case 'Electricity Backup':
            return <Zap className={styles.list_icon} />;
        case 'Lawn / Garden':
            return <Trees className={styles.list_icon} />;
        default:
            return <Cctv className={styles.list_icon} />;
    }
};

export default function MainFeaturesList({
    amenities,
}: {
    amenities: Amenities | null;
}) {
    console.log('amenities: ', amenities);
    if (!amenities) {
        return null;
    }
    return (
        <>
            {Object.entries(amenities).map(([key, value]) => {
                if (value === true) {
                    return (
                        <div className={styles.feature_wrapper} key={key}>
                            {getMainFeatureIcon(key)}
                            <p className={styles.feature_text}>{key}</p>
                        </div>
                    );
                }
            })}
        </>
    );
}
