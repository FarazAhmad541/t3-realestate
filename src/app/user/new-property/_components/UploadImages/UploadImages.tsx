'use client';

import { ImageUp, X } from 'lucide-react';

import { useCallback, useEffect, useState } from 'react';
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone';
import {
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
} from 'react-hook-form';

import Image from 'next/image';

import styles from './upload_images.module.css';

type UploadImagesProps = {
    register: UseFormRegister<any>;
    setValue: UseFormSetValue<any>;
    watch: UseFormWatch<any>;
    errors?: any;
    clearErrors: any;
};

type FileWithPreview = File & {
    preview: string;
};

export default function UploadImages({
    register,
    setValue,
    watch,
    errors,
    clearErrors,
}: UploadImagesProps) {
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);
    const images = watch('images') as File[];

    const onDrop = useCallback<
        (
            acceptedFiles: File[],
            fileRejections: FileRejection[],
            event: DropEvent,
        ) => void
    >(
        (acceptedFiles, fileRejections) => {
            if (acceptedFiles?.length) {
                const newFiles = acceptedFiles.map((file) =>
                    Object.assign(file, { preview: URL.createObjectURL(file) }),
                );
                setFiles((prevFiles) => [...prevFiles, ...newFiles]);
                setValue('images', acceptedFiles as File[]);
                clearErrors('images');
            }

            if (fileRejections?.length) {
                setRejectedFiles((prevRejectedFiles) => [
                    ...prevRejectedFiles,
                    ...fileRejections,
                ]);
            }
        },
        [setValue],
    );

    useEffect(() => {
        return () => {
            files.forEach((file) => URL.revokeObjectURL(file.preview));
        };
    }, [files]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.png'],
        },
        maxSize: 1024 * 1000,
    });

    const onRemove = useCallback(
        (fileName: string) => {
            setFiles((prevFiles) =>
                prevFiles.filter((file) => file.name !== fileName),
            );
            setValue(
                'images',
                (images || []).filter((file: File) => file.name !== fileName),
            );
        },
        [setValue, images],
    );

    return (
        <div className={styles.container}>
            <div
                {...getRootProps({
                    className: `${styles.dropzone} ${isDragActive ? styles.dragActive : ''}`,
                })}
            >
                <input
                    {...register('images')}
                    type="image"
                    multiple
                    className={styles.hiddenInput}
                />
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p className={styles.dragActiveText}>
                        Drop the files here ...
                    </p>
                ) : (
                    <p className={styles.uploadPrompt}>
                        <ImageUp className={styles.uploadIcon} />
                        Click to upload relevant images
                    </p>
                )}
            </div>

            {errors.images && (
                <span className={styles.error}>{errors.images.message}</span>
            )}

            {files.length > 0 && (
                <div className={styles.acceptedImagesSection}>
                    <h2 className="form_field_label">Accepted Images</h2>
                    <div className={styles.imageGrid}>
                        {files.map((file) => (
                            <div
                                key={file.name}
                                className={styles.imageThumbnail}
                            >
                                <div className={styles.imageContainer}>
                                    <Image
                                        src={file.preview}
                                        alt={file.name}
                                        width={200}
                                        height={200}
                                        className={styles.thumbnailImage}
                                        onLoad={() => {
                                            URL.revokeObjectURL(file.preview);
                                        }}
                                    />
                                </div>
                                <button
                                    className={styles.removeImageButton}
                                    onClick={() => onRemove(file.name)}
                                    aria-label={`Remove ${file.name}`}
                                >
                                    <X className={styles.removeIcon} />
                                </button>
                                <div className={styles.imageNameOverlay}>
                                    <p className={styles.imageName}>
                                        {file.name}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {rejectedFiles.length > 0 && (
                <div className={styles.rejectedImagesSection}>
                    <h2 className={styles.sectionTitle}>Rejected Images</h2>
                    <div className={styles.rejectedFilesList}>
                        {rejectedFiles.map((rejection) => (
                            <div
                                key={rejection.file.name}
                                className={styles.rejectedFileItem}
                            >
                                <div className={styles.rejectedFileDetails}>
                                    <p className={styles.rejectedFileName}>
                                        {rejection.file.name}
                                    </p>
                                    <p className={styles.rejectedFileErrors}>
                                        {rejection.errors
                                            .map((error) => error.message)
                                            .join(', ')}
                                    </p>
                                </div>
                                <button
                                    className={styles.removeRejectedButton}
                                    onClick={() =>
                                        setRejectedFiles((prev) =>
                                            prev.filter(
                                                (file) =>
                                                    file.file.name !==
                                                    rejection.file.name,
                                            ),
                                        )
                                    }
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
