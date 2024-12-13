'use client';

import clsx from 'clsx';
import { z } from 'zod';

import { useState } from 'react';
import {
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
} from 'react-hook-form';

import { RoomsSchema } from '~/lib/FormSchema';

import styles from './RoomsSelector.module.css';

type RoomSelectorProps = {
    watch: UseFormWatch<any>;
    setValue: UseFormSetValue<any>;
    register: UseFormRegister<any>;
};

type RoomType = keyof z.infer<typeof RoomsSchema>;

const rooms = Object.keys(RoomsSchema.shape) as RoomType[];

const getNumberOfRooms = (room: RoomType) => {
    switch (room) {
        case 'Bedrooms':
            return [1, 2, 3, 4, 5, 6, 7, '7+'];
        case 'Bathrooms':
            return [1, 2, 3, 4, 5, 6, '6+'];
        case 'Servant Quarters':
            return [1, 2, '2+'];
        case 'Kitchen':
            return [1, 2, '2+'];
        case 'Store Rooms':
            return [1, 2, '2+'];
        case 'Drawing Room':
            return [1, 2, '2+'];
    }
};

export default function RoomSelector({
    register,
    setValue,
}: RoomSelectorProps) {
    const [roomNumbers, setRoomNumbers] = useState<z.infer<typeof RoomsSchema>>(
        {},
    );

    return (
        <div className={styles.container}>
            <input type="hidden" {...register('rooms')} value={rooms} />
            {rooms.map((roomType) => (
                <div className={styles.field_wrapper} key={roomType}>
                    <label htmlFor={roomType} className={styles.label}>
                        {roomType}:
                    </label>
                    <div className={styles.options_wrapper}>
                        {getNumberOfRooms(roomType).map((num) => (
                            <button
                                key={num}
                                type="button"
                                onClick={() => {
                                    setValue(`rooms.${roomType}`, num);
                                    setRoomNumbers((prev) => ({
                                        ...prev,
                                        [roomType]: num,
                                    }));
                                }}
                                className={clsx(
                                    styles.option,
                                    roomNumbers[roomType] === num &&
                                        styles.active,
                                )}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
