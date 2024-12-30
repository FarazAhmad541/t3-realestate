'use client';

import { useState } from 'react';

import Image from 'next/image';

import styles from './styles.module.css';

type Props = {
    imageKey: string;
    className: string;
};

export function ImageComponent({ imageKey, className }: Props) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            {isLoading && <div className={styles.skeleton} />}
            <Image
                src={`/api/image/${imageKey}`}
                alt="Property image"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
