import { Bath, Bed, Heart, MapPin, Ruler, Share2 } from 'lucide-react';

import {
    area,
    bathrooms,
    bedrooms,
    city,
    location,
    price,
    property_for,
    title,
} from '../../../../data';
import styles from './DetailsHeader.module.css';

export default function DetailsHeader() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title_wrapper}>
                    <div className={styles.label}>
                        <div
                            style={{
                                width: '10px',
                                height: '10px',
                                backgroundColor: '#ffffff',
                                borderRadius: '50%',
                            }}
                        />
                        <p className={styles.label_text}>
                            {property_for === 'for_sale' && 'For Sale'}
                        </p>
                    </div>
                    <h2 className={styles.title}>{title}</h2>
                </div>
                <h3 className={styles.price}>Rs: {price.toLocaleString()}</h3>
            </div>
            <div className={styles.datails}>
                <div className={styles.features}>
                    <h3 className={styles.sub_heading}>Features: </h3>
                    <div className={styles.info_wrapper}>
                        <div className={styles.bedroom_info}>
                            <Bed className={styles.icon} />
                            <p>{bedrooms} bedrooms</p>
                        </div>
                        <div className={styles.bathroom_info}>
                            <Bath className={styles.icon} />
                            <p>{bathrooms} bathrooms</p>
                        </div>
                        <div className={styles.area_info}>
                            <Ruler className={styles.icon} />
                            <p>{area}</p>
                        </div>
                    </div>
                </div>
                <div className={styles.location}>
                    <h3 className={styles.sub_heading}>Location: </h3>
                    <div className={styles.location_info}>
                        <MapPin className={styles.icon} />
                        <p>
                            {location}, {city}
                        </p>
                    </div>
                </div>
                <div className={styles.action_buttons}>
                    <div className={styles.icon_wrapper}>
                        <Share2 className={styles.action_icon} />
                    </div>
                    <div className={styles.icon_wrapper}>
                        <Heart className={styles.action_icon} />
                    </div>
                </div>
            </div>
        </div>
    );
}
