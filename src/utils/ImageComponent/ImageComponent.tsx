'use client';

import Image from 'next/image';

type Props = {
    imageKey: string;
    className: string;
};

export function ImageComponent({ imageKey, className }: Props) {
    // const [imageSrc, setImageSrc] = useState<string | null>(null);

    // useEffect(() => {
    //     const fetchImageUrl = async () => {
    //         try {
    //             const url = await getDownloadSignedUrl(imageKey);
    //             if (url) {
    //                 setImageSrc(url);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching image url:', error);
    //         }
    //     };
    //     fetchImageUrl();
    // }, [imageKey]);
    // if (!imageSrc) {
    //     return <div className={className}>Loading...</div>;
    // }
    return (
        <Image
            src={`/api/image/${imageKey}`}
            alt="Property image"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={className}
        />
    );
}
