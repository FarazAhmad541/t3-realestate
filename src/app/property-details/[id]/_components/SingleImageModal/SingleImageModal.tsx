import { ChevronLeft, ChevronRight, Heart, Share, X } from 'lucide-react';

import { useState } from 'react';

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
    const [currentImage, setCurrentImage] = useState(selectedImageIndex);
    const { closeModal } = useModalContext();

    function handleClose(e: React.MouseEvent) {
        e.stopPropagation();
    }

    return (
        <div className={styles.container} onClick={() => closeModal()}>
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
                <button className={styles.nav_button}>
                    <ChevronLeft className={styles.nav_icon} />
                </button>
                <div className={styles.image_container}></div>
                <button className={styles.nav_button}>
                    <ChevronRight className={styles.nav_icon} />
                </button>
            </div>
        </div>
    );
}
