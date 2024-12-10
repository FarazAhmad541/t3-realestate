import { MoveRight } from 'lucide-react';

import BackgroundImage from '../DivWithBackgroundImage';
import styles from './CityCard.module.css';

export default function CityCard() {
    return (
        <a className={styles.card}>
            <BackgroundImage
                containerClassName={styles.image_container}
                imageClassName={styles.card_image}
                src="/islamabad.jpg"
                alt="City image"
            >
                <div className={styles.overlay} />
            </BackgroundImage>

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
