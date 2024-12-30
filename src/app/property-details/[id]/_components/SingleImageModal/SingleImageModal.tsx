import { ChevronLeft, ChevronRight, Heart, Share, X } from 'lucide-react';

import { useState } from 'react';

import { ImageComponent } from '~/components/ImageComponent/ImageComponent';

import { useModalContext } from '../../_context/modalContext';
import styles from './styles.module.css';

export default function SingleImageModal({
    imagesKeys,
    selectedImage,
}: {
    imagesKeys: string[];
    selectedImage: string;
}) {
    const selectedImageIndex = imagesKeys.indexOf(selectedImage);
    const [currentImageIndex, setCurrentImageIndex] =
        useState(selectedImageIndex);
    const { closeModal } = useModalContext();

    const previousImage = () => {
        if (currentImageIndex === 0) {
            return;
        }
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };

    const nextImage = () => {
        if (currentImageIndex === imagesKeys.length - 1) {
            return;
        }
        if (currentImageIndex < imagesKeys.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button className={styles.button} onClick={() => closeModal()}>
                    <X className={styles.icon} />
                </button>
                <div className={styles.interaction_buttons}>
                    <button className={styles.button}>
                        <Heart className={styles.icon} />
                        Save
                    </button>
                    <button className={styles.button}>
                        <Share className={styles.icon} />
                        Share
                    </button>
                </div>
            </div>
            <div className={styles.images_wrapper}>
                <button
                    className={styles.nav_button}
                    onClick={() => previousImage()}
                >
                    <ChevronLeft className={styles.nav_icon} />
                </button>
                <div
                    className={styles.image_container}
                    onClick={() => nextImage()}
                >
                    <ImageComponent
                        imageKey={imagesKeys[currentImageIndex]}
                        className={styles.image}
                    />
                </div>
                <button
                    className={styles.nav_button}
                    onClick={() => nextImage()}
                >
                    <ChevronRight className={styles.nav_icon} />
                </button>
            </div>
        </div>
    );
}
