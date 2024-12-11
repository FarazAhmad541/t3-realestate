import { Archive, Bath, Bed, Sofa, User, UtensilsCrossed } from 'lucide-react';

import styles from './PropertyDescriptio.module.css';

const getRoomFeatureIcon = (feature: string) => {
    switch (feature) {
        case 'BedRooms':
            return <Bed className={styles.list_icon} />;
        case 'Bathrooms':
            return <Bath className={styles.list_icon} />;
        case 'Servant Quarters':
            return <User className={styles.list_icon} />;
        case 'Kitchen':
            return <UtensilsCrossed className={styles.list_icon} />;
        case 'Store Rooms':
            return <Archive className={styles.list_icon} />;
        case 'Drawing Room':
            return <Sofa className={styles.list_icon} />;
        default:
            return <Bed className={styles.list_icon} />;
    }
};

export default function MainFeaturesList({ List }: { List: object }) {
    return (
        <>
            {Object.entries(List).map(([feature, value], index) => (
                <div key={index} className={styles.feature_wrapper}>
                    {getRoomFeatureIcon(feature)}
                    <p className={styles.feature_text}>
                        {feature}: {value}
                    </p>
                </div>
            ))}
        </>
    );
}
