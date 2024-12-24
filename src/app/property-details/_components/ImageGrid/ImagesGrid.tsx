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

type ImageGridProps = {
    imagesKeys: string[];
};

export default function ImageCarousel({ imagesKeys }: ImageGridProps) {
    return (
        <div className={styles.container}>
            {imagesKeys.map((key) => (
                <div key={key} className={styles.image_container}>
                    <Image
                        src={`/api/image/${encodeURIComponent(key)}`}
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
