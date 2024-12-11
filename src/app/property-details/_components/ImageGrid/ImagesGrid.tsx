import { Images } from 'lucide-react';

import Image from 'next/image';

import styles from './ImageGrid.module.css';

const images = [
    '/hero-background.jpg',
    '/image.jpg',
    '/hero-background.jpg',
    '/image.jpg',
    '/hero-background.jpg',
];

export default function ImageCarousel() {
    return (
        <div className={styles.container}>
            {images.map((image) => (
                <div key={image} className={styles.image_container}>
                    <Image
                        src={image}
                        alt="Image"
                        fill
                        sizes="(max-width: 768px) 100vw, 1280px"
                        className={styles.image}
                    />
                    <div className={styles.overlay} />
                </div>
            ))}
            <a className={styles.see_all}>
                <Images className={styles.icon} />
                <p>See All Photos</p>
            </a>
        </div>
    );
}
