'use client';

import {
    ChevronDown,
    ChevronUp,
    Mail,
    MessageCircle,
    Phone,
    User,
} from 'lucide-react';

import { useState } from 'react';

import { description, main_features, room_features } from '~/app/data';

import MainFeaturesList from './MainFeaturesList';
import styles from './PropertyDescriptio.module.css';
import RoomsFeaturesList from './RoomsFeaturesList';

export default function PropertyDescription() {
    const [showMore, setShowMore] = useState(false);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.description_wrapper}>
                    <h3 className={styles.sub_heading}>Description</h3>
                    <p className={styles.description}>
                        {showMore
                            ? description
                            : description.slice(0, 200) + ' ......'}
                    </p>
                    <button
                        className={styles.read_more}
                        onClick={() => setShowMore(!showMore)}
                    >
                        {showMore ? (
                            <ChevronUp className={styles.button_icon} />
                        ) : (
                            <ChevronDown className={styles.button_icon} />
                        )}
                        <p className={styles.button_text}>
                            {showMore ? 'Read Less' : 'Read More'}
                        </p>
                    </button>
                    <h3 className={styles.sub_heading}>Amenities & Features</h3>
                    <div className={styles.amenities_section}>
                        <div className={styles.main_features}>
                            <h4 className={styles.feature_heading}>
                                Main Features
                            </h4>
                            <div className={styles.main_features_list}>
                                <MainFeaturesList List={main_features} />
                            </div>
                        </div>
                        <div className={styles.rooms}>
                            <h4 className={styles.feature_heading}>Rooms</h4>
                            <div className={styles.rooms_list}>
                                <RoomsFeaturesList List={room_features} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.contact}>
                <h3 className={styles.contact_heading}>Contact Seller</h3>
                <div className={styles.seller_info}>
                    <div className={styles.icon_wrapper}>
                        <User className={styles.icon} />
                    </div>
                    <div className={styles.seller_name_wrapper}>
                        <p className={styles.seller_name}>Faraz Ahmad</p>
                        <p className={styles.member_since}>Member Since 2019</p>
                    </div>
                </div>
                <a className={styles.contact_button}>
                    <Phone className={styles.contact_icon} /> Call
                </a>
                <a className={styles.contact_button}>
                    <MessageCircle className={styles.contact_icon} /> WhatsApp
                </a>
                <a className={styles.contact_button}>
                    <Mail className={styles.contact_icon} /> Email
                </a>
            </div>
        </div>
    );
}
