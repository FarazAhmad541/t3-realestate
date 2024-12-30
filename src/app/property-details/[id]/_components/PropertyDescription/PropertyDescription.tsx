'use client';

import { InferSelectModel } from 'drizzle-orm';
import {
    ChevronDown,
    ChevronUp,
    Mail,
    MessageCircle,
    Phone,
    User,
} from 'lucide-react';

import { useState } from 'react';

import { propertyListing } from '~/server/db/schema';

import MainFeaturesList from './MainFeaturesList';
import styles from './PropertyDescriptio.module.css';
import RoomsFeaturesList from './RoomsFeaturesList';

type PropertyDescriptionProps = {
    data: InferSelectModel<typeof propertyListing>;
    authorDetails: { firstName: string | null; lastName: string | null };
};

export default function PropertyDescription({
    data,
    authorDetails,
}: PropertyDescriptionProps) {
    const { amenities, rooms } = data;
    const [showMore, setShowMore] = useState(false);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.description_wrapper}>
                    <h3 className={styles.sub_heading}>Description</h3>
                    <p className={styles.description}>
                        {showMore
                            ? data.description
                            : data.description.slice(0, 200) + ' ......'}
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
                        <div className={styles.amenities}>
                            <h4 className={styles.feature_heading}>
                                Main Features
                            </h4>
                            <div className={styles.amenities_list}>
                                <MainFeaturesList amenities={amenities} />
                            </div>
                        </div>
                        <div className={styles.rooms}>
                            <h4 className={styles.feature_heading}>Rooms</h4>
                            <div className={styles.rooms_list}>
                                <RoomsFeaturesList rooms={rooms} />
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
                        <p className={styles.seller_name}>
                            {authorDetails.firstName} {authorDetails.lastName}
                        </p>
                        <p className={styles.member_since}>Member Since 2019</p>
                    </div>
                </div>
                <a
                    type="tel"
                    href={`tel:${data.phone}`}
                    className={styles.contact_button}
                >
                    <Phone className={styles.contact_icon} /> Call
                </a>
                <a
                    type="tel"
                    href={`tel:${data.phone}`}
                    className={styles.contact_button}
                >
                    <MessageCircle className={styles.contact_icon} /> WhatsApp
                </a>

                <a
                    type="tel"
                    href={`mailto:${data.email}`}
                    className={styles.contact_button}
                >
                    <Mail className={styles.contact_icon} /> Email
                </a>
            </div>
        </div>
    );
}
