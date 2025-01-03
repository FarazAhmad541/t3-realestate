'use client';

import { ChevronLeft, Heart, Share } from 'lucide-react';

import { useEffect } from 'react';

import { ImageComponent } from '~/components/ImageComponent/ImageComponent';

import { useModalContext } from '../../_context/modalContext';
import SingleImageModal from '../SingleImageModal/SingleImageModal';
import styles from './ImagesModal.module.css';

type Props = {
    imagesKeys: string[];
};

export default function ImagesModal({ imagesKeys }: Props) {
    const { closeModal, openModal } = useModalContext();
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className={styles.modal} onClick={() => closeModal()}>
            <div className={styles.modal_background} />
            <div
                className={styles.modal_content}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.header}>
                    <button
                        className={styles.button}
                        onClick={() => closeModal()}
                    >
                        <ChevronLeft className={styles.icon} />
                        Go back
                    </button>
                    <div className={styles.buttons}>
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
                <div className={styles.images_grid}>
                    {imagesKeys.map((key) => {
                        return (
                            <div
                                key={key}
                                className={styles.image_container}
                                onClick={() =>
                                    openModal({
                                        content: (
                                            <SingleImageModal
                                                imagesKeys={imagesKeys}
                                                selectedImage={
                                                    key || imagesKeys[0]
                                                }
                                            />
                                        ),
                                        onClose: () => closeModal(),
                                    })
                                }
                            >
                                <ImageComponent
                                    imageKey={key}
                                    className={styles.image}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
