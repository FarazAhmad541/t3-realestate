import {
    Bath,
    Bed,
    Heart,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    Ruler,
} from 'lucide-react';

import Link from 'next/link';

import getListingCardData from '~/app/actions/getListingCardsData';
import { ImageComponent } from '~/components/ImageComponent/ImageComponent';

import styles from './ListingCard.module.css';

type PropertyListingCardData = Awaited<
    ReturnType<typeof getListingCardData>
>[number];

export default function PropertyListingCard({
    data,
}: {
    data: PropertyListingCardData;
}) {
    return (
        <Link
            href={`/property-details/${data.id}`}
            className={styles.property_card}
        >
            <div className={styles.card_content}>
                <div className={styles.image_container}>
                    <ImageComponent
                        imageKey={data.main_image}
                        className={styles.property_image}
                    />

                    <div className={styles.overlay} />
                    <div className={styles.property_type_label}>House</div>

                    <Heart className={styles.favorite_icon} />

                    <div className={styles.sale_label}>
                        <div
                            style={{
                                width: '10px',
                                height: '10px',
                                backgroundColor: '#FFA500',
                                borderRadius: '50%',
                            }}
                        />
                        <p>
                            {data.property_for === 'for_sale'
                                ? 'For Sale'
                                : 'For Rent'}
                        </p>
                    </div>
                </div>

                <div className={styles.details_container}>
                    <div className={styles.price_area}>
                        <p className={styles.price}>
                            Rs. {data.price.toLocaleString()}
                        </p>
                        <div className={styles.area_info}>
                            <Ruler className={styles.icon}></Ruler>
                            <p>
                                {data.area} {data.area_unit}
                            </p>
                        </div>
                    </div>
                    <div className={styles.location_info}>
                        <MapPin className={styles.icon}></MapPin>
                        <p>
                            {data.location.toUpperCase()}, {data.city}
                        </p>
                    </div>
                    <div className={styles.property_info}>
                        <div className={styles.bedroom_info}>
                            <Bed className={styles.icon}></Bed>
                            <p>{data.rooms?.Bedrooms}</p>
                        </div>
                        <div className={styles.bathroom_info}>
                            <Bath className={styles.icon}></Bath>
                            <p>{data.rooms?.Bathrooms}</p>
                        </div>
                    </div>
                    <div className={styles.contact_buttons}>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                return (window.location.href = `tel:${data.phone}`);
                            }}
                        >
                            <Phone className={styles.button_icon} />
                            <p>Call</p>
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                return (window.location.href = `https://wa.me/${data.whatsapp}`);
                            }}
                        >
                            <MessageCircle className={styles.button_icon} />
                            <p>WhatsApp</p>
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                return (window.location.href = `mailto:${data.email}`);
                            }}
                        >
                            <Mail className={styles.button_icon} />
                            <p>Email</p>
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
