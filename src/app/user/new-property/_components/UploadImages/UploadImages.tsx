'use client';

import clsx from 'clsx';
import { ImageUp, Star, X } from 'lucide-react';

import { useCallback, useEffect, useState } from 'react';
import {
    DropEvent,
    FileRejection,
    FileWithPath,
    useDropzone,
} from 'react-dropzone';
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

interface FileWithPreview extends FileWithPath {
    preview?: string;
}

export default function UploadImages({
    register,
    setValue,
    errors,
    clearErrors,
}: UploadImagesProps) {
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);
    const [coverImage, setCoverImage] = useState<string>('');
    const onDrop = useCallback<
        (
            acceptedFiles: FileWithPreview[],
            fileRejections: FileRejection[],
            event: DropEvent,
        ) => void
    >(
        (acceptedFiles, fileRejections) => {
            console.log('acceptedFiles', acceptedFiles);
            if (acceptedFiles?.length) {
                const updatedFiles = acceptedFiles.map((file) => {
                    const newFile = file;
                    newFile.preview = URL.createObjectURL(file);
                    return newFile;
                });
                setFiles(updatedFiles);
                setValue('images', updatedFiles);
                if (coverImage === '') {
                    setCoverImage(acceptedFiles[0].name);
                    setValue('main_image', acceptedFiles[0].name);
                }
                clearErrors('images');
            }

            if (fileRejections?.length) {
                setRejectedFiles((prevRejectedFiles) => [
                    ...prevRejectedFiles,
                    ...fileRejections,
                ]);
            }
        },
        [files, setValue, clearErrors],
    );

    useEffect(() => {
        return () => {
            files.forEach((file) => {
                if (file.preview) {
                    URL.revokeObjectURL(file.preview);
                }
            });
        };
    }, []);

    const imageValidator = (file: File) => {
        if (file.size > 5 * 1024 * 1024) {
            return {
                code: 'file-too-large',
                message: 'File size must be less than 5MB.',
            };
        }
        if (!['image/jpeg', 'image/png'].includes(file.type)) {
            return {
                code: 'file-type-invalid',
                message: 'Only JPEG and PNG image formats are allowed.',
            };
        }
        return null;
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        validator: imageValidator,
    });

    const onRemove = (name: string) => {
        const fileToRemove = files.find((file) => file.name === name);
        if (fileToRemove?.name === coverImage) {
            setCoverImage(files[0].name);
            setValue('main_image', files[0].name);
        }
        if (fileToRemove?.preview) {
            URL.revokeObjectURL(fileToRemove.preview);
        }
        const newFiles = files.filter((file) => file.name !== name);

        setFiles(newFiles);
        setValue('images', newFiles);
    };

    const onSetCover = (selectedFile: FileWithPreview) => {
        setCoverImage(selectedFile.name);
        setValue('main_image', selectedFile.name);
    };

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
                    <p>Click the star icon to select the cover Image</p>
                    <div className={styles.imageGrid}>
                        {files.map((file, index) => (
                            <div
                                key={`${file.name}-${index}`}
                                className={styles.imageThumbnail}
                            >
                                <div className={styles.imageContainer}>
                                    <Image
                                        src={file.preview || ''}
                                        alt={file.name}
                                        width={200}
                                        height={200}
                                        className={styles.thumbnailImage}
                                    />
                                </div>
                                <button
                                    className={styles.removeImageButton}
                                    onClick={() => onRemove(file.name)}
                                    aria-label={`Remove ${file.name}`}
                                    type="button"
                                >
                                    <X className={styles.removeIcon} />
                                </button>

                                <button
                                    className={clsx(
                                        styles.cover_button,
                                        file.name === coverImage &&
                                            styles.cover_active,
                                    )}
                                    onClick={() => onSetCover(file)}
                                    type="button"
                                >
                                    <Star className={styles.removeIcon} />
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
