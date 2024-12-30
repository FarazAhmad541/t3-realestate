'use client';

import styles from './ListingCard.module.css';

export function PropertyListingCardSkeleton() {
    return (
        <div className={`${styles.property_card} ${styles.skeleton}`}>
            <div className={styles.card_content}>
                <div
                    className={`${styles.image_container} ${styles.skeleton_pulse}`}
                >
                    <div className={styles.overlay} />
                    <div
                        className={`${styles.property_type_label} ${styles.skeleton_pulse}`}
                    ></div>

                    <div
                        className={`${styles.sale_label} ${styles.skeleton_pulse}`}
                    ></div>
                </div>

                <div className={styles.details_container}>
                    <div className={styles.price_area}>
                        <div
                            className={`${styles.price} ${styles.skeleton_pulse}`}
                        ></div>
                        <div
                            className={`${styles.area_info} ${styles.skeleton_pulse}`}
                        ></div>
                    </div>
                    <div
                        className={`${styles.location_info} ${styles.skeleton_pulse}`}
                    ></div>
                    <div className={styles.property_info}>
                        <div
                            className={`${styles.bedroom_info} ${styles.skeleton_pulse}`}
                        ></div>
                        <div
                            className={`${styles.bathroom_info} ${styles.skeleton_pulse}`}
                        ></div>
                    </div>
                    <div className={styles.contact_buttons}>
                        <div className={`${styles.skeleton_pulse}`}></div>
                        <div className={`${styles.skeleton_pulse}`}></div>
                        <div className={`${styles.skeleton_pulse}`}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
