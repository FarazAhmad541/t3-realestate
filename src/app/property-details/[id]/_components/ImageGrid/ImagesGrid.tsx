import { Images } from 'lucide-react';

import { ImageComponent } from '~/utils/ImageComponent/ImageComponent';

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
                    <ImageComponent imageKey={key} className={styles.image} />
                    {/* <Image
                        src={`/api/image/${encodeURIComponent(key)}`}
                        alt="Image"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className={styles.image}
                    /> */}

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
