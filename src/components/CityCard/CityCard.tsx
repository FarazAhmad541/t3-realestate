import { MoveRight } from 'lucide-react';

import Image from 'next/image';

import styles from './CityCard.module.css';

export default function CityCard() {
    return (
        <a className={styles.card}>
            <div className={styles.image_container}>
                <Image
                    src="/islamabad.jpg"
                    alt="City image"
                    fill
                    sizes="(max-width: 768px) 33vw, (max-width: 1024px) 50vw, 100vw"
                    className={styles.card_image}
                />
            </div>

            <div className={styles.card_content}>
                <div className={styles.headings_wrapper}>
                    <h3 className={styles.heading}>Islamabad</h3>
                    <p className={styles.sub_heading}>450 properties</p>
                </div>
                <div className={styles.explore_button}>
                    <p className={styles.button_text}>Explore</p>
                    <MoveRight className={styles.move_icon} />
                </div>
            </div>
        </a>
    );
}
