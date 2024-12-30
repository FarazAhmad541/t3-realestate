'use client';

import { Images } from 'lucide-react';

import { ModalRenderer } from '~/app/property-details/[id]/_components/ModalRenderer';
import { useModalContext } from '~/app/property-details/[id]/_context/modalContext';
import { ModalProvider } from '~/app/property-details/[id]/_context/modalContext';
import { ImageComponent } from '~/components/ImageComponent/ImageComponent';

import ImagesModal from '../ImagesModal/ImagesModal';
import styles from './ImageGrid.module.css';

type ImageGridProps = {
    imagesKeys: string[];
};

export default function ImagesGrid({ imagesKeys }: ImageGridProps) {
    const { openModal, closeModal } = useModalContext();
    // const [isOpen, setIsOpen] = useState(false);

    // function onClose() {
    //     setIsOpen(false);
    // }

    // function openModal(e: React.MouseEvent) {
    //     e.stopPropagation();
    //     setIsOpen(true);
    // }

    return (
        <div className={styles.container}>
            {imagesKeys.map((key) => (
                <div
                    key={key}
                    className={styles.image_container}
                    onClick={() =>
                        openModal({
                            content: <ImagesModal imagesKeys={imagesKeys} />,
                            onClose: () => closeModal(),
                        })
                    }
                >
                    <ImageComponent imageKey={key} className={styles.image} />
                    <div className={styles.overlay} />
                </div>
            ))}
            <a
                className={styles.see_all}
                onClick={() =>
                    openModal({
                        content: <ImagesModal imagesKeys={imagesKeys} />,
                        onClose: () => closeModal(),
                    })
                }
            >
                <Images className={styles.icon} />
                <p>See All Photos</p>
            </a>
            <ModalRenderer />

            {/* <ImagesModal
                isOpen={isOpen}
                onClose={onClose}
                imagesKeys={imagesKeys}
            /> */}
        </div>
    );
}
