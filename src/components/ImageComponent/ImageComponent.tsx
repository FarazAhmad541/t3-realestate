'use client';

import { useState } from 'react';

import Image from 'next/image';

import styles from './styles.module.css';

type Props = {
    imageKey: string;
    className: string;
    sizes?: string;
};

export function ImageComponent({ imageKey, className, sizes }: Props) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            {isLoading && <div className={styles.skeleton} />}
            <Image
                src={`/api/image/${imageKey}`}
                alt="Property image"
                fill
                sizes={sizes || '(min-width: 768px) 50vw, 100vw'}
                className={className}
                onLoad={(event) => {
                    if (
                        event.target instanceof HTMLImageElement &&
                        event.target.complete
                    ) {
                        setIsLoading(false);
                    }
                }}
            />
        </>
    );
}
